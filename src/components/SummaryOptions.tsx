import React from "react";
import { Sparkles, ArrowRight, Zap, ListTree, BookOpenText } from "lucide-react";
import { SummaryLength, AccessibilitySettings } from "../types";

interface SummaryOptionsProps {
  length: SummaryLength;
  onLengthChange: (len: SummaryLength) => void;
  customFocus: string;
  onCustomFocusChange: (val: string) => void;
  onSummarize: () => void;
  isLoading: boolean;
  canSummarize: boolean;
  settings: AccessibilitySettings;
}

export const SummaryOptions: React.FC<SummaryOptionsProps> = ({
  length,
  onLengthChange,
  customFocus,
  onCustomFocusChange,
  onSummarize,
  isLoading,
  canSummarize,
  settings,
}) => {
  const isHighContrast = settings.highContrast;

  const lengthOptions: {
    id: SummaryLength;
    label: string;
    description: string;
    icon: React.ReactNode;
    badge: string;
  }[] = [
    {
      id: "short",
      label: "Short",
      description: "Quick 1-2 paragraph executive summary + 3-5 key points",
      badge: "~30s read",
      icon: <Zap className="w-4 h-4" />,
    },
    {
      id: "medium",
      label: "Medium",
      description: "Balanced 2-3 section overview + 5-7 key takeaways & main ideas",
      badge: "~1-2m read",
      icon: <ListTree className="w-4 h-4" />,
    },
    {
      id: "long",
      label: "Long",
      description: "In-depth comprehensive breakdown + all topics, conclusions & action steps",
      badge: "~3-5m read",
      icon: <BookOpenText className="w-4 h-4" />,
    },
  ];

  return (
    <div
      id="summary-options-card"
      className={`p-6 sm:p-7 rounded-2xl border transition-all ${
        isHighContrast
          ? "bg-white border-black text-black"
          : "bg-white border-slate-200 text-slate-900 modern-shadow-sm"
      }`}
    >
      <div className="space-y-5">
       
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label
              id="length-selector-label"
              className="text-sm font-bold text-slate-900"
            >
              Summary Detail Level
            </label>
            <span className="text-xs text-slate-500 font-medium">
              Choose depth of extraction
            </span>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            role="radiogroup"
            aria-labelledby="length-selector-label"
          >
            {lengthOptions.map((opt) => {
              const isSelected = length === opt.id;
              return (
                <button
                  key={opt.id}
                  id={`btn-length-${opt.id}`}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => onLengthChange(opt.id)}
                  disabled={isLoading}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? isHighContrast
                        ? "bg-black text-white border-black"
                        : "bg-blue-50/70 border-blue-500 text-slate-900 ring-1 ring-blue-500 shadow-xs"
                      : "bg-slate-50/60 text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-base text-slate-900">
                        <span className={isSelected && !isHighContrast ? "text-blue-600" : "text-slate-500"}>
                          {opt.icon}
                        </span>
                        <span>{opt.label}</span>
                      </div>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-md font-semibold ${
                          isSelected
                            ? isHighContrast
                              ? "bg-white text-black"
                              : "bg-blue-100 text-blue-800"
                            : "bg-slate-200/80 text-slate-600"
                        }`}
                      >
                        {opt.badge}
                      </span>
                    </div>
                    <p
                      className={`text-xs leading-relaxed ${
                        isSelected && !isHighContrast ? "text-slate-700" : "text-slate-500"
                      }`}
                    >
                      {opt.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-end">
                    <span className={`text-[11px] font-semibold tracking-wide ${isSelected ? "text-blue-600" : "text-slate-400"}`}>
                      {isSelected ? "● Selected" : "○ Select"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

       
        <div>
          <label
            htmlFor="input-custom-focus"
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            Special Focus / Custom Instruction (Optional)
          </label>
          <input
            id="input-custom-focus"
            type="text"
            value={customFocus}
            onChange={(e) => onCustomFocusChange(e.target.value)}
            disabled={isLoading}
            placeholder="e.g., Focus on key financial figures, deadlines, or action items"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
          />
        </div>

        
        <div className="pt-1">
          <button
            id="btn-summarize-action"
            type="button"
            onClick={onSummarize}
            disabled={!canSummarize || isLoading}
            className={`w-full py-3.5 px-6 rounded-xl text-base font-bold flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
              !canSummarize || isLoading
                ? "opacity-50 cursor-not-allowed bg-slate-200 text-slate-500 border border-slate-300"
                : isHighContrast
                ? "bg-black text-white border border-black hover:bg-neutral-800"
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow active:scale-[0.99]"
            }`}
          >
            
            <span>
              {isLoading
                ? "Analyzing & Summarizing..."
                : canSummarize
                ? `Generate ${length.toUpperCase()} Summary`
                : "Select or Upload a Document First"}
            </span>
            {canSummarize && !isLoading && (
              <ArrowRight className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};


