import React, { useState } from "react";
import { Header } from "./components/Header";
import { AccessibilityToolbar } from "./components/AccessibilityToolbar";
import { UploadBox } from "./components/UploadBox";
import { SummaryOptions } from "./components/SummaryOptions";
import { LoadingState } from "./components/LoadingState";
import { SummaryCard } from "./components/SummaryCard";
import { ErrorAlert } from "./components/ErrorAlert";
import { ProjectInfoModal } from "./components/ProjectInfoModal";
import {
  SummaryLength,
  SummaryResult,
  AccessibilitySettings,
  SampleDocument,
} from "./types";

export default function App() {
  
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: "normal",
    highContrast: false,
    dyslexiaFont: false,
    lineSpacing: "normal",
    reducedMotion: false,
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  
  const [activeInputMode, setActiveInputMode] = useState<
    "file" | "text" | "samples"
  >("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [rawText, setRawText] = useState<string>("");
  const [summaryLength, setSummaryLength] = useState<SummaryLength>("medium");
  const [customFocus, setCustomFocus] = useState<string>("");

  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SummaryResult | null>(null);

  
  const canSummarize =
    (activeInputMode === "file" && selectedFile !== null) ||
    (activeInputMode === "text" && rawText.trim().length > 0) ||
    (activeInputMode === "samples" && rawText.trim().length > 0);

  
  const handleSelectSample = (sample: SampleDocument) => {
    setSelectedFile(null);
    setRawText(sample.content);
    setActiveInputMode("text");
  };

  
  const handleSummarize = async () => {
    if (!canSummarize) return;

    setIsLoading(true);
    setError(null);

    try {
      let response: Response;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("length", summaryLength);
        if (customFocus.trim()) {
          formData.append("focus", customFocus.trim());
        }

        response = await fetch("/api/summarize", {
          method: "POST",
          body: formData,
        });
      } else {
       
        response = await fetch("/api/summarize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: rawText,
            length: summaryLength,
            focus: customFocus.trim(),
          }),
        });
      }

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(
          errData.error || `Server responded with status ${response.status}`
        );
      }

      const data: SummaryResult = await response.json();
      setResult(data);

     
      setTimeout(() => {
        const el = document.getElementById("summary-results-container");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (err: any) {
      console.error("Summarization error:", err);
      setError(
        err.message ||
          "Failed to generate summary. Please ensure the document is valid and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setSelectedFile(null);
    setRawText("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fontScaleClass =
    settings.fontSize === "xlarge"
      ? "font-scale-xlarge"
      : settings.fontSize === "large"
      ? "font-scale-large"
      : "font-scale-normal";

  const dyslexiaClass = settings.dyslexiaFont ? "dyslexia-mode" : "";
  const highContrastClass = settings.highContrast ? "high-contrast" : "";

  const detectedFileType = selectedFile
    ? selectedFile.type === "application/pdf" ||
      selectedFile.name.endsWith(".pdf")
      ? "pdf"
      : selectedFile.type.startsWith("image/")
      ? "image"
      : "text"
    : "text";

  return (
    <div
      className={`min-h-screen flex flex-col bg-white text-[#1a1a1a] ${fontScaleClass} ${dyslexiaClass} ${highContrastClass}`}
    >
      {/* Header */}
      <Header
        settings={settings}
        onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)}
        isSettingsOpen={isSettingsOpen}
        onOpenInfoModal={() => setIsInfoModalOpen(true)}
      />

      {/* Project Approach & Requirements Modal */}
      <ProjectInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        settings={settings}
      />

      {/* Accessibility Toolbar */}
      <AccessibilityToolbar
        settings={settings}
        onChangeSettings={setSettings}
        isOpen={isSettingsOpen}
      />

      {/* Main Content */}
      <main
        id="main-app-content"
        className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
      >
        {/* Error Alert */}
        {error && (
          <ErrorAlert
            message={error}
            onRetry={handleSummarize}
            settings={settings}
          />
        )}

        {/* If no result is present, show the Upload & Options form */}
        {!result && (
          <div className="space-y-6">
            {/* 1. Document Input Box */}
            <section aria-labelledby="section-upload-title">
              <h2 id="section-upload-title" className="sr-only">
                Upload or Select Document
              </h2>
              <UploadBox
                selectedFile={selectedFile}
                onFileSelect={(file) => {
                  setSelectedFile(file);
                  if (file) setRawText("");
                  setError(null);
                }}
                rawText={rawText}
                onRawTextChange={(text) => {
                  setRawText(text);
                  if (text) setSelectedFile(null);
                  setError(null);
                }}
                activeInputMode={activeInputMode}
                onInputModeChange={setActiveInputMode}
                onSelectSample={handleSelectSample}
                settings={settings}
                disabled={isLoading}
              />
            </section>

            {/* 2. Summary Length & Configuration Options */}
            <section aria-labelledby="section-options-title">
              <h2 id="section-options-title" className="sr-only">
                Summary Options & Execution
              </h2>
              <SummaryOptions
                length={summaryLength}
                onLengthChange={setSummaryLength}
                customFocus={customFocus}
                onCustomFocusChange={setCustomFocus}
                onSummarize={handleSummarize}
                isLoading={isLoading}
                canSummarize={canSummarize}
                settings={settings}
              />
            </section>
          </div>
        )}

        {/* 3. Loading State while processing */}
        {isLoading && (
          <LoadingState settings={settings} fileType={detectedFileType} />
        )}

        {/* 4. Results Card */}
        {result && !isLoading && (
          <SummaryCard
            result={result}
            settings={settings}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Accessible Footer */}
      <footer
        className="border-t border-slate-200 bg-white py-6 text-center text-xs font-medium text-slate-500 no-print"
      >
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          
        </div>
      </footer>
    </div>
  );
}
