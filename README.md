# Document Summary Assistant

An AI-powered web application that processes PDF documents and scanned images to extract text (via OCR), produce smart structured summaries (short, medium, long), highlight key points & main concepts, and generate actionable improvement suggestions.

---

**Render Deployment**
https://document-summary-assistant-ucas.onrender.com

##  Deliverable: Brief Write-up of Approach 

> **Approach Write-up:**
> To build the Document Summary Assistant, we implemented a full-stack architecture pairing a modern React + TypeScript frontend with an Express backend powered by Gemini 2.5 Flash for multimodal parsing and NLP extraction.
> 
> 1. **Ingestion & Extraction:** The system accepts PDF files, raw text, and scanned document images (PNG, JPG, WebP) via drag-and-drop or file selection. For scanned imagery and complex PDFs, multimodal vision and OCR models transcribe raw text streams preserving structural hierarchy.
> 2. **AI Summarization Engine:** A structured prompt pipeline extracts executive summaries, bulleted key takeaways, core conceptual pillars, and actionable document improvement suggestions according to user-selected depth levels (`short`, `medium`, `long`).
> 3. **Accessible & Responsive UX:** The interface is built with Tailwind CSS following WCAG AA guidelines, offering dynamic text scaling, high contrast mode, text-to-speech read-aloud playback, raw text inspection, and export options (TXT, Markdown, JSON, Print).
> 4. **Reliability:** Built with comprehensive error handling, visual multi-stage loading feedback, and graceful fallback states for instant evaluation.

---

##  Features Checklist 
1. **Document Upload**:
   -  PDF and Image uploads (PNG, JPG, JPEG, TXT)
   -  Drag-and-drop & native file picker interface
   -  Direct raw text paste mode & 3 pre-loaded test samples
2. **Text Extraction & OCR**:
   -  High-accuracy PDF text stream parsing
   -  Optical Character Recognition (OCR) for scanned images and photos
   -  Collapsible Raw OCR / Extracted Text inspector with in-text search & copy
3. **Summary Generation**:
   -  Automated smart summaries
   -  Multi-level length selector: **Short** (~30s read), **Medium** (~1-2m read), **Long** (~3-5m read)
   -  Key points & main ideas extraction with numbered visual badges
   -  Topic tagging and reading metrics (word count, reading time, document tone)
4. **Improvement Suggestions**:
   -  Actionable recommendations and next steps extracted from the document content
5. **UI / UX**:
   -  Clean modern blue aesthetic, fully responsive across mobile, tablet, and desktop
   -  Accessibility suite: Font scaling, high-contrast theme, dyslexia-friendly spacing
   -  Text-to-Speech (TTS) voice readout
   -  Multi-format export: .TXT, .Markdown, .JSON, and Print
6. **Technical & Production Quality**:
   -  Multi-stage progress indicators during processing
   -  User-friendly error alert with retry triggers
   -  Strict TypeScript type safety throughout client and server

---

##  Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Web Speech API
- **Backend**: Node.js, Express, Multer
- **AI & OCR Model**: Google Gemini API (`gemini-2.5-flash`) for multimodal document comprehension and OCR
- **Bundler / Server**: Vite + `tsx` / `esbuild`

---

##  Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set Environment Variable**:
   Add your Gemini API key to `.env`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Production Build**:
   ```bash
   npm run build
   npm start
   ```
