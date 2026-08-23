import React, { useState, useRef } from "react";
import {
  UploadCloud,
  FileText,
  Image as ImageIcon,
  FileCode,
  X,
  Sparkles,
  Clipboard,
  FileCheck,
  CheckCircle2,
} from "lucide-react";
import { SampleDocument, AccessibilitySettings } from "../types";
import { SAMPLE_DOCUMENTS } from "../data/sampleDocs";

interface UploadBoxProps {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  rawText: string;
  onRawTextChange: (text: string) => void;
  activeInputMode: "file" | "text" | "samples";
  onInputModeChange: (mode: "file" | "text" | "samples") => void;
  onSelectSample: (sample: SampleDocument) => void;
  settings: AccessibilitySettings;
  disabled?: boolean;
}

export const UploadBox: React.FC<UploadBoxProps> = ({
  selectedFile,
  onFileSelect,
  rawText,
  onRawTextChange,
  activeInputMode,
  onInputModeChange,
  onSelectSample,
  settings,
  disabled,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isHighContrast = settings.highContrast;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    onFileSelect(file);
    onInputModeChange("file");
  };

  const getFileIcon = (file: File) => {
    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      return <FileText className="w-7 h-7 text-red-600" />;
    }
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="w-7 h-7 text-blue-600" />;
    }
    return <FileCode className="w-7 h-7 text-blue-600" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="w-full">
      
      <div
        className="flex flex-wrap items-center gap-2 mb-4 p-1 rounded-xl bg-slate-100/90 border border-slate-200"
        role="tablist"
        aria-label="Document Input Mode"
      >
        <button
          id="tab-upload-file"
          role="tab"
          aria-selected={activeInputMode === "file"}
          onClick={() => onInputModeChange("file")}
          disabled={disabled}
          className={`flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            activeInputMode === "file"
              ? isHighContrast
                ? "bg-black text-white"
                : "bg-white text-blue-700 shadow-xs border border-blue-200/60"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
          }`}
        >
          <UploadCloud className="w-4 h-4 text-blue-600" />
          <span>Upload File (PDF / Image)</span>
        </button>

        <button
          id="tab-paste-text"
          role="tab"
          aria-selected={activeInputMode === "text"}
          onClick={() => onInputModeChange("text")}
          disabled={disabled}
          className={`flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            activeInputMode === "text"
              ? isHighContrast
                ? "bg-black text-white"
                : "bg-white text-blue-700 shadow-xs border border-blue-200/60"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
          }`}
        >
          <Clipboard className="w-4 h-4 text-blue-600" />
          <span>Paste Text</span>
        </button>

        <button
          id="tab-sample-documents"
          role="tab"
          aria-selected={activeInputMode === "samples"}
          onClick={() => onInputModeChange("samples")}
          disabled={disabled}
          className={`flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            activeInputMode === "samples"
              ? isHighContrast
                ? "bg-black text-white"
                : "bg-white text-blue-700 shadow-xs border border-blue-200/60"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
          }`}
        >
          
          <span>Sample Documents</span>
        </button>
      </div>

     
      {activeInputMode === "file" && (
        <div
          id="upload-dropzone-container"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center transition-all duration-150 modern-shadow-sm ${
            isDragOver
              ? "border-blue-500 bg-blue-50/60 scale-[1.005]"
              : isHighContrast
              ? "border-black bg-white"
              : "border-slate-300 bg-white hover:border-blue-400 hover:bg-blue-50/20"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            id="file-upload-input"
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg,.webp,.txt"
            onChange={handleFileInputChange}
            disabled={disabled}
          />

          {!selectedFile ? (
            <div className="flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto">
              <div
                className={`p-4 rounded-2xl transition-all ${
                  isHighContrast
                    ? "bg-black text-white border-2 border-black"
                    : "bg-blue-50 text-blue-600 border border-blue-100"
                }`}
                aria-hidden="true"
              >
                <UploadCloud className="w-10 h-10 stroke-[2.2]" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Upload document or scanned image
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Drag and drop your file here, or click to browse.
                </p>
                <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-600">
                  <span>Formats:</span>
                  <span className="font-semibold text-slate-800">PDF, PNG, JPG, JPEG, TXT</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  id="btn-choose-file"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={disabled}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-all cursor-pointer ${
                    isHighContrast
                      ? "bg-black text-white border border-black hover:bg-neutral-800"
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow"
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span>Choose File</span>
                </button>
              </div>

              <p className="text-xs text-slate-400">
                Max file size: 25MB • Scanned images auto-transcribed via Gemini OCR
              </p>
            </div>
          ) : (
            
            <div
              id="selected-file-card"
              className="p-5 rounded-xl border border-blue-200 bg-blue-50/50 text-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-left modern-shadow-sm"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-2xs">
                  {getFileIcon(selectedFile)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full uppercase border ${
                        selectedFile.name.endsWith(".pdf")
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-blue-100 text-blue-800 border-blue-200"
                      }`}
                    >
                      {selectedFile.type || "Document"}
                    </span>
                    <span className="text-xs font-semibold text-blue-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Ready for summary
                    </span>
                  </div>
                  <h4 className="text-base font-semibold break-all mt-0.5 text-slate-900">
                    {selectedFile.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Size: {formatFileSize(selectedFile.size)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="btn-reselect-file"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={disabled}
                  className="px-3.5 py-2 rounded-lg text-xs font-semibold border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300 transition-all cursor-pointer"
                >
                  Change File
                </button>
                <button
                  type="button"
                  id="btn-remove-file"
                  onClick={() => onFileSelect(null)}
                  disabled={disabled}
                  aria-label="Remove selected file"
                  className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 bg-white transition-all cursor-pointer"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

     
      {activeInputMode === "text" && (
        <div className="space-y-3">
          <div className="p-6 rounded-2xl border border-slate-200 bg-white modern-shadow-sm">
            <label
              htmlFor="raw-text-textarea"
              className="block text-base font-semibold text-slate-900 mb-2"
            >
              Paste or write document text:
            </label>
            <textarea
              id="raw-text-textarea"
              rows={8}
              value={rawText}
              onChange={(e) => onRawTextChange(e.target.value)}
              disabled={disabled}
              placeholder="Paste article, contract terms, memo, lecture notes, or research text here to generate a summary..."
              className="w-full p-4 rounded-xl border border-slate-300 text-sm resize-y bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
            />
            <div className="flex items-center justify-between mt-3 text-xs text-slate-500 font-medium">
              <span>
                {rawText.trim()
                  ? `${rawText.trim().split(/\s+/).length} words • ${rawText.length} characters`
                  : "No text entered yet"}
              </span>
              {rawText && (
                <button
                  type="button"
                  id="btn-clear-text"
                  onClick={() => onRawTextChange("")}
                  disabled={disabled}
                  className="text-red-600 hover:text-red-700 hover:underline cursor-pointer font-semibold"
                >
                  Clear text
                </button>
              )}
            </div>
          </div>
        </div>
      )}

     
      {activeInputMode === "samples" && (
        <div className="space-y-3">
          <div className="p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white modern-shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Select a pre-loaded sample document to test immediately:
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Click any sample below to load and run full AI summarization & key point extraction.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {SAMPLE_DOCUMENTS.map((sample) => (
                <div
                  key={sample.id}
                  id={`card-sample-${sample.id}`}
                  className="text-left p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50/40 hover:border-blue-300 transition-all flex flex-col justify-between group hover:shadow-xs"
                >
                  <div>
                    <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase mb-2 bg-blue-100 text-blue-800 border border-blue-200">
                      {sample.category}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                      {sample.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {sample.description}
                    </p>
                  </div>
                  <div className="mt-3.5 pt-2.5 border-t border-slate-200 flex items-center gap-2">
                    <button
                      type="button"
                      id={`btn-sample-load-${sample.id}`}
                      onClick={() => onSelectSample(sample)}
                      disabled={disabled}
                      className="flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-blue-600 flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-2xs"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Load Sample</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


