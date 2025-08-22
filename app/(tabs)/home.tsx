import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from '@/lib/tailwind';
import sampleQuizResults from '@/data/sampleQuizResults';
import { router } from 'expo-router';
import CircularProgressBar from '@/components/CircularProgressBar';
import TopTabsNavBar from '@/components/TopTabsNavBar';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import * as Animatable from 'react-native-animatable';
import { getAverageScoreColors, getCompletionColors, getSuccessRateColors } from '@/utils/performanceColors';
import ScreenLayout from '@/components/ScreenLayout';
import { LAYOUT, SPACING } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OverviewIcon } from '@/assets/icons/OverviewIcon';
import GoalsIcon from '@/assets/icons/GoalsIcon';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements'>('overview');
  const [lessonsExpanded, setLessonsExpanded] = useState(false);
  const [videosExpanded, setVideosExpanded] = useState(false);
  const chevronAnimation = useRef(new Animated.Value(0)).current;
  const videosChevronAnimation = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const TOP_NAV_HEIGHT = 70;

  // Animate chevron rotations
  useEffect(() => {
    Animated.timing(chevronAnimation, {
      toValue: lessonsExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [lessonsExpanded]);

  useEffect(() => {
    Animated.timing(videosChevronAnimation, {
      toValue: videosExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [videosExpanded]);

  // Calculate stats
  const totalQuizzes = sampleQuizResults.length;
  const passedQuizzes = sampleQuizResults.filter(q => q.passed).length;
  const failedQuizzes = totalQuizzes - passedQuizzes;

  // Data arrays for mapping
  const quickActions = [
    { icon: 'play-circle', title: 'Resume Last Lesson', subtitle: 'Video 2: Subtraction', color: '#3b82f6', bgColor: 'from-blue-50 to-indigo-50', borderColor: 'border-blue-100' },
    { icon: 'document-text', title: 'Download PDF/Notes', subtitle: 'Study materials & exercises', color: '#22c55e', bgColor: 'from-green-50 to-emerald-50', borderColor: 'border-green-100' },
    { icon: 'help-circle', title: 'Take QA', subtitle: 'Practice questions & answers', color: '#8b5cf6', bgColor: 'from-purple-50 to-violet-50', borderColor: 'border-purple-100' },
    { icon: 'heart', title: 'Mark as Favorite', subtitle: 'Save for later review', color: '#f59e0b', bgColor: 'from-yellow-50 to-amber-50', borderColor: 'border-yellow-100' }
  ];

  const videos = [
    { title: 'Addition Basics', status: 'Completed', color: '#22c55e', bgColor: 'bg-green-200', borderColor: 'border-green-300', icon: 'play-circle' },
    { title: 'Subtraction Methods', status: 'In Progress', color: '#3b82f6', bgColor: 'bg-blue-200', borderColor: 'border-blue-300', icon: 'play-circle' },
    { title: 'Multiplication Techniques', status: 'Locked', color: '#6b7280', bgColor: 'bg-gray-50', borderColor: 'border-gray-200', icon: 'lock-closed', locked: true },
    { title: 'Division Fundamentals', status: 'Locked', color: '#6b7280', bgColor: 'bg-gray-50', borderColor: 'border-gray-200', icon: 'lock-closed', locked: true }
  ];

  const achievements = [
    { id: 'math_1', title: 'Addition Master', description: 'Complete 10 addition problems correctly', icon: 'add-circle', color: '#22c55e', bgColor: '#dcfce7', progress: 100, unlocked: true },
    { id: 'math_2', title: 'Subtraction Pro', description: 'Master subtraction with borrowing', icon: 'remove-circle', color: '#3b82f6', bgColor: '#dbeafe', progress: 75, unlocked: false },
    { id: 'math_3', title: 'Multiplication Wizard', description: 'Learn times tables 1-10', icon: 'close-circle', color: '#8b5cf6', bgColor: '#ede9fe', progress: 0, unlocked: false }
  ];

  const otherSubjects = [
    { name: 'Science', icon: 'flask', color: '#ef4444', bgColor: 'bg-red-100', progress: 50, achievements: '1 of 2' },
    { name: 'English', icon: 'library', color: '#8b5cf6', bgColor: 'bg-purple-100', progress: 50, achievements: '1 of 2' }
  ];

  const renderOverviewTab = () => {
    const testAverageScore = 60;
    const testCompletionPercentage = 40;
    const averageScoreColors = getAverageScoreColors(testAverageScore);
    const completionColors = getCompletionColors(testCompletionPercentage, 100);

    return (
      <View style={tw`gap-2`}>
        {/* Main Stats */}
        <Animatable.View animation="fadeInUp" duration={800} delay={200} style={tw`bg-white rounded-2xl p-6 shadow-lg border border-gray-100`}>
          <View style={tw`flex-row items-center mb-6`}>
            <View style={tw`w-14 h-14 bg-blue-100 rounded-full items-center justify-center mr-4`}>
              <Ionicons name="calculator" size={28} color="#3b82f6" />
            </View>
            <Text style={tw`text-xl font-bold text-gray-800`}>Mathematics</Text>
          </View>

          <View style={tw`flex-row justify-around items-center`}>
            <Animatable.View animation="zoomIn" duration={500} delay={300}>
              <CircularProgressBar
                percentage={testAverageScore}
                size={130}
                strokeWidth={10}
                color={averageScoreColors.progressColor}
                backgroundColor={averageScoreColors.trailColor}
                title="Average Score"
                subtitle="Overall Performance"
              />
            </Animatable.View>

            <Animatable.View animation="zoomIn" duration={500} delay={600}>
              <CircularProgressBar
                percentage={testCompletionPercentage}
                size={130}
                strokeWidth={10}
                color={completionColors.progressColor}
                backgroundColor={completionColors.trailColor}
                title="Completed"
                subtitle={`${totalQuizzes}/10 Quizzes`}
              />
            </Animatable.View>
          </View>
        </Animatable.View>

        {/* Stats Cards */}
        <Animatable.View animation="fadeInUp" duration={800} delay={200}>
        <View style={tw`flex-row justify-between gap-4`}>
          <View style={tw`flex-1 bg-white rounded-2xl p-4 shadow-lg border border-green-100`}>
            <View style={tw`items-center`}>
              <View style={tw`w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2`}>
                <Ionicons name="trophy" size={24} color="#22c55e" />
              </View>
              <Text style={tw`text-2xl font-bold text-green-600`}>{passedQuizzes}</Text>
              <Text style={tw`text-sm text-gray-600 text-center`}>Quizzes Passed</Text>
            </View>
          </View>

                     <View style={tw`flex-1 bg-white rounded-2xl p-4 shadow-lg border border-red-100`}>
             <View style={tw`items-center`}>
               <View style={tw`w-12 h-12 bg-red-100 rounded-full items-center justify-center mb-2`}>
                 <Ionicons name="close-circle" size={24} color="#ef4444" />
               </View>
               <Text style={tw`text-2xl font-bold text-red-600`}>{failedQuizzes}</Text>
               <Text style={tw`text-sm text-gray-600 text-center`}>Quizzes Failed</Text>
             </View>
           </View>
        </View>
        </Animatable.View>

        {/* Lessons Progress */}
        <View style={tw`bg-white rounded-2xl p-6 shadow-lg border border-gray-100`}>
          <TouchableOpacity onPress={() => setLessonsExpanded(!lessonsExpanded)} style={tw`flex-row items-center justify-between mb-4`}>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-lg font-bold text-gray-800`}>Lessons Progress</Text>
              <View style={tw`ml-3 px-2 py-1 bg-blue-100 rounded-full`}>
                <Text style={tw`text-xs font-semibold text-blue-600`}>8/12</Text>
              </View>
            </View>
            <Animated.View style={{ transform: [{ rotate: chevronAnimation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) }] }}>
              <Ionicons name="chevron-down" size={20} color="#6b7280" />
            </Animated.View>
          </TouchableOpacity>

          <View style={tw`h-2 bg-gray-200 rounded-full overflow-hidden mb-2`}>
            <View style={[tw`h-full bg-blue-500 rounded-full`, { width: '66.67%' }]} />
          </View>
          <Text style={tw`text-sm text-gray-600 text-center mb-4`}>8 out of 12 lessons completed successfully</Text>

          <Animatable.View animation={lessonsExpanded ? "slideInDown" : "slideOutUp"} duration={400} style={tw`overflow-hidden`}>
            {lessonsExpanded && (
              <View style={tw`mt-4 pt-4 border-t border-gray-100`}>
                <Text style={tw`text-sm font-semibold text-gray-700 mb-3`}>Quick Actions</Text>
                <View style={tw`gap-3`}>
                  {quickActions.map((action, index) => (
                    <TouchableOpacity key={index} style={tw`flex-row items-center p-3 bg-gradient-to-r ${action.bgColor} rounded-xl border ${action.borderColor}`}>
                      <View style={tw`w-10 h-10 bg-white rounded-full items-center justify-center mr-3`}>
                        <Ionicons name={action.icon as any} size={20} color={action.color} />
                      </View>
                      <View style={tw`flex-1`}>
                        <Text style={tw`text-base font-semibold text-gray-800`}>{action.title}</Text>
                        <Text style={tw`text-sm text-gray-600`}>{action.subtitle}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={16} color="#6b7280" />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </Animatable.View>
        </View>

        {/* Videos List */}
        <View style={tw`bg-white rounded-2xl p-6 shadow-lg border border-gray-100`}>
          <TouchableOpacity onPress={() => setVideosExpanded(!videosExpanded)} style={tw`flex-row items-center justify-between mb-4`}>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-xl font-bold text-gray-800`}>🎬 Videos List</Text>
              <View style={tw`ml-3 px-2 py-1 bg-purple-100 rounded-full`}>
                <Text style={tw`text-xs font-semibold text-purple-600`}>2/4</Text>
              </View>
            </View>
            <Animated.View style={{ transform: [{ rotate: videosChevronAnimation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) }] }}>
              <Ionicons name="chevron-down" size={20} color="#6b7280" />
            </Animated.View>
          </TouchableOpacity>
          
          <View style={tw`h-2 bg-gray-200 rounded-full overflow-hidden mb-2`}>
            <View style={[tw`h-full bg-purple-500 rounded-full`, { width: '50%' }]} />
          </View>
          <Text style={tw`text-sm text-gray-600 text-center mb-4`}>2 out of 4 videos completed successfully</Text>

          <Animatable.View animation={videosExpanded ? "slideInDown" : "slideOutUp"} duration={400} style={tw`overflow-hidden`}>
            {videosExpanded && (
              <View style={tw`mt-4 pt-4 border-t border-yellow-400`}>
                <View style={tw`gap-3`}>
                  {videos.map((video, index) => (
                    <View key={index} style={tw`rounded-xl p-5 border-4 ${video.borderColor} ${video.bgColor} shadow-sm h-20 ${video.locked ? 'opacity-75' : ''}`}>
                      <View style={tw`flex-row items-center justify-between h-full`}>
                        <View style={tw`flex-row items-center flex-1 min-w-0`}>
                          <View style={tw`w-12 h-12 bg-white rounded-full items-center justify-center mr-4 shadow-sm flex-shrink-0`}>
                            <Ionicons name={video.icon as any} size={24} color={video.color} />
                          </View>
                          <View style={tw`flex-1 min-w-0 justify-center`}>
                            <Text style={tw`text-base font-bold text-gray-800 mb-1`} numberOfLines={1}>{video.title}</Text>
                            <View style={tw`flex-row items-center`}>
                                                          <View style={[tw`w-2 h-2 rounded-full mr-2`, { backgroundColor: video.color }]} />
                            <Text style={[tw`text-sm font-semibold`, { color: video.color }]}>{video.status}</Text>
                            </View>
                          </View>
                        </View>
                        {video.locked && (
                          <View style={tw`items-end ml-3 flex-shrink-0 justify-center`}>
                            <Text style={tw`text-lg text-gray-400`}>🔒</Text>
                            <Text style={tw`text-xs text-gray-400 font-medium`}>Complete Previous</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </Animatable.View>
        </View>

        {/* Smart TV Sync */}
        <Animatable.View animation="fadeInUp" duration={800} delay={700} style={tw`bg-white rounded-2xl p-6 shadow-lg border border-gray-100`}>
          <View style={tw`items-center`}>
            <TouchableOpacity onPress={() => router.push('/cast-to-tv')} style={tw`relative`}>
              <View style={tw`rounded-full items-center justify-center shadow-md bg-red-200 p-4`}>
                <Ionicons name="tv" size={40} color="red" />
              </View>
              <View style={tw`absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white items-center justify-center`}>
                <Ionicons name="wifi" size={12} color="white" />
              </View>
            </TouchableOpacity>
            <Text style={tw`text-lg font-bold text-center text-gray-800 mt-3 mb-1`}>Smart TV Sync 📺</Text>
            <Text style={tw`text-gray-600 text-center text-sm mb-4`}>Mirror entire app to your TV</Text>
            <TouchableOpacity onPress={() => router.push('/cast-to-tv')} style={tw`bg-green-50 rounded-xl p-3 border border-green-200 w-full`}>
              <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-row items-center`}>
                  <View style={tw`w-2 h-2 bg-green-500 rounded-full mr-2`} />
                  <Text style={tw`text-green-700 text-sm font-medium`}>Ready to sync</Text>
                </View>
                <View style={tw`bg-green-100 px-2 py-1 rounded-full`}>
                  <Text style={tw`text-green-700 text-xs font-semibold`}>Tap to connect</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    );
  };

  const renderAchievementsTab = () => (
    <View style={tw`gap-6`}>
      {/* Current Subject */}
      <View style={tw`gap-4`}>
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center`}>
            <View style={tw`w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3`}>
              <Ionicons name="calculator" size={20} color="#22c55e" />
            </View>
            <Text style={tw`text-xl font-bold text-gray-800`}>Mathematics Goals</Text>
          </View>
          <View style={tw`px-3 py-1 bg-green-100 rounded-full`}>
            <Text style={tw`text-sm font-semibold text-green-700`}>Current</Text>
          </View>
        </View>
        
        {achievements.map((achievement, index) => (
          <Animatable.View key={achievement.id} animation="fadeInUp" delay={index * 100} style={tw`bg-white rounded-xl p-4 shadow-sm border border-gray-100`}>
            <View style={tw`flex-row items-center`}>
              <View style={tw.style('w-14 h-14 rounded-full items-center justify-center mr-4', { backgroundColor: achievement.unlocked ? achievement.bgColor : '#f3f4f6' })}>
                <Ionicons name={achievement.icon as any} size={28} color={achievement.color} />
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-base font-bold text-gray-800 mb-1`}>{achievement.title}</Text>
                <Text style={tw`text-sm text-gray-600 mb-2`}>{achievement.description}</Text>
                {!achievement.unlocked && (
                  <View style={tw`mt-2`}>
                    <View style={tw`flex-row justify-between mb-1`}>
                      <Text style={tw`text-xs text-gray-500`}>Progress</Text>
                      <Text style={tw`text-xs text-gray-500`}>{achievement.progress}%</Text>
                    </View>
                    <View style={tw`h-1.5 bg-gray-200 rounded-full overflow-hidden`}>
                      <View style={tw.style('h-full bg-green-500 rounded-full', { width: `${achievement.progress}%` })} />
                    </View>
                  </View>
                )}
              </View>
              {achievement.unlocked && (
                <View style={tw`w-8 h-8 bg-yellow-100 rounded-full items-center justify-center`}>
                  <Ionicons name="checkmark-circle" size={16} color="#fbbf24" />
                </View>
              )}
            </View>
          </Animatable.View>
        ))}
      </View>

      {/* Other Subjects */}
      <View style={tw`gap-4`}>
        <Text style={tw`text-lg font-bold text-gray-800`}>Other Subjects</Text>
        {otherSubjects.map((subject, index) => (
          <TouchableOpacity key={index} style={tw`bg-white rounded-xl p-4 shadow-sm border border-gray-100`}>
            <View style={tw`flex-row items-center justify-between`}>
              <View style={tw`flex-row items-center flex-1`}>
                <View style={tw`w-12 h-12 ${subject.bgColor} rounded-full items-center justify-center mr-3`}>
                  <Ionicons name={subject.icon as any} size={20} color={subject.color} />
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-base font-bold text-gray-800`}>{subject.name}</Text>
                  <Text style={tw`text-sm text-gray-600`}>{subject.achievements} achievements unlocked</Text>
                </View>
              </View>
              <View style={tw`items-end`}>
                <Text style={[tw`text-lg font-bold`, { color: subject.color }]}>{subject.progress}%</Text>
                <Text style={tw`text-xs text-gray-500`}>Complete</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <BackgroundWrapper>
      <View style={[tw`absolute left-0 right-0`, { top: insets.top + 8, zIndex: 20 }]} pointerEvents="box-none">
        <View style={tw`px-4`}>
          <TopTabsNavBar
            tabs={[
              { key: 'overview', label: 'Dashboard', icon: ({ color, size }) => (<OverviewIcon size={size} color={color} />) },
              { key: 'achievements', label: 'Goals', icon: ({ color, size }) => (<GoalsIcon size={size} color={color} />) },
            ]}
            activeKey={activeTab}
            onChange={(k) => setActiveTab(k as any)}
            backgroundColor={tw.color('lightGreen')}
            borderColor={tw.color('primary-light')}
            borderWidth={2}
            radius={20}
            activeBackgroundColor={tw.color('primary-light')}
            inactiveBackgroundColor="transparent"
            activeColor={tw.color('text-primary')}
            inactiveColor={tw.color('text-muted')}
            labelColorActive={tw.color('white')}
          />
        </View>
      </View>

      <ScreenLayout
        scrollable
        hideContentUnderNav={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: TOP_NAV_HEIGHT + 24,
          paddingBottom: LAYOUT.tabBarHeight + SPACING.xl,
          rowGap: 16,
        }}
      >
        <View style={tw`gap-2`}>
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'achievements' && renderAchievementsTab()}
        </View>
      </ScreenLayout>
    </BackgroundWrapper>
  );
}