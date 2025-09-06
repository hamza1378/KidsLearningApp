import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from '@/lib/tailwind';
import * as Animatable from 'react-native-animatable';

interface StatsCardProps {
  tab?: string;
  filter?: string;
  selectedSubject?: string | null;
  allPendingQuizzes: any[];
  allPendingVideos: any[];
  allCompletedQuizzes: any[];
  allSubjectsPendingQuizzes: any[];
  allSubjectsPendingVideos: any[];
  allSubjectsCompletedQuizzes: any[];
}

export default function StatsCard({
  tab,
  filter,
  selectedSubject,
  allPendingQuizzes,
  allPendingVideos,
  allCompletedQuizzes,
  allSubjectsPendingQuizzes,
  allSubjectsPendingVideos,
  allSubjectsCompletedQuizzes
}: StatsCardProps) {
  const getSectionStats = () => {
    if (tab === 'pending-quizzes') {
      return {
        title: selectedSubject ? `${selectedSubject} Pending Quizzes Stats` : 'Pending Quizzes Stats',
        icon: 'time',
        iconColor: '#f59e0b',
        leftCard: {
          count: selectedSubject ? allPendingQuizzes.length : allSubjectsPendingQuizzes.length,
          label: selectedSubject ? `${selectedSubject} Pending` : 'Total Pending',
          color: '#f59e0b',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          iconBg: 'bg-orange-100'
        },
        rightCard: {
          count: selectedSubject ? allPendingQuizzes.length : allSubjectsPendingQuizzes.length,
          label: selectedSubject ? 'Filtered Results' : 'All Subjects',
          color: '#3b82f6',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          iconBg: 'bg-blue-100'
        }
      };
    }
    
    if (tab === 'pending-videos') {
      return {
        title: selectedSubject ? `${selectedSubject} Pending Videos Stats` : 'Pending Videos Stats',
        icon: 'play-circle',
        iconColor: '#3b82f6',
        leftCard: {
          count: selectedSubject ? allPendingVideos.length : allSubjectsPendingVideos.length,
          label: selectedSubject ? `${selectedSubject} Pending` : 'Total Pending',
          color: '#3b82f6',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          iconBg: 'bg-blue-100'
        },
        rightCard: {
          count: selectedSubject ? allPendingVideos.length : allSubjectsPendingVideos.length,
          label: selectedSubject ? 'Filtered Results' : 'All Subjects',
          color: '#8b5cf6',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200',
          iconBg: 'bg-purple-100'
        }
      };
    }
    
    if (tab === 'completed-quizzes') {
      if (filter === 'passed') {
        const allSubjectsPassedQuizzes = allSubjectsCompletedQuizzes.filter((q: any) => q.passed);
        return {
          title: selectedSubject ? `${selectedSubject} Passed Quizzes Stats` : 'Passed Quizzes Stats',
          icon: 'trophy',
          iconColor: '#22c55e',
          leftCard: {
            count: selectedSubject ? allCompletedQuizzes.length : allSubjectsPassedQuizzes.length,
            label: selectedSubject ? `${selectedSubject} Passed` : 'Total Passed',
            color: '#22c55e',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            iconBg: 'bg-green-100'
          },
          rightCard: {
            count: selectedSubject ? allCompletedQuizzes.length : allSubjectsPassedQuizzes.length,
            label: selectedSubject ? 'Filtered Results' : 'All Subjects',
            color: '#10b981',
            bgColor: 'bg-emerald-50',
            borderColor: 'border-emerald-200',
            iconBg: 'bg-emerald-100'
          }
        };
      } else if (filter === 'failed') {
        const allSubjectsFailedQuizzes = allSubjectsCompletedQuizzes.filter((q: any) => !q.passed);
        return {
          title: selectedSubject ? `${selectedSubject} Failed Quizzes Stats` : 'Failed Quizzes Stats',
          icon: 'close-circle',
          iconColor: '#ef4444',
          leftCard: {
            count: selectedSubject ? allCompletedQuizzes.length : allSubjectsFailedQuizzes.length,
            label: selectedSubject ? `${selectedSubject} Failed` : 'Total Failed',
            color: '#ef4444',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            iconBg: 'bg-red-100'
          },
          rightCard: {
            count: selectedSubject ? allCompletedQuizzes.length : allSubjectsFailedQuizzes.length,
            label: selectedSubject ? 'Filtered Results' : 'All Subjects',
            color: '#dc2626',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            iconBg: 'bg-red-100'
          }
        };
      } else {
        return {
          title: selectedSubject ? `${selectedSubject} Completed Quizzes Stats` : 'Completed Quizzes Stats',
          icon: 'checkmark-circle',
          iconColor: '#10b981',
          leftCard: {
            count: selectedSubject ? allCompletedQuizzes.length : allSubjectsCompletedQuizzes.length,
            label: selectedSubject ? `${selectedSubject} Completed` : 'Total Completed',
            color: '#10b981',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            iconBg: 'bg-green-100'
          },
          rightCard: {
            count: Math.round((allCompletedQuizzes.filter(q => q.passed).length / allCompletedQuizzes.length) * 100) || 0,
            label: 'Pass Rate',
            color: '#22c55e',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            iconBg: 'bg-green-100'
          }
        };
      }
    }
    
    // Default: show overall stats
    const totalPending = allSubjectsPendingQuizzes.length + allSubjectsPendingVideos.length;
    const totalCompleted = allSubjectsCompletedQuizzes.length + 8; // +8 for completed videos
    
    return {
      title: 'Overall Progress',
      icon: 'stats-chart',
      iconColor: '#3b82f6',
      leftCard: {
        count: totalPending,
        label: 'Pending Items',
        color: '#f59e0b',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        iconBg: 'bg-orange-100'
      },
      rightCard: {
        count: totalCompleted,
        label: 'Completed Items',
        color: '#10b981',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        iconBg: 'bg-green-100'
      }
    };
  };

  const stats = getSectionStats();

  return (
    <Animatable.View animation="fadeInUp" duration={800} delay={100}>
      <View style={tw`bg-white rounded-2xl p-5 shadow-lg border border-gray-100`}>
        <View style={tw`items-center mb-4`}>
          <View style={[tw`w-12 h-12 rounded-full items-center justify-center mb-2`, { backgroundColor: stats.iconColor + '20' }]}>
            <Ionicons name={stats.icon as any} size={24} color={stats.iconColor} />
          </View>
          <Text style={tw`text-xl font-bold text-gray-800`}>{stats.title}</Text>
        </View>

        <View style={tw`flex-row justify-between`}>
          {/* Left Card */}
          <View style={tw`flex-1 ${stats.leftCard.bgColor} rounded-2xl p-4 mr-2 border ${stats.leftCard.borderColor}`}>
            <View style={tw`items-center mb-2`}>
              <View style={tw`w-10 h-10 ${stats.leftCard.iconBg} rounded-full items-center justify-center mb-2`}>
                <Ionicons name="analytics" size={20} color={stats.leftCard.color} />
              </View>
              <Text style={[tw`text-2xl font-bold`, { color: stats.leftCard.color }]}>{stats.leftCard.count}</Text>
              <Text style={tw`text-sm text-gray-600 text-center`}>{stats.leftCard.label}</Text>
            </View>
          </View>

          {/* Right Card */}
          <View style={tw`flex-1 ${stats.rightCard.bgColor} rounded-2xl p-4 ml-2 border ${stats.rightCard.borderColor}`}>
            <View style={tw`items-center mb-2`}>
              <View style={tw`w-10 h-10 ${stats.rightCard.iconBg} rounded-full items-center justify-center mb-2`}>
                <Ionicons name="trending-up" size={20} color={stats.rightCard.color} />
              </View>
              <Text style={[tw`text-2xl font-bold`, { color: stats.rightCard.color }]}>{stats.rightCard.count}{stats.rightCard.label.includes('Rate') ? '%' : ''}</Text>
              <Text style={tw`text-sm text-gray-600 text-center`}>{stats.rightCard.label}</Text>
            </View>
          </View>
        </View>
      </View>
    </Animatable.View>
  );
}
