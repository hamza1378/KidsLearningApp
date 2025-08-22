import { Achievement } from '@/types/Achievement';

const sampleAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Quiz Master',
    description: 'Complete your first quiz',
    icon: '🏆',
    unlocked: true,
    progress: 100,
  },
  {
    id: '2',
    title: 'Perfect Score',
    description: 'Get 100% on any quiz',
    icon: '⭐',
    unlocked: true,
    progress: 100,
  },
  {
    id: '3',
    title: 'Math Whiz',
    description: 'Complete 5 math quizzes',
    icon: '🧮',
    unlocked: false,
    progress: 60,
  },
  {
    id: '4',
    title: 'Science Explorer',
    description: 'Complete 3 science quizzes',
    icon: '🔬',
    unlocked: false,
    progress: 33,
  },
  {
    id: '5',
    title: 'Language Learner',
    description: 'Complete 2 language quizzes',
    icon: '📚',
    unlocked: false,
    progress: 50,
  },
];

export default sampleAchievements;