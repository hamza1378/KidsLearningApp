import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import tw from 'twrnc';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { playClickSound } from '@/hooks/buttonPopSound';
import { SoundManager } from '@/hooks/SoundManager';
import { VOICE_STYLES } from '@/constants/voicePresets';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

const { width, height } = Dimensions.get('window');

export default function QuizResultScreen() {
  const { score, totalQuestions, passingScore, videoTitle, qrData } = useLocalSearchParams<{
    score: string;
    totalQuestions: string;
    passingScore: string;
    videoTitle?: string;
    qrData?: string;
  }>();

  const [showConfetti, setShowConfetti] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const scoreValue = parseInt(score || '0');
  const totalValue = parseInt(totalQuestions || '5');
  const passingValue = parseInt(passingScore || '3');
  const percentage = Math.round((scoreValue / totalValue) * 100);
  const isPassed = scoreValue >= passingValue;

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const scoreAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Voice feedback
    if (isPassed) {
      SoundManager.speak({
        text: `Congratulations! You passed with ${scoreValue} out of ${totalValue} correct answers!`,
        style: VOICE_STYLES.funKid,
      });
    } else {
      SoundManager.speak({
        text: `Good try! You got ${scoreValue} out of ${totalValue} correct. You can try again!`,
        style: VOICE_STYLES.funKid,
      });
    }

    // Animate score
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scoreAnim, {
        toValue: scoreValue,
        duration: 1500,
        useNativeDriver: false,
      }),
    ]).start();

    // Show confetti for passed quiz
    if (isPassed) {
      setTimeout(() => {
        setShowConfetti(true);
      }, 1000);
    }

    // Show details after animation
    setTimeout(() => {
      setShowDetails(true);
    }, 2000);
  }, []);

  const handleRetryQuiz = async () => {
    await playClickSound();
    router.push({
      pathname: '/quiz/quiz-screen',
      params: { videoTitle, qrData }
    });
  };

  const handleContinueToDashboard = async () => {
    await playClickSound();
    router.push('/(tabs)/home');
  };

  const handleViewStats = async () => {
    await playClickSound();
    router.push('/(tabs)/stats');
  };

  const getScoreColor = () => {
    if (percentage >= 80) return '#22c55e'; // Green
    if (percentage >= 60) return '#fbbf24'; // Yellow
    return '#ef4444'; // Red
  };

  const getScoreMessage = () => {
    if (percentage >= 90) return 'Excellent! 🌟';
    if (percentage >= 80) return 'Great Job! 🎉';
    if (percentage >= 70) return 'Well Done! 👍';
    if (percentage >= 60) return 'Good Work! 👏';
    if (percentage >= 50) return 'Keep Trying! 💪';
    return 'Don\'t Give Up! 💪';
  };

  const getScoreEmoji = () => {
    if (percentage >= 80) return '🏆';
    if (percentage >= 60) return '🎯';
    return '📚';
  };

  return (
    <BackgroundWrapper>
      <SafeAreaView style={tw`flex-1`}>
        {/* Confetti for passed quiz */}
        {showConfetti && (
          <ConfettiCannon
            count={200}
            origin={{ x: width / 2, y: height }}
            colors={['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']}
            autoStart={true}
            fadeOut={true}
          />
        )}

        {/* Header */}
        <View style={tw`flex-row items-center justify-between p-4`}>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/home')}
            style={tw`bg-white bg-opacity-20 p-3 rounded-full`}
          >
            <Ionicons name="home" size={24} color="#101519" />
          </TouchableOpacity>
          <Text style={tw`text-xl font-bold text-yellow-600`}>
            Quiz Results! 🎯
          </Text>
          <View style={tw`w-12`} />
        </View>

        {/* Main Result Card */}
        <View style={tw`flex-1 px-4 justify-center`}>
          <Animatable.View
            animation="zoomIn"
            duration={800}
            style={tw`bg-white rounded-3xl p-6 shadow-lg border-2 border-yellow-200`}
          >
            {/* Result Status */}
            <View style={tw`items-center mb-6`}>
              <Animated.View
                style={[
                  tw`w-24 h-24 rounded-full items-center justify-center mb-4`,
                  {
                    backgroundColor: isPassed ? '#dcfce7' : '#fef2f2',
                    borderWidth: 4,
                    borderColor: isPassed ? '#22c55e' : '#ef4444',
                    transform: [{ scale: scaleAnim }],
                  },
                ]}
              >
                <Text style={tw`text-4xl`}>
                  {isPassed ? '🎉' : '📚'}
                </Text>
              </Animated.View>
              
              <Text style={[
                tw`text-2xl font-bold mb-2`,
                { color: isPassed ? '#22c55e' : '#ef4444' }
              ]}>
                {isPassed ? 'PASSED!' : 'TRY AGAIN'}
              </Text>
              
              <Text style={tw`text-lg text-gray-600 text-center`}>
                {getScoreMessage()}
              </Text>
            </View>

            {/* Score Display */}
            <View style={tw`items-center mb-6`}>
              <View style={tw`flex-row items-center mb-2`}>
                <Text style={tw.style('text-6xl font-bold', { color: getScoreColor() })}>
                  {scoreValue}
                </Text>
                <Text style={tw`text-2xl text-gray-500 ml-2`}>
                  / {totalValue}
                </Text>
              </View>
              
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-lg font-bold text-gray-700`}>
                  {percentage}%
                </Text>
                <Text style={tw`text-2xl ml-2`}>
                  {getScoreEmoji()}
                </Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={tw`mb-6`}>
              <View style={tw`h-4 bg-gray-200 rounded-full overflow-hidden`}>
                <Animated.View
                  style={[
                    tw`h-full rounded-full`,
                    {
                      width: `${percentage}%`,
                      backgroundColor: getScoreColor(),
                    },
                  ]}
                />
              </View>
              <View style={tw`flex-row justify-between mt-2`}>
                <Text style={tw`text-sm text-gray-500`}>0%</Text>
                <Text style={tw`text-sm text-gray-500`}>100%</Text>
              </View>
            </View>

            {/* Video Info */}
            {videoTitle && (
              <View style={tw`bg-blue-50 rounded-2xl p-4 mb-6`}>
                <View style={tw`flex-row items-center`}>
                  <Ionicons name="play-circle" size={24} color="#3b82f6" />
                  <Text style={tw`ml-2 font-bold text-blue-700`}>
                    Video: {videoTitle}
                  </Text>
                </View>
              </View>
            )}

            {/* Action Buttons */}
            <View style={tw`space-y-3`}>
              {!isPassed && (
                <TouchableOpacity
                  onPress={handleRetryQuiz}
                  style={tw`bg-gradient-to-r from-blue-500 to-purple-600 py-4 rounded-2xl items-center`}
                >
                  <View style={tw`flex-row items-center`}>
                    <Ionicons name="refresh" size={20} color="white" />
                    <Text style={tw`text-white font-bold text-lg ml-2`}>
                      Try Again
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={handleViewStats}
                style={tw`bg-gradient-to-r from-green-500 to-teal-600 py-4 rounded-2xl items-center`}
              >
                <View style={tw`flex-row items-center`}>
                  <Ionicons name="stats-chart" size={20} color="white" />
                  <Text style={tw`text-white font-bold text-lg ml-2`}>
                    View My Stats
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleContinueToDashboard}
                style={tw`bg-gradient-to-r from-yellow-500 to-orange-500 py-4 rounded-2xl items-center`}
              >
                <View style={tw`flex-row items-center`}>
                  <Ionicons name="home" size={20} color="white" />
                  <Text style={tw`text-white font-bold text-lg ml-2`}>
                    Continue Learning
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>

        {/* Floating Celebration Elements */}
        {isPassed && (
          <>
            <Animatable.View
              animation="bounce"
              iterationCount="infinite"
              style={tw`absolute top-20 left-8`}
            >
              <Text style={tw`text-3xl`}>⭐</Text>
            </Animatable.View>
            <Animatable.View
              animation="bounce"
              iterationCount="infinite"
              delay={500}
              style={tw`absolute top-32 right-12`}
            >
              <Text style={tw`text-2xl`}>🎈</Text>
            </Animatable.View>
            <Animatable.View
              animation="bounce"
              iterationCount="infinite"
              delay={1000}
              style={tw`absolute bottom-40 left-12`}
            >
              <Text style={tw`text-2xl`}>🎉</Text>
            </Animatable.View>
          </>
        )}
      </SafeAreaView>
    </BackgroundWrapper>
  );
} 