import express from "express";
import cors from "cors";
import path from "path";
import multer from "multer";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Multer for in-memory file handling (limit 25MB)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB max
});

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(cors());
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "Document Summary Assistant API",
      timestamp: new Date().toISOString(),
    });
  });

  // Main Summarize Endpoint
  app.post("/api/summarize", upload.single("file"), async (req, res) => {
    try {
      const lengthOption = (req.body.length || "medium").toLowerCase(); // short | medium | long
      const customFocus = req.body.focus || "";
      const rawText = req.body.text || "";
      const file = req.file;

      if (!file && (!rawText || !rawText.trim())) {
        return res.status(400).json({
          error: "No file or text provided. Please upload a PDF, image, or enter text to summarize.",
        });
      }

      const ai = getGeminiClient();

      let extractedText = "";
      let mimeType = "";
      let fileName = "";
      let fileType: "pdf" | "image" | "text" = "text";

      if (file) {
        fileName = file.originalname;
        mimeType = file.mimetype;

        if (
          mimeType === "application/pdf" ||
          fileName.toLowerCase().endsWith(".pdf")
        ) {
          fileType = "pdf";
          mimeType = "application/pdf";
        } else if (
          mimeType.startsWith("image/") ||
          /\.(png|jpe?g|webp|bmp|tiff|gif)$/i.test(fileName)
        ) {
          fileType = "image";
          if (!mimeType.startsWith("image/")) {
            mimeType = fileName.toLowerCase().endsWith(".png")
              ? "image/png"
              : "image/jpeg";
          }
        } else if (mimeType.startsWith("text/") || fileName.endsWith(".txt") || fileName.endsWith(".md")) {
          fileType = "text";
          extractedText = file.buffer.toString("utf-8");
        } else {
          return res.status(400).json({
            error: `Unsupported file type: ${mimeType || "unknown"}. Please upload a PDF, PNG, JPG, or text document.`,
          });
        }
      } else {
        fileType = "text";
        fileName = "Pasted Text";
        mimeType = "text/plain";
        extractedText = rawText.trim();
      }

      // Step 1: Prompt structure based on length
      let lengthInstruction = "";
      if (lengthOption === "short") {
        lengthInstruction =
          "Provide a concise, high-impact executive summary (1 to 2 clear paragraphs) capturing only the critical essentials, followed by 3-5 high-priority bullet key points.";
      } else if (lengthOption === "long") {
        lengthInstruction =
          "Provide an in-depth, thorough, and comprehensive summary (4 to 6 detailed paragraphs) covering all major topics, nuances, background, conclusions, and evidence, followed by 7-10 detailed key points and key takeaway themes.";
      } else {
        // Medium default
        lengthInstruction =
          "Provide a balanced and structured overview summary (2 to 3 paragraphs) covering all key sections and outcomes, followed by 5-7 clear key points.";
      }

      const systemInstruction = `You are an expert Document Summarization Assistant.
Your job is to:
1. Thoroughly read and extract all text from the provided document (performing OCR for images or parsing PDF content accurately).
2. Produce a clear, accurate, high-quality summary without hallucinating or inventing facts not present in the document.
3. Extract the verbatim or near-verbatim readable text content so the user can inspect the document's extracted text.
4. Highlight the most crucial key points, main conclusions or ideas, and practical improvement suggestions or action items if applicable.
5. Provide readability stats (estimated word count, topic tags, and tone).`;

      let promptText = `Summarize the attached ${fileType} document.
Summary Length Requirement: ${lengthOption.toUpperCase()} (${lengthInstruction})
${customFocus ? `Special Focus / User Instruction: ${customFocus}` : ""}

Please return a structured JSON response matching the requested schema.`;

      let contents: any;

      if (file && (fileType === "pdf" || fileType === "image")) {
        const base64Data = file.buffer.toString("base64");
        contents = {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            {
              text: promptText,
            },
          ],
        };
      } else {
        // Plain text
        contents = {
          parts: [
            {
              text: `${promptText}\n\nDocument Content:\n${extractedText}`,
            },
          ],
        };
      }

      // Candidate models in order of priority
      const candidateModels = [
        "gemini-3.6-flash",
        "gemini-flash-latest",
        "gemini-3.7-flash",
      ];

      let response: any = null;
      let lastError: any = null;

      for (const modelName of candidateModels) {
        try {
          console.log(`Attempting document summarization with model: ${modelName}`);
          response = await ai.models.generateContent({
            model: modelName,
            contents: contents,
            config: {
              systemInstruction: systemInstruction,
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  summary: {
                    type: Type.STRING,
                    description:
                      "The complete, beautifully structured summary text matching the requested length.",
                  },
                  keyPoints: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description:
                      "List of the most important takeaways and key bullet points from the document.",
                  },
                  mainIdeas: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description:
                      "High-level core themes, conclusions, or takeaways.",
                  },
                  improvementSuggestions: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description:
                      "Actionable suggestions, improvements, or recommendations derived from the document context.",
                  },
                  extractedText: {
                    type: Type.STRING,
                    description:
                      "Extracted text or OCR transcription from the document (or excerpt if long).",
                  },
                  documentTitle: {
                    type: Type.STRING,
                    description: "A concise, appropriate title for the document.",
                  },
                  topics: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "3-5 relevant category tags or topics.",
                  },
                  documentTone: {
                    type: Type.STRING,
                    description:
                      "e.g., Formal, Academic, Technical, Legal, Financial, Casual.",
                  },
                },
                required: ["summary", "keyPoints", "mainIdeas"],
              },
            },
          });

          if (response && response.text) {
            console.log(`Summarization successfully completed via ${modelName}`);
            break;
          }
        } catch (modelErr: any) {
          console.warn(`Model ${modelName} failed (${modelErr?.status || modelErr?.message}), trying next candidate...`);
          lastError = modelErr;
        }
      }

      if (!response || !response.text) {
        throw (
          lastError ||
          new Error("Failed to generate summary from AI models. Please try again.")
        );
      }

      const rawResponseText = response.text || "{}";
      let cleanJson = rawResponseText.trim();
      if (cleanJson.startsWith("```json")) {
        cleanJson = cleanJson.replace(/^```json\s*/, "").replace(/\s*```$/, "");
      } else if (cleanJson.startsWith("```")) {
        cleanJson = cleanJson.replace(/^```\s*/, "").replace(/\s*```$/, "");
      }

      let parsedData: any = {};
      try {
        parsedData = JSON.parse(cleanJson);
      } catch (parseErr) {
        console.error("JSON parse error, attempting regex recovery:", parseErr);
        // Resilient fallback regex parser
        const extractField = (key: string) => {
          const match = cleanJson.match(new RegExp(`"${key}"\\s*:\\s*"([^"]+)"`));
          return match ? match[1] : "";
        };
        const extractArray = (key: string) => {
          const match = cleanJson.match(new RegExp(`"${key}"\\s*:\\s*\\[([^\\]]*)\\]`));
          if (!match) return [];
          return match[1]
            .split(",")
            .map((s: string) => s.replace(/^[\s"]+|[\s"]+$/g, ""))
            .filter(Boolean);
        };

        parsedData = {
          summary: extractField("summary") || rawResponseText,
          keyPoints: extractArray("keyPoints").length > 0 ? extractArray("keyPoints") : ["Key point extracted from document."],
          mainIdeas: extractArray("mainIdeas").length > 0 ? extractArray("mainIdeas") : ["Main conclusion extracted from document."],
          improvementSuggestions: extractArray("improvementSuggestions"),
          documentTitle: extractField("documentTitle") || fileName,
          extractedText: extractField("extractedText") || extractedText,
          topics: extractArray("topics"),
          documentTone: extractField("documentTone") || "Standard",
        };
      }

      // Calculate statistics
      const finalExtracted = parsedData.extractedText || extractedText || "";
      const wordCount = finalExtracted.split(/\s+/).filter(Boolean).length;
      const characterCount = finalExtracted.length;
      const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

      return res.json({
        success: true,
        fileName: fileName || parsedData.documentTitle || "Document",
        fileType,
        documentTitle: parsedData.documentTitle || fileName || "Document Summary",
        summary: parsedData.summary || "No summary could be generated.",
        keyPoints: parsedData.keyPoints || [],
        mainIdeas: parsedData.mainIdeas || [],
        improvementSuggestions: parsedData.improvementSuggestions || [],
        extractedText: finalExtracted,
        topics: parsedData.topics || [],
        documentTone: parsedData.documentTone || "Standard",
        stats: {
          wordCount,
          characterCount,
          readingTimeMinutes,
          summaryLength: lengthOption,
        },
      });
    } catch (err: any) {
      console.error("Summarization error:", err);
      const errorMessage =
        err?.message ||
        "An unexpected error occurred while processing the document.";
      return res.status(500).json({
        error: errorMessage,
      });
    }
  });

  // Vite integration: development middleware vs static production files
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Document Summary Assistant running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
