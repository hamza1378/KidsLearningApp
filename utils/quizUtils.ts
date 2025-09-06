import { QuizData, ProcessedQuiz } from '@/types/quiz';

// Utility functions for quiz icons and colors
export const getQuizIcon = (subject?: string, quizType?: string): string => {
  // Subject-based icons (primary)
  const subjectIcons = {
    'math': 'calculator',
    'mathematics': 'calculator',
    'science': 'flask',
    'english': 'book',
    'language': 'book',
    'history': 'library',
    'geography': 'globe',
    'art': 'color-palette',
    'music': 'musical-notes',
    'physics': 'nuclear',
    'chemistry': 'flask',
    'biology': 'leaf',
    'default': 'help-circle'
  };

  // Quiz type-based icons (fallback)
  const typeIcons = {
    'multiple-choice': 'radio-button-on',
    'true-false': 'checkmark-circle',
    'fill-blank': 'create',
    'matching': 'swap-horizontal',
    'essay': 'document-text',
    'default': 'help-circle'
  };

  return subjectIcons[subject?.toLowerCase() as keyof typeof subjectIcons] || 
         typeIcons[quizType?.toLowerCase() as keyof typeof typeIcons] || 
         subjectIcons.default;
};

export const getQuizColors = (index: number) => {
  const colorSchemes = [
    { color: '#22c55e', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
    { color: '#3b82f6', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    { color: '#8b5cf6', bgColor: 'bg-violet-50', borderColor: 'border-violet-200' },
    { color: '#f59e0b', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
    { color: '#ef4444', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
    { color: '#06b6d4', bgColor: 'bg-cyan-50', borderColor: 'border-cyan-200' },
    { color: '#84cc16', bgColor: 'bg-lime-50', borderColor: 'border-lime-200' },
    { color: '#f97316', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' }
  ];
  return colorSchemes[index % colorSchemes.length];
};

export const formatTimeAgo = (dateString: string) => {
  // This will be used when backend sends actual timestamps
  const now = new Date();
  const date = new Date(dateString);
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
};

// Process quiz data for display (backend-ready)
export const processPendingQuizzes = (rawQuizzes: QuizData[]): ProcessedQuiz[] => {
  return rawQuizzes.map((quiz, index) => ({
    id: quiz.id,
    title: quiz.title,
    watchedAt: quiz.watchedAt, 
    icon: getQuizIcon(quiz.subject, quiz.quizType),
    ...getQuizColors(index)
  }));
};
