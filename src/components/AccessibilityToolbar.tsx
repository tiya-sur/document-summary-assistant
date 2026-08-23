import React from "react";
import {
  Type,
  Contrast,
  BookOpen,
  AlignLeft,
  Check,
  RotateCcw,
} from "lucide-react";
import { AccessibilitySettings } from "../types";

interface AccessibilityToolbarProps {
  settings: AccessibilitySettings;
  onChangeSettings: (newSettings: AccessibilitySettings) => void;
  isOpen: boolean;
}

export const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({
  settings,
  onChangeSettings,
  isOpen,
}) => {
  if (!isOpen) return null;

  const isHighContrast = settings.highContrast;

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    onChangeSettings({
      ...settings,
      [key]: value,
    });
  };

  const resetToDefault = () => {
    onChangeSettings({
      fontSize: "normal",
      highContrast: false,
      dyslexiaFont: false,
      lineSpacing: "normal",
      reducedMotion: false,
    });
  };

  return (
    <section
      id="accessibility-toolbar-panel"
      aria-label="Accessibility settings"
      className={`border-b transition-all duration-150 ${
        isHighContrast
          ? "bg-neutral-100 border-black text-black"
          : "bg-slate-50/90 border-slate-200 text-slate-800 backdrop-blur-xs"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex items-center justify-between pb-2.5 mb-3.5 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Contrast className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Visual & Reading Preferences
            </h2>
          </div>
          <button
            id="btn-reset-accessibility"
            onClick={resetToDefault}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md border border-slate-300 bg-white text-slate-700 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Defaults
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Text Size */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-blue-600" /> Text Size
            </label>
            <div
              className="inline-flex rounded-lg border border-slate-200 bg-white p-1 gap-1 modern-shadow-sm"
              role="group"
              aria-label="Text Size selector"
            >
              {(
                [
                  { id: "normal", label: "Default (100%)" },
                  { id: "large", label: "Large (115%)" },
                  { id: "xlarge", label: "X-Large (130%)" },
                ] as const
              ).map((opt) => {
                const isSelected = settings.fontSize === opt.id;
                return (
                  <button
                    key={opt.id}
                    id={`btn-fontsize-${opt.id}`}
                    onClick={() => updateSetting("fontSize", opt.id)}
                    aria-pressed={isSelected}
                    className={`flex-1 py-1.5 px-2 rounded-md font-medium text-xs transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue-600 text-white shadow-xs font-semibold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* High Contrast Mode */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <Contrast className="w-3.5 h-3.5 text-blue-600" /> Contrast Mode
            </label>
            <div
              className="inline-flex rounded-lg border border-slate-200 bg-white p-1 gap-1 modern-shadow-sm"
              role="group"
            >
              <button
                id="btn-contrast-standard"
                onClick={() => updateSetting("highContrast", false)}
                aria-pressed={!settings.highContrast}
                className={`flex-1 py-1.5 px-2 rounded-md font-medium text-xs transition-all cursor-pointer ${
                  !settings.highContrast
                    ? "bg-blue-600 text-white shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Standard
              </button>
              <button
                id="btn-contrast-high"
                onClick={() => updateSetting("highContrast", true)}
                aria-pressed={settings.highContrast}
                className={`flex-1 py-1.5 px-2 rounded-md font-medium text-xs transition-all cursor-pointer ${
                  settings.highContrast
                    ? "bg-black text-white shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                High Contrast
              </button>
            </div>
          </div>

          {/* Dyslexia / Spacing Mode */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" /> Reading Spacing
            </label>
            <button
              id="btn-toggle-dyslexia-spacing"
              onClick={() =>
                updateSetting("dyslexiaFont", !settings.dyslexiaFont)
              }
              aria-pressed={settings.dyslexiaFont}
              className={`w-full py-2 px-3 rounded-lg border font-medium text-xs flex items-center justify-between transition-all cursor-pointer modern-shadow-sm ${
                settings.dyslexiaFont
                  ? "bg-blue-50 border-blue-400 text-blue-800 font-semibold"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span>Wide Letter Spacing</span>
              {settings.dyslexiaFont ? (
                <Check className="w-4 h-4 text-blue-600" />
              ) : (
                <span className="text-slate-400 text-[11px]">Off</span>
              )}
            </button>
          </div>

          {/* Line Height Spacing */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <AlignLeft className="w-3.5 h-3.5 text-blue-600" /> Line Height
            </label>
            <div
              className="inline-flex rounded-lg border border-slate-200 bg-white p-1 gap-1 modern-shadow-sm"
              role="group"
            >
              {(
                [
                  { id: "normal", label: "Normal" },
                  { id: "relaxed", label: "Relaxed" },
                  { id: "loose", label: "Loose" },
                ] as const
              ).map((spacing) => {
                const isSelected = settings.lineSpacing === spacing.id;
                return (
                  <button
                    key={spacing.id}
                    id={`btn-spacing-${spacing.id}`}
                    onClick={() => updateSetting("lineSpacing", spacing.id)}
                    aria-pressed={isSelected}
                    className={`flex-1 py-1.5 px-2 rounded-md font-medium text-xs transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue-600 text-white shadow-xs font-semibold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {spacing.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


