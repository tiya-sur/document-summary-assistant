import React, { useEffect, useState } from "react";
import { Loader2, FileSearch, Sparkles, CheckCircle2, Bot } from "lucide-react";
import { AccessibilitySettings } from "../types";

interface LoadingStateProps {
  settings: AccessibilitySettings;
  fileType?: "pdf" | "image" | "text";
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  settings,
  fileType = "pdf",
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const isHighContrast = settings.highContrast;

  const steps = [
    {
      title: "Detecting Document Format",
      desc: `Verifying ${fileType.toUpperCase()} file structure and metadata...`,
      icon: <FileSearch className="w-4 h-4" />,
    },
    {
      title:
        fileType === "image"
          ? "Performing High-Accuracy OCR"
          : "Extracting Text & Layout",
      desc:
        fileType === "image"
          ? "Scanning text lines, headers, and visual data blocks..."
          : "Parsing document text streams and structural sections...",
      icon: <Bot className="w-4 h-4" />,
    },
    {
      title: "AI Synthesis & Analysis",
      desc: "Distilling core arguments, identifying facts, and structuring insights...",
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      title: "Finalizing Summary & Key Takeaways",
      desc: "Formatting bullet points, conclusions, and readability metrics...",
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 1200);
    const timer2 = setTimeout(() => setCurrentStep(2), 2600);
    const timer3 = setTimeout(() => setCurrentStep(3), 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div
      id="processing-loading-card"
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={`p-8 sm:p-10 rounded-2xl border text-center transition-all ${
        isHighContrast
          ? "bg-white border-black"
          : "bg-white border-slate-200 modern-shadow-md"
      }`}
    >
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex justify-center">
          <div
            className={`p-4 rounded-2xl inline-flex items-center justify-center ${
              isHighContrast
                ? "bg-black text-white"
                : "bg-blue-50 text-blue-600 border border-blue-100 shadow-xs"
            }`}
          >
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Processing Your Document
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Gemini AI is analyzing content and generating structured insights.
          </p>
        </div>

        {/* Step Progress Tracker */}
        <div className="space-y-2.5 text-left pt-1">
          {steps.map((step, idx) => {
            const isDone = currentStep > idx;
            const isCurrent = currentStep === idx;

            return (
              <div
                key={idx}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                  isCurrent
                    ? isHighContrast
                      ? "bg-black text-white border-black"
                      : "bg-blue-50/70 border-blue-400 text-slate-900 ring-1 ring-blue-400 shadow-2xs"
                    : isDone
                    ? "bg-slate-50 border-slate-200 text-slate-700"
                    : "bg-slate-50/40 border-slate-100 text-slate-400 opacity-60"
                }`}
              >
                <div className="mt-0.5">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] font-semibold text-slate-400">
                      {idx + 1}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold">{step.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


