import { QuizData } from '@/types/quiz';

// Sample data for pending quizzes (will be replaced with backend data)
export const rawPendingQuizzes: QuizData[] = [
  { 
    id: '1', 
    title: 'Addition Basics Quiz', 
    subject: 'math',
    quizType: 'multiple-choice',
    watchedAt: '2 hours ago'
  },
  { 
    id: '2', 
    title: 'Photosynthesis Process Quiz', 
    subject: 'science',
    quizType: 'multiple-choice',
    watchedAt: '1 day ago'
  },
  { 
    id: '3', 
    title: 'Grammar Rules Quiz', 
    subject: 'english',
    quizType: 'fill-blank',
    watchedAt: '2 days ago'
  },
  { 
    id: '4', 
    title: 'World Geography Quiz', 
    subject: 'geography',
    quizType: 'multiple-choice',
    watchedAt: '3 days ago'
  }
];
