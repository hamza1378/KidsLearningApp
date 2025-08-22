export interface AchievementItem {
  id: string;
  title: string;
  image: string;
  description?: string;
  unlocked?: boolean;
  progress?: number;
} 