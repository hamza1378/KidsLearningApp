import { VideoData } from '@/types/quiz';

// Sample data for pending videos (will be replaced with backend data)
export const rawPendingVideos: VideoData[] = [
  { 
    id: '1', 
    title: 'Multiplication Tables Tutorial', 
    subject: 'math',
    videoType: 'tutorial',
    scannedAt: '1 hour ago',
    duration: '8 min',
    watchedPercentage: 25
  },
  { 
    id: '2', 
    title: 'Solar System Animation', 
    subject: 'science',
    videoType: 'animation',
    scannedAt: '3 hours ago',
    duration: '12 min',
    watchedPercentage: 60
  },
  { 
    id: '3', 
    title: 'Grammar Rules Lecture', 
    subject: 'english',
    videoType: 'lecture',
    scannedAt: '1 day ago',
    duration: '15 min',
    watchedPercentage: 10
  },
  { 
    id: '4', 
    title: 'World Capitals Demo', 
    subject: 'geography',
    videoType: 'demo',
    scannedAt: '2 days ago',
    duration: '6 min',
    watchedPercentage: 80
  }
];
