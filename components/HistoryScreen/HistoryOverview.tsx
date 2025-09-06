import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import tw from '@/lib/tailwind';
import * as Animatable from 'react-native-animatable';
import { router } from 'expo-router';
import SubjectFilter from '@/components/SubjectFilter';

interface HistoryOverviewProps {
  selectedSubject: string | null;
  onSubjectChange: (subject: string | null) => void;
  allPendingQuizzes: any[];
  allPendingVideos: any[];
  allCompletedQuizzes: any[];
  allSubjectsPendingQuizzes: any[];
  allSubjectsPendingVideos: any[];
  allSubjectsCompletedQuizzes: any[];
}

export default function HistoryOverview({
  selectedSubject,
  onSubjectChange,
  allPendingQuizzes,
  allPendingVideos,
  allCompletedQuizzes,
  allSubjectsPendingQuizzes,
  allSubjectsPendingVideos,
  allSubjectsCompletedQuizzes
}: HistoryOverviewProps) {
  
  // Calculate simple stats for kids
  const totalPending = selectedSubject 
    ? allPendingQuizzes.length + allPendingVideos.length
    : allSubjectsPendingQuizzes.length + allSubjectsPendingVideos.length;
    
  const totalCompletedQuizzes = selectedSubject
    ? allCompletedQuizzes.length
    : allSubjectsCompletedQuizzes.length;
    
  const totalCompletedVideos = 8; // Mock data - will be replaced with backend
    
  const totalQuizzesTaken = totalCompletedQuizzes + (selectedSubject ? allPendingQuizzes.length : allSubjectsPendingQuizzes.length);
  const totalVideosWatched = totalCompletedVideos + (selectedSubject ? allPendingVideos.length : allSubjectsPendingVideos.length);

  const quickActions = [
    {
      id: 'pending-quizzes',
      title: 'Fun Quizzes',
      subtitle: `${selectedSubject ? allPendingQuizzes.length : allSubjectsPendingQuizzes.length} to play`,
      icon: 'time',
      color: '#f59e0b',
      gradient: ['#fce7f3', '#fbcfe8', '#f9a8d4'] as const
    },
    {
      id: 'pending-videos',
      title: 'Cool Videos',
      subtitle: `${selectedSubject ? allPendingVideos.length : allSubjectsPendingVideos.length} to watch`,
      icon: 'play-circle',
      color: '#3b82f6',
      gradient: ['#cffafe', '#a5f3fc', '#67e8f9'] as const
    },
    {
      id: 'completed-quizzes',
      title: 'Quizzes Done',
      subtitle: `${totalCompletedQuizzes} finished`,
      icon: 'checkmark-circle',
      color: '#22c55e',
      gradient: ['#dcfce7', '#bbf7d0', '#86efac'] as const
    },
    {
      id: 'achievements',
      title: 'My Badges',
      subtitle: 'See my rewards',
      icon: 'trophy',
      color: '#8b5cf6',
      gradient: ['#e0e7ff', '#c7d2fe', '#a5b4fc'] as const
    }
  ];

  const handleQuickAction = (actionId: string) => {
    if (actionId === 'achievements') {
      // Show achievements or stats
      return;
    }
    
    const params = new URLSearchParams();
    params.set('tab', actionId);
    if (selectedSubject) {
      params.set('subject', selectedSubject);
    }
    router.push(`/history?${params.toString()}`);
  };

  return (
    <>
      {/* Welcome Header */}
      <Animatable.View animation="fadeInDown" duration={800}>
        <LinearGradient
          colors={['#667eea', '#764ba2', '#f093fb']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={tw`rounded-3xl p-6 overflow-hidden shadow-2xl`}
        >
          <View style={tw`absolute inset-0 rounded-3xl border-2 border-white/30`} />
          <View style={tw`absolute inset-0 rounded-3xl`}>
            <View style={tw`absolute top-0 right-0 w-20 h-20 rounded-full bg-white/25`} />
            <View style={tw`absolute top-2 right-2 w-16 h-16 rounded-full bg-white/20`} />
          </View>
          
          <View style={tw`items-center relative z-10`}>
            <Animatable.View 
              animation={{
                0: { transform: [{ rotate: '0deg' }] },
                0.2: { transform: [{ rotate: '20deg' }] },
                0.4: { transform: [{ rotate: '0deg' }] },
                0.6: { transform: [{ rotate: '-20deg' }] },
                0.8: { transform: [{ rotate: '0deg' }] },
                1: { transform: [{ rotate: '20deg' }] }
              }}
              iterationCount="infinite" 
              duration={2000}
              style={tw`items-center justify-center mb-3`}
            >
              <Text style={tw`text-4xl`}>📚</Text>
            </Animatable.View>
            <Text style={tw`text-2xl font-bold text-white mb-1`}>
              {selectedSubject ? `${selectedSubject} Learning History` : 'Your Learning History'}
            </Text>
            <Text style={tw`text-md font-medium text-yellow-200 text-center`}>
              Track your amazing learning journey! 🌟
            </Text>
        </View>
      </LinearGradient>
    </Animatable.View>

      {/* Subject Filter - Under the header card */}
      <Animatable.View animation="fadeInUp" duration={800} delay={100}>
        <SubjectFilter
          selectedSubject={selectedSubject}
          onSubjectChange={onSubjectChange}
        />
      </Animatable.View>

      {/* My Learning Stats */}
      <Animatable.View animation="fadeInUp" duration={800} delay={200}>
        <View style={tw`rounded-md p-5 shadow-lg border-4 border-yellow-300 overflow-hidden`}>
          <LinearGradient
            colors={['#fef3c7', '#fed7aa', '#fdba74']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={tw`absolute inset-0 rounded-2xl`}
          />
          <View style={tw`relative z-10`}>
            <View style={tw`items-center mb-4`}>
              <View style={tw`w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full items-center justify-center mb-2`}>
                <LinearGradient
                  colors={['#fbbf24', '#f59e0b']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={tw`w-12 h-12 rounded-full items-center justify-center`}
                >
                  <Ionicons name="school" size={24} color="white" />
                </LinearGradient>
              </View>
              <Text style={tw`text-xl font-bold text-orange-800`}>My Learning Stats</Text>
              <Text style={tw`text-sm text-orange-600 text-center`}>Look how much I've learned! 🌟</Text>
            </View>

            {/* Simple Stats Grid */}
            <View style={tw`flex-row justify-between`}>
              {/* Total Quizzes Played */}
              <View style={tw`flex-1 rounded-md p-4 mr-2 border-2 border-blue-300 shadow-lg overflow-hidden`}>
                <LinearGradient
                  colors={['#dbeafe', '#bfdbfe', '#93c5fd']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={tw`absolute inset-0 rounded-2xl`}
                />
                <View style={tw`relative z-10 items-center`}>
                  <View style={tw`w-12 h-12 bg-blue-500 rounded-full items-center justify-center mb-3 shadow-lg`}>
                    <Ionicons name="clipboard" size={24} color="white" />
                  </View>
                  <Text style={tw`text-3xl font-bold text-blue-800`}>{totalQuizzesTaken}</Text>
                  <Text style={tw`text-xs text-blue-700 text-center font-semibold`}>Quizzes Done</Text>
                </View>
              </View>

              {/* Total Videos Watched */}
              <View style={tw`flex-1 rounded-md p-4 ml-2 border-4 border-green-300 shadow-lg overflow-hidden`}>
                <LinearGradient
                  colors={['#dcfce7', '#bbf7d0', '#86efac']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={tw`absolute inset-0 rounded-2xl`}
                />
                <View style={tw`relative z-10 items-center`}>
                  <View style={tw`w-12 h-12 bg-green-500 rounded-full items-center justify-center mb-3 shadow-lg`}>
                    <Ionicons name="play-circle" size={24} color="white" />
                  </View>
                  <Text style={tw`text-3xl font-bold text-green-800`}>{totalVideosWatched}</Text>
                  <Text style={tw`text-xs text-green-700 text-center font-semibold`}>Videos Seen</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Animatable.View>

      {/* Quick Actions Grid */}
      <Animatable.View animation="fadeInUp" duration={800} delay={300}>
        <View style={tw`rounded-md p-5 shadow-lg border-4 border-yellow-300 overflow-hidden`}>
          <LinearGradient
            colors={['#fef3c7', '#fed7aa', '#fdba74']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={tw`absolute inset-0 rounded-2xl`}
          />
          <View style={tw`relative z-10`}>
            <View style={tw`items-center mb-4`}>
              <View style={tw`w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full items-center justify-center mb-2`}>
                <LinearGradient
                  colors={['#fbbf24', '#f59e0b']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={tw`w-12 h-12 rounded-full items-center justify-center`}
                >
                  <Ionicons name="flash" size={24} color="white" />
                </LinearGradient>
              </View>
              <Text style={tw`text-xl font-bold text-orange-800`}>Let's Explore!</Text>
              <Text style={tw`text-sm text-orange-600 text-center`}>Tap to see more fun stuff! 🚀</Text>
            </View>

          <View style={tw`flex-row flex-wrap justify-between`}>
            {quickActions.map((action, index) => (
              <Animatable.View
                key={action.id}
                animation="fadeInUp"
                duration={600}
                delay={400 + (index * 100)}
                style={tw`w-[48%] mb-3`}
              >
                <TouchableOpacity
                  onPress={() => handleQuickAction(action.id)}
                  style={tw`rounded-2xl p-4 border border-gray-300 shadow-lg overflow-hidden`}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={action.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={tw`absolute inset-0 rounded-2xl`}
                  />
                  <View style={tw`relative z-10`}>
                    <View style={tw`items-center`}>
                      <View style={tw`w-12 h-12 bg-white/90 rounded-full items-center justify-center mb-3 shadow-lg`}>
                        <Ionicons name={action.icon as any} size={22} color={action.color} />
                      </View>
                      <Text style={tw`text-sm font-bold text-gray-800 text-center mb-1`}>
                        {action.title}
                      </Text>
                      <Text style={tw`text-xs text-gray-700 text-center font-medium`}>
                        {action.subtitle}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animatable.View>
            ))}
          </View>
          </View>
        </View>
      </Animatable.View>
    </>
  );
}
