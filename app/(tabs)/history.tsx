import React, { useRef, useEffect, useState } from 'react';
import { View, Text, SectionList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import tw from '@/lib/tailwind';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import SubjectFilter from '@/components/SubjectFilter';
import WelcomeHeader from '@/components/HistoryScreen/WelcomeHeader';
import StatsCard from '@/components/HistoryScreen/StatsCard';
import HistorySectionList from '@/components/HistoryScreen/HistorySectionList';
import HistoryOverview from '@/components/HistoryScreen/HistoryOverview';
import { useHistoryData } from '@/hooks/useHistoryData';
import { getSectionsToShow, createLoadMoreFunction } from '@/utils/historyUtils';
import * as Animatable from 'react-native-animatable';
import ScreenLayout from '@/components/ScreenLayout';
import { LAYOUT, SPACING } from '@/constants/theme';

export default function HistoryScreen() {
  const listRef = useRef<SectionList>(null);
  const { tab, subject, filter } = useLocalSearchParams<{ tab?: string; subject?: string; filter?: string }>();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(subject || null);
  
  // Update selectedSubject when URL parameter changes
  useEffect(() => {
    if (subject) {
      setSelectedSubject(subject);
    }
  }, [subject]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const ITEMS_PER_PAGE = 20;

  // Use custom hook for data management
  const {
    pendingQuizzes,
    pendingVideos,
    completedQuizzes,
    allPendingQuizzes,
    allPendingVideos,
    allCompletedQuizzes,
    allSubjectsPendingQuizzes,
    allSubjectsPendingVideos,
    allSubjectsCompletedQuizzes
  } = useHistoryData({
    selectedSubject,
    filter,
    currentPage,
    ITEMS_PER_PAGE
  });

  // Create load more function
  const loadMoreData = createLoadMoreFunction(
    setCurrentPage,
    setIsLoadingMore,
    setHasMoreData,
    currentPage,
    tab,
    allPendingQuizzes,
    allPendingVideos,
    ITEMS_PER_PAGE
  );

  // Get sections to display
  const completedVideos = 8; // Mock data
  const sections = getSectionsToShow(
    tab,
    filter,
    pendingQuizzes,
    pendingVideos,
    completedQuizzes,
    allCompletedQuizzes.length,
    completedVideos
  );

  // Auto-scroll to requested section
  useEffect(() => {
    if (!tab) return;
    const idx = sections.findIndex((s) => s.id === tab);
    if (idx >= 0) {
      setTimeout(() => {
        listRef.current?.scrollToLocation({
          sectionIndex: idx,
          itemIndex: 0,
          animated: true,
        });
      }, 300);
    }
  }, [tab]);

  return (
    <BackgroundWrapper>
      <ScreenLayout
        scrollable
        hideContentUnderNav={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: LAYOUT.tabBarHeight + SPACING.xl,
          rowGap: 16,
        }}
      >
        {/* Show overview by default, focused view when tab is specified */}
        {!tab ? (
          <>
            <HistoryOverview
              selectedSubject={selectedSubject}
              onSubjectChange={(newSubject) => {
                setSelectedSubject(newSubject);
                // Update URL to reflect the new subject filter
                const params = new URLSearchParams();
                if (newSubject) params.set('subject', newSubject);
                router.replace(`/history?${params.toString()}`);
              }}
              allPendingQuizzes={allPendingQuizzes}
              allPendingVideos={allPendingVideos}
              allCompletedQuizzes={allCompletedQuizzes}
              allSubjectsPendingQuizzes={allSubjectsPendingQuizzes}
              allSubjectsPendingVideos={allSubjectsPendingVideos}
              allSubjectsCompletedQuizzes={allSubjectsCompletedQuizzes}
            />
          </>
        ) : (
          <>
            <WelcomeHeader 
              tab={tab} 
              filter={filter} 
              selectedSubject={selectedSubject}
            />
            
            <Animatable.View animation="fadeInUp" duration={800} delay={200}>
              <SubjectFilter
                selectedSubject={selectedSubject}
                onSubjectChange={(newSubject) => {
                  setSelectedSubject(newSubject);
                  // Update URL to reflect the new subject filter
                  const params = new URLSearchParams();
                  if (tab) params.set('tab', tab);
                  if (filter) params.set('filter', filter);
                  if (newSubject) params.set('subject', newSubject);
                  router.replace(`/history?${params.toString()}`);
                }}
              />
            </Animatable.View>

            <StatsCard
              tab={tab}
              filter={filter}
              selectedSubject={selectedSubject}
              allPendingQuizzes={allPendingQuizzes}
              allPendingVideos={allPendingVideos}
              allCompletedQuizzes={allCompletedQuizzes}
              allSubjectsPendingQuizzes={allSubjectsPendingQuizzes}
              allSubjectsPendingVideos={allSubjectsPendingVideos}
              allSubjectsCompletedQuizzes={allSubjectsCompletedQuizzes}
            />
            
            <HistorySectionList
              sections={sections}
              tab={tab}
              onLoadMore={loadMoreData}
              isLoadingMore={isLoadingMore}
              listRef={listRef}
            />
          </>
        )}
      </ScreenLayout>
    </BackgroundWrapper>
  );
}
