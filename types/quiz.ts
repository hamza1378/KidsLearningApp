// Types for quiz-related data structures

export interface QuizData {
  id: string;
  title: string;
  subject?: string;
  quizType?: string;
  watchedAt: string;
}

export interface ProcessedQuiz extends QuizData {
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface VideoData {
  id: string;
  title: string;
  subject?: string;
  videoType?: string;
  scannedAt: string;
  duration?: string;
  watchedPercentage?: number;
}

export interface ProcessedVideo extends VideoData {
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}
