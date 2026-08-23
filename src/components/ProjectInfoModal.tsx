import React from "react";
import { X, CheckCircle2, FileText, Sparkles, Layers, Cpu, ShieldCheck } from "lucide-react";
import { AccessibilitySettings } from "../types";

interface ProjectInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
}

export const ProjectInfoModal: React.FC<ProjectInfoModalProps> = ({
  isOpen,
  onClose,
  settings,
}) => {
  if (!isOpen) return null;

  const isHighContrast = settings.highContrast;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-7 transition-all ${
          isHighContrast
            ? "bg-white border-2 border-black text-black"
            : "bg-white border border-slate-200 text-slate-900 modern-shadow-lg"
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Assessment Project Challenge</span>
            </div>
            <h2
              id="modal-project-title"
              className="text-xl font-bold text-slate-900"
            >
              Document Summary Assistant
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close project info modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {}
        <div className="space-y-6 pt-5 text-sm leading-relaxed">
          {/* Deliverable 3: Brief write-up (max 200 words) */}
          <div className="p-4.5 rounded-xl bg-blue-50/70 border border-blue-200/80 space-y-2">
            <div className="flex items-center gap-2 font-bold text-blue-900 text-sm">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Deliverable: Approach Write-up (&lt;200 words)</span>
            </div>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              We built the Document Summary Assistant using React 18, TypeScript, and an Express proxy leveraging Gemini 2.5 Flash for multimodal PDF parsing and OCR text extraction. Scanned images and complex PDF structures are ingested via drag-and-drop or file upload, processed through AI vision OCR, and structured into executive summaries, numbered key points, core concepts, and actionable improvement recommendations. Summary length options (short, medium, long) give users tailored depth. The UI prioritizes WCAG AA accessibility with text scaling, high-contrast theming, speech synthesis read-aloud, and multi-format exports.
            </p>
          </div>

       
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Requirements Verification Checklist</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { title: "1. Document Upload", desc: "PDF & Image uploads (PNG, JPG, JPEG) + Drag-and-drop & file picker" },
                { title: "2. Text Extraction & OCR", desc: "PDF text parsing + Vision OCR for scanned files with raw text inspector" },
                { title: "3. Smart Summaries", desc: "Short (~30s), Medium (~1-2m), and Long (~3-5m) length options" },
                { title: "4. Key Points & Main Ideas", desc: "Numbered takeaways and highlighted core concepts" },
                { title: "5. Improvement Suggestions", desc: "Actionable recommendations and next steps for the document" },
                { title: "6. UI/UX & Responsive", desc: "Clean modern design, mobile-responsive layout, and WCAG AA accessibility" },
                { title: "7. Loading & Error States", desc: "Step-by-step progress tracker and resilient error handling with retries" },
                { title: "8. Export & TTS", desc: "Text-to-speech voice playback and export to .TXT, .MD, .JSON, & Print" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-xs text-slate-900">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

         
          <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-slate-400" />
              <span>Stack: React • TypeScript • Express • Gemini 2.5 Flash • Tailwind CSS</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs cursor-pointer shadow-xs transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
