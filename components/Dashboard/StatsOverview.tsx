import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import tw from '@/lib/tailwind';
import CircularProgressBar from '@/components/CircularProgressBar';
import { getAverageScoreColors } from '@/utils/performanceColors';
import * as Animatable from 'react-native-animatable';
import { router } from 'expo-router';

interface StatsOverviewProps {
  selectedSubject: string | null;
  totalQuizzes: number;
  passedQuizzes: number;
  failedQuizzes: number;
  averageScore: number;
}

export default function StatsOverview({
  selectedSubject,
  totalQuizzes,
  passedQuizzes,
  failedQuizzes,
  averageScore
}: StatsOverviewProps) {
  const averageScoreColors = getAverageScoreColors(averageScore);

  return (
    <>
      {/* Main Stats */}
      <Animatable.View animation="fadeInUp" duration={800} delay={200} style={tw`rounded-md p-6 shadow-lg border-4 border-blue-200 mb-4 overflow-hidden`}>
        <LinearGradient
          colors={['#dbeafe', '#bfdbfe', '#93c5fd']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={tw`absolute inset-0 rounded-2xl`}
        />
        <View style={tw`relative z-10`}>
          <View style={tw`flex-row items-center mb-6`}>
            <View style={tw`w-14 h-14 rounded-full items-center justify-center`}>
            </View>
            <Text style={tw`text-2xl font-bold text-gray-800`}>
              {selectedSubject ? `${selectedSubject} Progress` : 'Overall Progress'}
            </Text>
          </View>

          <View style={tw`items-center`}>
            <Animatable.View animation="zoomIn" duration={500} delay={300}>
              <CircularProgressBar
                percentage={averageScore}
                size={140}
                strokeWidth={12}
                color={averageScoreColors.progressColor}
                backgroundColor={averageScoreColors.trailColor}
                title="Average Score"
                subtitle={selectedSubject ? `${selectedSubject} Only` : "All Subjects Combined"}
              />
            </Animatable.View>
          </View>
        </View>
      </Animatable.View>

      {/* Quiz Stats */}
      <Animatable.View animation="fadeInUp" duration={800} delay={300} style={tw`mb-4`}>
        <View style={tw`rounded-md p-5 shadow-md border-4 border-green-200 overflow-hidden`}>
          <LinearGradient
            colors={['#dcfce7', '#bbf7d0', '#86efac']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={tw`absolute inset-0 rounded-2xl`}
          />
          <View style={tw`relative z-10`}>
            {/* Total Quizzes Header */}
            <View style={tw`items-center mb-4`}>
              <View style={tw`w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2`}>
                <Ionicons name="clipboard" size={24} color="#3b82f6" />
              </View>
              <Text style={tw`text-xl font-bold text-gray-800`}>Total Quizzes: {totalQuizzes}</Text>
            </View>

            {/* Passed and Failed Cards */}
            <View style={tw`flex-row justify-between`}>
              {/* Passed Quizzes Card */}
              <View style={tw`flex-1 rounded-lg p-4 mr-2 border-4 border-blue-300 shadow-md overflow-hidden`}>
                <LinearGradient
                  colors={['#dbeafe', '#bfdbfe', '#93c5fd']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={tw`absolute inset-0 rounded-md`}
                />
                <View style={tw`relative z-10 items-center`}>
                  <View style={tw`w-12 h-12 bg-blue-500 rounded-full items-center justify-center mb-3 shadow-lg`}>
                    <Ionicons name="checkmark-circle" size={24} color="white" />
                  </View>
                  <Text style={tw`text-3xl font-bold text-blue-800`}>{passedQuizzes}</Text>
                  <Text style={tw`text-xs text-blue-700 text-center font-semibold mb-3`}>Quizzes Passed</Text>
                  
                  {/* View Button */}
                  <TouchableOpacity 
                    onPress={() => router.push(`/history?tab=completed-quizzes&filter=passed${selectedSubject ? `&subject=${selectedSubject}` : ''}`)}
                    style={tw`bg-blue-600 rounded-xl py-2 px-4 shadow-md`}
                  >
                    <Text style={tw`text-white text-center font-semibold text-sm`}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Failed Quizzes Card */}
              <View style={tw`flex-1 rounded-lg p-4 ml-2 border-4 border-red-300 shadow-md overflow-hidden`}>
                <LinearGradient
                  colors={['#fef2f2', '#fecaca', '#fca5a5']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={tw`absolute inset-0 rounded-md`}
                />
                <View style={tw`relative z-10 items-center`}>
                  <View style={tw`w-12 h-12 bg-red-500 rounded-full items-center justify-center mb-3 shadow-lg`}>
                    <Ionicons name="close-circle" size={24} color="white" />
                  </View>
                  <Text style={tw`text-3xl font-bold text-red-800`}>{failedQuizzes}</Text>
                  <Text style={tw`text-xs text-red-700 text-center font-semibold mb-3`}>Quizzes Failed</Text>
                  
                  {/* View Button */}
                  <TouchableOpacity 
                    onPress={() => router.push(`/history?tab=completed-quizzes&filter=failed${selectedSubject ? `&subject=${selectedSubject}` : ''}`)}
                    style={tw`bg-red-600 rounded-xl py-2 px-4 shadow-md`}
                  >
                    <Text style={tw`text-white text-center font-semibold text-sm`}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Animatable.View>
    </>
  );
}
