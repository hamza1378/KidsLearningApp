import React, { useState } from 'react';
import { View } from 'react-native';
import tw from '@/lib/tailwind';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import SubjectFilter from '@/components/SubjectFilter';
import DashboardWelcomeHeader from '@/components/Dashboard/DashboardWelcomeHeader';
import StatsOverview from '@/components/Dashboard/StatsOverview';
import QuickActions from '@/components/Dashboard/QuickActions';
import SmartTVSync from '@/components/Dashboard/SmartTVSync';
import { useDashboardData } from '@/hooks/useDashboardData';
import * as Animatable from 'react-native-animatable';
import ScreenLayout from '@/components/ScreenLayout';
import { LAYOUT, SPACING } from '@/constants/theme';

export default function HomeScreen() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // Use custom hook for data management
  const {
    totalQuizzes,
    passedQuizzes,
    failedQuizzes,
    averageScore,
    pendingQuizzes,
    pendingVideos
  } = useDashboardData({ selectedSubject });

  // Subject filter handler
  const handleSubjectChange = (subject: string | null) => {
    setSelectedSubject(subject);
  };

  
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
        <View style={tw`mb-4`}>
          <DashboardWelcomeHeader userName="Alex" />
          
          {/* Subject Filter */}
          <Animatable.View animation="fadeInUp" duration={800} delay={100} style={tw`mb-4`}>
            <SubjectFilter
              selectedSubject={selectedSubject}
              onSubjectChange={handleSubjectChange}
            />
          </Animatable.View>

          <StatsOverview
            selectedSubject={selectedSubject}
            totalQuizzes={totalQuizzes}
            passedQuizzes={passedQuizzes}
            failedQuizzes={failedQuizzes}
            averageScore={averageScore}
          />

          <QuickActions
            selectedSubject={selectedSubject}
            pendingQuizzes={pendingQuizzes}
            pendingVideos={pendingVideos}
          />

          <SmartTVSync />
        </View>
      </ScreenLayout>
    </BackgroundWrapper>
  );
}
