export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  averageScore: number;
  lastActivity: string;
  isLocked: boolean;
  courses: Course[];
  stats: SubjectStats;
}

export interface Course {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'interactive';
  status: 'completed' | 'in-progress' | 'locked';
  duration?: string;
  score?: number;
}

export interface SubjectStats {
  totalQuizzes: number;
  passedQuizzes: number;
  totalVideos: number;
  watchedVideos: number;
  streakDays: number;
  bestScore: number;
}

export const subjectsData: Subject[] = [
  {
    id: 'math',
    name: 'Mathematics',
    icon: '🧮',
    color: '#3b82f6',
    progress: 75,
    totalLessons: 20,
    completedLessons: 15,
    averageScore: 85,
    lastActivity: '2 hours ago',
    isLocked: false,
    courses: [
      { id: 'math-1', title: 'Basic Addition', type: 'video', status: 'completed', duration: '5 min' },
      { id: 'math-2', title: 'Addition Quiz', type: 'quiz', status: 'completed', score: 90 },
      { id: 'math-3', title: 'Subtraction Basics', type: 'video', status: 'in-progress', duration: '8 min' },
      { id: 'math-4', title: 'Subtraction Quiz', type: 'quiz', status: 'locked' },
    ],
    stats: {
      totalQuizzes: 8,
      passedQuizzes: 7,
      totalVideos: 12,
      watchedVideos: 10,
      streakDays: 5,
      bestScore: 95,
    }
  },
  {
    id: 'reading',
    name: 'Reading & Writing',
    icon: '📖',
    color: '#10b981',
    progress: 60,
    totalLessons: 15,
    completedLessons: 9,
    averageScore: 78,
    lastActivity: '1 day ago',
    isLocked: false,
    courses: [
      { id: 'reading-1', title: 'Alphabet Recognition', type: 'video', status: 'completed', duration: '6 min' },
      { id: 'reading-2', title: 'Letter Sounds', type: 'interactive', status: 'completed' },
      { id: 'reading-3', title: 'Simple Words', type: 'video', status: 'in-progress', duration: '10 min' },
      { id: 'reading-4', title: 'Reading Quiz', type: 'quiz', status: 'locked' },
    ],
    stats: {
      totalQuizzes: 6,
      passedQuizzes: 5,
      totalVideos: 8,
      watchedVideos: 6,
      streakDays: 3,
      bestScore: 88,
    }
  },
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    color: '#f59e0b',
    progress: 45,
    totalLessons: 18,
    completedLessons: 8,
    averageScore: 72,
    lastActivity: '3 days ago',
    isLocked: false,
    courses: [
      { id: 'science-1', title: 'Living Things', type: 'video', status: 'completed', duration: '7 min' },
      { id: 'science-2', title: 'Plants Quiz', type: 'quiz', status: 'completed', score: 75 },
      { id: 'science-3', title: 'Animals', type: 'video', status: 'in-progress', duration: '9 min' },
      { id: 'science-4', title: 'Animal Quiz', type: 'quiz', status: 'locked' },
    ],
    stats: {
      totalQuizzes: 5,
      passedQuizzes: 3,
      totalVideos: 10,
      watchedVideos: 6,
      streakDays: 2,
      bestScore: 82,
    }
  },
  {
    id: 'life-skills',
    name: 'Life Skills',
    icon: '🌟',
    color: '#8b5cf6',
    progress: 90,
    totalLessons: 12,
    completedLessons: 11,
    averageScore: 92,
    lastActivity: '5 hours ago',
    isLocked: false,
    courses: [
      { id: 'life-1', title: 'Personal Hygiene', type: 'video', status: 'completed', duration: '4 min' },
      { id: 'life-2', title: 'Safety Rules', type: 'interactive', status: 'completed' },
      { id: 'life-3', title: 'Good Manners', type: 'video', status: 'completed', duration: '6 min' },
      { id: 'life-4', title: 'Life Skills Quiz', type: 'quiz', status: 'completed', score: 95 },
    ],
    stats: {
      totalQuizzes: 4,
      passedQuizzes: 4,
      totalVideos: 8,
      watchedVideos: 8,
      streakDays: 7,
      bestScore: 98,
    }
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
    color: '#06b6d4',
    progress: 30,
    totalLessons: 16,
    completedLessons: 5,
    averageScore: 68,
    lastActivity: '1 week ago',
    isLocked: false,
    courses: [
      { id: 'tech-1', title: 'Computer Basics', type: 'video', status: 'completed', duration: '8 min' },
      { id: 'tech-2', title: 'Mouse Skills', type: 'interactive', status: 'completed' },
      { id: 'tech-3', title: 'Keyboard Basics', type: 'video', status: 'in-progress', duration: '12 min' },
      { id: 'tech-4', title: 'Tech Quiz', type: 'quiz', status: 'locked' },
    ],
    stats: {
      totalQuizzes: 3,
      passedQuizzes: 2,
      totalVideos: 6,
      watchedVideos: 4,
      streakDays: 1,
      bestScore: 75,
    }
  },
  {
    id: 'arts',
    name: 'Arts & Creativity',
    icon: '🎨',
    color: '#ec4899',
    progress: 20,
    totalLessons: 14,
    completedLessons: 3,
    averageScore: 65,
    lastActivity: '2 weeks ago',
    isLocked: false,
    courses: [
      { id: 'arts-1', title: 'Colors & Shapes', type: 'video', status: 'completed', duration: '5 min' },
      { id: 'arts-2', title: 'Drawing Basics', type: 'interactive', status: 'in-progress' },
      { id: 'arts-3', title: 'Music & Rhythm', type: 'video', status: 'locked' },
      { id: 'arts-4', title: 'Creative Quiz', type: 'quiz', status: 'locked' },
    ],
    stats: {
      totalQuizzes: 2,
      passedQuizzes: 1,
      totalVideos: 4,
      watchedVideos: 2,
      streakDays: 0,
      bestScore: 70,
    }
  },
  {
    id: 'advanced-math',
    name: 'Advanced Math',
    icon: '📐',
    color: '#dc2626',
    progress: 0,
    totalLessons: 25,
    completedLessons: 0,
    averageScore: 0,
    lastActivity: 'Never',
    isLocked: true,
    courses: [],
    stats: {
      totalQuizzes: 0,
      passedQuizzes: 0,
      totalVideos: 0,
      watchedVideos: 0,
      streakDays: 0,
      bestScore: 0,
    }
  },
  {
    id: 'coding',
    name: 'Coding Basics',
    icon: '⚡',
    color: '#059669',
    progress: 0,
    totalLessons: 20,
    completedLessons: 0,
    averageScore: 0,
    lastActivity: 'Never',
    isLocked: true,
    courses: [],
    stats: {
      totalQuizzes: 0,
      passedQuizzes: 0,
      totalVideos: 0,
      watchedVideos: 0,
      streakDays: 0,
      bestScore: 0,
    }
  }
];
