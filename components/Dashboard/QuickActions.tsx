import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import tw from '@/lib/tailwind';
import * as Animatable from 'react-native-animatable';
import { router } from 'expo-router';

interface QuickActionsProps {
  selectedSubject: string | null;
  pendingQuizzes: any[];
  pendingVideos: any[];
}

export default function QuickActions({ selectedSubject, pendingQuizzes, pendingVideos }: QuickActionsProps) {
  return (
    <>
      {/* Pending Quizzes */}
      <Animatable.View animation="fadeInUp" duration={800} delay={400} style={tw`rounded-2xl p-4 shadow-lg border border-pink-200 mb-4 overflow-hidden`}>
        <LinearGradient
          colors={['#fce7f3', '#fbcfe8', '#f9a8d4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={tw`absolute inset-0 rounded-2xl`}
        />
        <View style={tw`relative z-10`}>
          {/* Header */}
          <View style={tw`flex-row items-center mb-4`}>
            <View style={tw`w-8 h-8 bg-blue-200 rounded-full items-center justify-center mr-2`}>
              <Ionicons name="time" size={22} color="#0073ff" />
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-lg font-bold text-gray-800`}>Pending Quizzes</Text>
              <Text style={tw`text-xs text-gray-500`}>Complete your watched videos</Text>
            </View>
            <TouchableOpacity 
              style={tw`p-2 bg-orange rounded-full border-2 border-red-400`}
              onPress={() => router.push(`/history?tab=pending-quizzes${selectedSubject ? `&subject=${selectedSubject}` : ''}`)}
            >
              <Text style={tw`text-xs font-semibold text-white`}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Quiz Cards */}
          <View style={tw`gap-3`}>
            {pendingQuizzes.map((quiz) => (
              <TouchableOpacity 
                key={quiz.id} 
                style={tw`${quiz.bgColor} rounded-md border ${quiz.borderColor} p-3 shadow-sm`}
                onPress={() => router.push('/quiz/quiz-screen')}
              >
                <View style={tw`flex-row items-center`}>
                  <View style={tw`w-10 h-10 bg-white rounded-full items-center justify-center mr-3 shadow-sm`}>
                    <Ionicons name={quiz.icon as any} size={20} color={quiz.color} />
                  </View>
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-sm font-bold text-gray-800 mb-1`} numberOfLines={1}>{quiz.title}</Text>
                    <Text style={tw`text-xs text-gray-500`}>{quiz.watchedAt}</Text>
                  </View>
                  <View style={tw`ml-2 bg-white rounded-full p-2 shadow-sm`}>
                    <Ionicons name="play" size={14} color={quiz.color} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animatable.View>

      {/* Pending Videos */}
      <Animatable.View animation="fadeInUp" duration={800} delay={500} style={tw`rounded-2xl p-4 shadow-lg border border-cyan-200 mb-4 overflow-hidden`}>
        <LinearGradient
          colors={['#cffafe', '#a5f3fc', '#67e8f9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={tw`absolute inset-0 rounded-2xl`}
        />
        <View style={tw`relative z-10`}>
          {/* Header */}
          <View style={tw`flex-row items-center mb-4`}>
            <View style={tw`w-8 h-8 bg-blue-200 rounded-full items-center justify-center mr-2`}>
              <Ionicons name="play-circle" size={22} color="#3b82f6" />
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-lg font-bold text-gray-800`}>Pending Videos</Text>
              <Text style={tw`text-xs text-gray-500`}>Complete your scanned videos</Text>
            </View>
            <TouchableOpacity 
              style={tw`p-2 bg-blue-500 rounded-full border-2 border-blue-600`}
              onPress={() => router.push(`/history?tab=pending-videos${selectedSubject ? `&subject=${selectedSubject}` : ''}`)}
            >
              <Text style={tw`text-xs font-semibold text-white`}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Video Cards */}
          <View style={tw`gap-3`}>
            {pendingVideos.map((video) => (
              <TouchableOpacity 
                key={video.id} 
                style={tw`${video.bgColor} rounded-md border ${video.borderColor} p-3 shadow-sm`}
                onPress={() => router.push('/video-player')}
              >
                <View style={tw`flex-row items-center`}>
                  <View style={tw`w-10 h-10 bg-white rounded-full items-center justify-center mr-3 shadow-sm`}>
                    <Ionicons name={video.icon as any} size={20} color={video.color} />
                  </View>
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-sm font-bold text-gray-800 mb-1`} numberOfLines={1}>{video.title}</Text>
                    <View style={tw`flex-row items-center justify-between`}>
                      <Text style={tw`text-xs text-gray-500`}>{video.scannedAt}</Text>
                      <Text style={tw`text-xs text-gray-500`}>{video.duration}</Text>
                    </View>
                    {video.watchedPercentage && video.watchedPercentage > 0 && (
                      <View style={tw`mt-1`}>
                        <View style={tw`h-1 bg-gray-200 rounded-full overflow-hidden`}>
                          <View style={[tw`h-full rounded-full`, { 
                            width: `${video.watchedPercentage}%`, 
                            backgroundColor: video.color 
                          }]} />
                        </View>
                        <Text style={tw`text-xs text-gray-400 mt-1`}>{video.watchedPercentage}% watched</Text>
                      </View>
                    )}
                  </View>
                  <View style={tw`ml-2 bg-white rounded-full p-2 shadow-sm`}>
                    <Ionicons name="play" size={14} color={video.color} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animatable.View>
    </>
  );
}
