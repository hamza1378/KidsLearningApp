import { VideoData, ProcessedVideo } from '@/types/quiz';

// Utility functions for video icons and colors
export const getVideoIcon = (subject?: string, videoType?: string): string => {
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
    'default': 'play-circle'
  };

  // Video type-based icons (fallback)
  const typeIcons = {
    'tutorial': 'school',
    'lecture': 'people',
    'demo': 'eye',
    'animation': 'color-wand',
    'interactive': 'game-controller',
    'default': 'play-circle'
  };

  return subjectIcons[subject?.toLowerCase() as keyof typeof subjectIcons] || 
         typeIcons[videoType?.toLowerCase() as keyof typeof typeIcons] || 
         subjectIcons.default;
};

export const getVideoColors = (index: number) => {
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

// Process video data for display (backend-ready)
export const processPendingVideos = (rawVideos: VideoData[]): ProcessedVideo[] => {
  return rawVideos.map((video, index) => ({
    id: video.id,
    title: video.title,
    scannedAt: video.scannedAt,
    duration: video.duration,
    watchedPercentage: video.watchedPercentage,
    icon: getVideoIcon(video.subject, video.videoType),
    ...getVideoColors(index)
  }));
};
