import { useState, useEffect } from 'react';
import { rawPendingQuizzes } from '@/data/pendingQuizzes';
import { rawPendingVideos } from '@/data/pendingVideos';
import sampleQuizResults from '@/data/sampleQuizResults';
import { processPendingQuizzes } from '@/utils/quizUtils';
import { processPendingVideos } from '@/utils/videoUtils';

interface UseHistoryDataProps {
  selectedSubject: string | null;
  filter?: string;
  currentPage: number;
  ITEMS_PER_PAGE: number;
}

export function useHistoryData({ selectedSubject, filter, currentPage, ITEMS_PER_PAGE }: UseHistoryDataProps) {
  // Filter data based on selected subject
  const filteredPendingQuizzes = selectedSubject
    ? rawPendingQuizzes.filter(q => q.subject === selectedSubject)
    : rawPendingQuizzes;
    
  const filteredPendingVideos = selectedSubject
    ? rawPendingVideos.filter(v => v.subject === selectedSubject)
    : rawPendingVideos;

  // Process data for display with pagination
  const allPendingQuizzes = processPendingQuizzes(filteredPendingQuizzes);
  const allPendingVideos = processPendingVideos(filteredPendingVideos);
  
  // Process completed quiz data
  const filteredCompletedQuizzes = selectedSubject
    ? sampleQuizResults.filter((q: any) => q.subject === selectedSubject)
    : sampleQuizResults;
  
  // Filter completed quizzes by passed/failed status
  const getCompletedQuizzesByFilter = () => {
    if (filter === 'passed') {
      return filteredCompletedQuizzes.filter((q: any) => q.passed);
    } else if (filter === 'failed') {
      return filteredCompletedQuizzes.filter((q: any) => !q.passed);
    }
    return filteredCompletedQuizzes;
  };
  
  const allCompletedQuizzes = getCompletedQuizzesByFilter();
  
  // For stats calculation - we need both filtered and unfiltered data
  const allSubjectsPendingQuizzes = processPendingQuizzes(rawPendingQuizzes);
  const allSubjectsPendingVideos = processPendingVideos(rawPendingVideos);
  const allSubjectsCompletedQuizzes = sampleQuizResults;
  
  // Apply pagination to data
  const pendingQuizzes = allPendingQuizzes.slice(0, currentPage * ITEMS_PER_PAGE);
  const pendingVideos = allPendingVideos.slice(0, currentPage * ITEMS_PER_PAGE);
  const completedQuizzes = allCompletedQuizzes.slice(0, currentPage * ITEMS_PER_PAGE);
  
  // Check if there's more data to load
  const hasMoreQuizzes = allPendingQuizzes.length > pendingQuizzes.length;
  const hasMoreVideos = allPendingVideos.length > pendingVideos.length;
  const hasMoreCompletedQuizzes = allCompletedQuizzes.length > completedQuizzes.length;

  return {
    // Paginated data for display
    pendingQuizzes,
    pendingVideos,
    completedQuizzes,
    
    // Full data for stats
    allPendingQuizzes,
    allPendingVideos,
    allCompletedQuizzes,
    
    // All subjects data for comparison
    allSubjectsPendingQuizzes,
    allSubjectsPendingVideos,
    allSubjectsCompletedQuizzes,
    
    // Pagination info
    hasMoreQuizzes,
    hasMoreVideos,
    hasMoreCompletedQuizzes
  };
}
