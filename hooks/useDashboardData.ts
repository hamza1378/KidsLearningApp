import { useState } from 'react';
import sampleQuizResults from '@/data/sampleQuizResults';
import { rawPendingQuizzes } from '@/data/pendingQuizzes';
import { rawPendingVideos } from '@/data/pendingVideos';
import { processPendingQuizzes } from '@/utils/quizUtils';
import { processPendingVideos } from '@/utils/videoUtils';

interface UseDashboardDataProps {
  selectedSubject: string | null;
}

export function useDashboardData({ selectedSubject }: UseDashboardDataProps) {
  // Filter data based on selected subject
  const filteredQuizResults = selectedSubject 
    ? sampleQuizResults.filter((q: any) => q.subject === selectedSubject)
    : sampleQuizResults;
  
  const filteredPendingQuizzes = selectedSubject
    ? rawPendingQuizzes.filter(q => q.subject === selectedSubject)
    : rawPendingQuizzes;
    
  const filteredPendingVideos = selectedSubject
    ? rawPendingVideos.filter(v => v.subject === selectedSubject)
    : rawPendingVideos;

  // Calculate stats
  const totalQuizzes = filteredQuizResults.length;
  const passedQuizzes = filteredQuizResults.filter(q => q.passed).length;
  const failedQuizzes = totalQuizzes - passedQuizzes;
  
  // Calculate average score from actual data
  const averageScore = totalQuizzes > 0 
    ? Math.round(filteredQuizResults.reduce((sum, quiz) => sum + (quiz.score / quiz.totalQuestions) * 70, 0) / totalQuizzes)
    : 0;

  // Process data for display
  const pendingQuizzes = processPendingQuizzes(filteredPendingQuizzes);
  const pendingVideos = processPendingVideos(filteredPendingVideos);

  return {
    // Stats
    totalQuizzes,
    passedQuizzes,
    failedQuizzes,
    averageScore,
    
    // Processed data
    pendingQuizzes,
    pendingVideos
  };
}
