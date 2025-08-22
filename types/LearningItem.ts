export interface LearningItem {
  id: string;
  title: string;
  level: string;
  image: string;
  progress?: number;
  isNew?: boolean;
} 