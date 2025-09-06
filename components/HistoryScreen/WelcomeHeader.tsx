import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import tw from '@/lib/tailwind';
import * as Animatable from 'react-native-animatable';
import { router } from 'expo-router';

interface WelcomeHeaderProps {
  tab?: string;
  filter?: string;
  selectedSubject?: string | null;
}

export default function WelcomeHeader({ tab, filter, selectedSubject }: WelcomeHeaderProps) {
  const getFocusedSectionInfo = () => {
    if (tab === 'pending-quizzes') {
      return {
        emoji: '⏰',
        title: 'Pending Quizzes',
        subtitle: `Complete your ${selectedSubject ? selectedSubject.toLowerCase() : 'pending'} quizzes! 🎯`
      };
    }
    if (tab === 'pending-videos') {
      return {
        emoji: '📺',
        title: 'Pending Videos',
        subtitle: `Watch your ${selectedSubject ? selectedSubject.toLowerCase() : 'pending'} videos! 🎬`
      };
    }
    if (tab === 'completed-quizzes') {
      if (filter === 'passed') {
        return {
          emoji: '🏆',
          title: 'Passed Quizzes',
          subtitle: `Amazing work on your ${selectedSubject ? selectedSubject.toLowerCase() : 'passed'} quizzes! 🎉`
        };
      } else if (filter === 'failed') {
        return {
          emoji: '💪',
          title: 'Failed Quizzes',
          subtitle: `Keep practicing your ${selectedSubject ? selectedSubject.toLowerCase() : 'failed'} quizzes! 🎯`
        };
      }
      return {
        emoji: '🏆',
        title: 'Completed Quizzes',
        subtitle: `Great job on your ${selectedSubject ? selectedSubject.toLowerCase() : 'completed'} quizzes! 🎉`
      };
    }
    if (tab === 'completed-videos') {
      return {
        emoji: '✅',
        title: 'Completed Videos',
        subtitle: `Amazing work on your ${selectedSubject ? selectedSubject.toLowerCase() : 'completed'} videos! 🌟`
      };
    }
    return {
      emoji: '📚',
      title: 'Learning History',
      subtitle: 'Track your amazing learning journey! 🌟'
    };
  };

  const sectionInfo = getFocusedSectionInfo();

  return (
    <Animatable.View animation="fadeInDown" duration={800}>
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={tw`rounded-3xl p-6 overflow-hidden shadow-2xl`}
      >
        {/* Elegant Border with Shine */}
        <View style={tw`absolute inset-0 rounded-3xl border-2 border-white/30`} />
        
        {/* Shiny Overlay Effects */}
        <View style={tw`absolute inset-0 rounded-3xl`}>
          <View style={tw`absolute top-0 right-0 w-20 h-20 rounded-full bg-white/25`} />
          <View style={tw`absolute top-2 right-2 w-16 h-16 rounded-full bg-white/20`} />
        </View>
        
        {/* Content */}
        <View style={tw`relative z-10`}>
          {/* Back Button - Only show when in focused view */}
          {tab && (
            <View style={tw`absolute top-0 left-0 z-20`}>
              <TouchableOpacity
                onPress={() => router.push('/history')}
                style={tw`bg-white/20 rounded-full p-3 backdrop-blur-sm`}
                activeOpacity={0.8}
              >
                <Ionicons name="arrow-back" size={20} color="white" />
              </TouchableOpacity>
            </View>
          )}
          
          <View style={tw`items-center`}>
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
              <Text style={tw`text-4xl`}>{sectionInfo.emoji}</Text>
            </Animatable.View>
            <Text style={tw`text-2xl font-bold text-white mb-1`}>{sectionInfo.title}</Text>
            <Text style={tw`text-md font-medium text-yellow-200 text-center`}>
              {sectionInfo.subtitle}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Animatable.View>
  );
}
