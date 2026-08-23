export type SummaryLength = "short" | "medium" | "long";

export interface SummaryStats {
  wordCount: number;
  characterCount: number;
  readingTimeMinutes: number;
  summaryLength: SummaryLength;
}

export interface SummaryResult {
  fileName: string;
  fileType: "pdf" | "image" | "text";
  documentTitle: string;
  summary: string;
  keyPoints: string[];
  mainIdeas: string[];
  improvementSuggestions?: string[];
  extractedText: string;
  topics?: string[];
  documentTone?: string;
  stats: SummaryStats;
}

export interface AccessibilitySettings {
  fontSize: "normal" | "large" | "xlarge";
  highContrast: boolean;
  dyslexiaFont: boolean;
  lineSpacing: "normal" | "relaxed" | "loose";
  reducedMotion: boolean;
}

export interface SampleDocument {
  id: string;
  title: string;
  category: string;
  description: string;
  type: "text" | "pdf" | "image";
  content: string;
  previewName: string;
}
