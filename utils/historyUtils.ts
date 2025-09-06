import { rawPendingQuizzes } from '@/data/pendingQuizzes';
import { rawPendingVideos } from '@/data/pendingVideos';
import sampleQuizResults from '@/data/sampleQuizResults';

export function getSectionsToShow(
  tab: string | undefined,
  filter: string | undefined,
  pendingQuizzes: any[],
  pendingVideos: any[],
  completedQuizzes: any[],
  totalCompletedQuizzes: number,
  completedVideos: number
) {
  const allSections = [
    {
      id: 'pending-quizzes',
      title: 'Pending Quizzes',
      icon: 'time-outline',
      color: '#f59e0b',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      data: pendingQuizzes,
      count: pendingQuizzes.length,
    },
    {
      id: 'completed-quizzes',
      title: filter === 'passed' ? 'Passed Quizzes' : filter === 'failed' ? 'Failed Quizzes' : 'Completed Quizzes',
      icon: filter === 'passed' ? 'trophy' : filter === 'failed' ? 'close-circle' : 'checkmark-circle-outline',
      color: filter === 'passed' ? '#22c55e' : filter === 'failed' ? '#ef4444' : '#10b981',
      bgColor: filter === 'passed' ? 'bg-green-50' : filter === 'failed' ? 'bg-red-50' : 'bg-green-50',
      borderColor: filter === 'passed' ? 'border-green-200' : filter === 'failed' ? 'border-red-200' : 'border-green-200',
      data: completedQuizzes,
      count: totalCompletedQuizzes,
    },
    {
      id: 'pending-videos',
      title: 'Pending Videos',
      icon: 'play-circle-outline',
      color: '#3b82f6',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      data: pendingVideos,
      count: pendingVideos.length,
    },
    {
      id: 'completed-videos',
      title: 'Completed Videos',
      icon: 'checkmark-done-outline',
      color: '#8b5cf6',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      data: [], // TODO: replace with backend data
      count: completedVideos,
    },
  ];

  // If tab is specified, show only that section (focused view)
  if (tab === 'pending-quizzes') {
    return allSections.filter(section => section.id === 'pending-quizzes');
  }
  if (tab === 'pending-videos') {
    return allSections.filter(section => section.id === 'pending-videos');
  }
  if (tab === 'completed-quizzes') {
    return allSections.filter(section => section.id === 'completed-quizzes');
  }
  if (tab === 'completed-videos') {
    return allSections.filter(section => section.id === 'completed-videos');
  }

  // Default: show all sections
  return allSections;
}

export function createLoadMoreFunction(
  setCurrentPage: (fn: (prev: number) => number) => void,
  setIsLoadingMore: (loading: boolean) => void,
  setHasMoreData: (hasMore: boolean) => void,
  currentPage: number,
  tab: string | undefined,
  allPendingQuizzes: any[],
  allPendingVideos: any[],
  ITEMS_PER_PAGE: number
) {
  return () => {
    setIsLoadingMore(true);
    // Simulate API call delay
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setIsLoadingMore(false);
      
      // Check if we've loaded all data
      const totalLoaded = (currentPage + 1) * ITEMS_PER_PAGE;
      if (tab === 'pending-quizzes') {
        setHasMoreData(totalLoaded < allPendingQuizzes.length);
      } else if (tab === 'pending-videos') {
        setHasMoreData(totalLoaded < allPendingVideos.length);
      } else {
        setHasMoreData(totalLoaded < (allPendingQuizzes.length + allPendingVideos.length));
      }
    }, 1000);
  };
}
