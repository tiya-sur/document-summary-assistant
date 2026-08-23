import React from "react";
import { AlertTriangle, RotateCcw, HelpCircle } from "lucide-react";
import { AccessibilitySettings } from "../types";

interface ErrorAlertProps {
  message: string;
  onRetry: () => void;
  settings: AccessibilitySettings;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message,
  onRetry,
  settings,
}) => {
  const isHighContrast = settings.highContrast;

  return (
    <div
      id="error-alert-banner"
      role="alert"
      aria-live="assertive"
      className={`p-5 sm:p-6 rounded-2xl border transition-all ${
        isHighContrast
          ? "bg-white border-black text-black"
          : "bg-red-50/70 border-red-200 text-slate-900 modern-shadow-sm"
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-red-100 text-red-600 border border-red-200 shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Summarization Failed</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {message || "An unexpected error occurred while processing the document."}
            </p>
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5 font-medium">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              Tip: Ensure the file is a valid PDF, image (PNG, JPG, WebP), or paste clear plain text.
            </p>
          </div>
        </div>

        <button
          id="btn-retry-error"
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs bg-red-600 hover:bg-red-700 text-white transition-all cursor-pointer shadow-xs whitespace-nowrap"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
};


