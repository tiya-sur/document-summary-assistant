import React from "react";
import { FileText, Sparkles, SlidersHorizontal, Info } from "lucide-react";
import { AccessibilitySettings } from "../types";

interface HeaderProps {
  settings: AccessibilitySettings;
  onToggleSettings: () => void;
  isSettingsOpen: boolean;
  onOpenInfoModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onToggleSettings,
  isSettingsOpen,
  onOpenInfoModal,
}) => {
  const isHighContrast = settings.highContrast;

  return (
    <header
      id="main-app-header"
      className={`border-b transition-colors duration-150 ${
        isHighContrast
          ? "bg-white border-black text-black"
          : "bg-white border-slate-200 text-slate-900 modern-shadow-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4.5 sm:py-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3.5">
            <div
              className={`p-2.5 sm:p-3 rounded-xl flex items-center justify-center transition-all ${
                isHighContrast
                  ? "bg-black text-white border-2 border-black"
                  : "bg-blue-600 text-white shadow-sm"
              }`}
              aria-hidden="true"
            >
              <FileText className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1
                  id="app-heading"
                  className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900"
                >
                  Document Summary Assistant
                </h1>
               
              </div>
              <p
                id="app-subheading"
                className="text-sm text-slate-600 mt-0.5"
              >
                Instant smart document extraction, OCR scanning, and executive summaries.
              </p>
            </div>
          </div>

          
          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            {onOpenInfoModal && (
              <button
                type="button"
                id="btn-open-project-info"
                onClick={onOpenInfoModal}
                className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  isHighContrast
                    ? "bg-white text-black border border-black hover:bg-neutral-100"
                    : "bg-white text-slate-700 border border-slate-300 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/40 shadow-xs"
                }`}
                title="View Assessment Scope & Approach Write-up"
              >
                <Info className="w-4 h-4 text-blue-600" />
                <span>Approach & Docs</span>
              </button>
            )}

            <button
              id="btn-toggle-accessibility-settings"
              onClick={onToggleSettings}
              aria-expanded={isSettingsOpen}
              aria-controls="accessibility-toolbar-panel"
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                isSettingsOpen
                  ? isHighContrast
                    ? "bg-black text-white border border-black"
                    : "bg-blue-600 text-white shadow-sm"
                  : isHighContrast
                  ? "bg-white text-black border border-black hover:bg-neutral-100"
                  : "bg-white text-slate-700 border border-slate-300 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/40 shadow-xs"
              }`}
              title="Open Accessibility Controls (Text size, High contrast, Spacing)"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Accessibility</span>
              {settings.highContrast && (
                <span className="w-2 h-2 rounded-full bg-blue-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};


