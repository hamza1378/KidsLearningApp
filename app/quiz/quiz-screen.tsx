import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import tw from 'twrnc';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { useLoader } from '@/context/LoaderContext';
import { playClickSound } from '@/hooks/buttonPopSound';
import { SoundManager } from '@/hooks/SoundManager';
import { VOICE_STYLES } from '@/constants/voicePresets';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

interface Question {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation?: string;
}

interface QuizData {
  id: string;
  title: string;
  questions: Question[];
  totalQuestions: number;
  passingScore: number;
}

// Sample quiz data - in real app, this would come from the QR code or API
const sampleQuiz: QuizData = {
  id: 'math-basics-1',
  title: 'Math Basics Quiz',
  totalQuestions: 5,
  passingScore: 3,
  questions: [
    {
      id: '1',
      question: 'What is 2 + 3?',
      options: [
        { id: 'A', text: '4', isCorrect: false },
        { id: 'B', text: '5', isCorrect: true },
        { id: 'C', text: '6', isCorrect: false },
        { id: 'D', text: '7', isCorrect: false },
      ],
      explanation: '2 + 3 = 5. You can count: 1, 2, 3, 4, 5!'
    },
    {
      id: '2',
      question: 'Which shape has 3 sides?',
      options: [
        { id: 'A', text: 'Square', isCorrect: false },
        { id: 'B', text: 'Circle', isCorrect: false },
        { id: 'C', text: 'Triangle', isCorrect: true },
        { id: 'D', text: 'Rectangle', isCorrect: false },
      ],
      explanation: 'A triangle has exactly 3 sides and 3 corners!'
    },
    {
      id: '3',
      question: 'What comes after 5?',
      options: [
        { id: 'A', text: '4', isCorrect: false },
        { id: 'B', text: '6', isCorrect: true },
        { id: 'C', text: '7', isCorrect: false },
        { id: 'D', text: '8', isCorrect: false },
      ],
      explanation: 'After 5 comes 6. Count: 1, 2, 3, 4, 5, 6!'
    },
    {
      id: '4',
      question: 'How many fingers do you have on one hand?',
      options: [
        { id: 'A', text: '3', isCorrect: false },
        { id: 'B', text: '4', isCorrect: false },
        { id: 'C', text: '5', isCorrect: true },
        { id: 'D', text: '6', isCorrect: false },
      ],
      explanation: 'You have 5 fingers on each hand!'
    },
    {
      id: '5',
      question: 'What color is the sky on a sunny day?',
      options: [
        { id: 'A', text: 'Green', isCorrect: false },
        { id: 'B', text: 'Red', isCorrect: false },
        { id: 'C', text: 'Blue', isCorrect: true },
        { id: 'D', text: 'Yellow', isCorrect: false },
      ],
      explanation: 'The sky is usually blue on a sunny day!'
    },
  ],
};

export default function QuizScreen() {
  const { videoTitle, qrData } = useLocalSearchParams<{
    videoTitle?: string;
    qrData?: string;
  }>();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  
  const { showLoader, hideLoader } = useLoader();
  const progressAnim = useRef(new Animated.Value(0)).current;
  const optionAnim = useRef(new Animated.Value(0)).current;

  const currentQuestion = sampleQuiz.questions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / sampleQuiz.totalQuestions;

  useEffect(() => {
    // Voice prompt
    SoundManager.speak({
      text: `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`,
      style: VOICE_STYLES.funKid,
    });

    // Animate progress bar
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();

    // Animate options
    Animated.timing(optionAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentQuestionIndex]);

  const handleAnswerSelect = async (optionId: string) => {
    await playClickSound();
    setSelectedAnswer(optionId);
    
    // Voice feedback
    const option = currentQuestion.options.find(opt => opt.id === optionId);
    if (option?.isCorrect) {
      SoundManager.speak({
        text: "Great job! That's correct!",
        style: VOICE_STYLES.funKid,
      });
    } else {
      SoundManager.speak({
        text: "Let's try again!",
        style: VOICE_STYLES.funKid,
      });
    }
  };

  const handleNextQuestion = async () => {
    if (!selectedAnswer) return;

    await playClickSound();
    
    // Save answer
    const newAnswers = { ...answers, [currentQuestion.id]: selectedAnswer };
    setAnswers(newAnswers);

    // Check if answer is correct
    const isCorrect = currentQuestion.options.find(opt => opt.id === selectedAnswer)?.isCorrect;
    if (isCorrect) {
      setScore(score + 1);
    }

    // Show explanation briefly
    setShowExplanation(true);
    setTimeout(() => {
      setShowExplanation(false);
      
      // Move to next question or complete quiz
      if (currentQuestionIndex < sampleQuiz.totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        optionAnim.setValue(0);
      } else {
        // Quiz completed
        setQuizCompleted(true);
        showLoader();
        setTimeout(() => {
          hideLoader();
          // Navigate to result screen
          router.push({
            pathname: '/quiz/result',
            params: {
              score: score.toString(),
              totalQuestions: sampleQuiz.totalQuestions.toString(),
              passingScore: sampleQuiz.passingScore.toString(),
              videoTitle: videoTitle || 'Educational Video',
              qrData: qrData || '',
            }
          });
        }, 2000);
      }
    }, 2000);
  };

  const getOptionStyle = (optionId: string) => {
    if (selectedAnswer !== optionId) {
      return {
        backgroundColor: '#fff',
        borderColor: '#e0e7ff',
      };
    }

    const isCorrect = currentQuestion.options.find(opt => opt.id === optionId)?.isCorrect;
    if (showExplanation) {
      return {
        backgroundColor: isCorrect ? '#dcfce7' : '#fef2f2',
        borderColor: isCorrect ? '#22c55e' : '#ef4444',
      };
    }

    return {
      backgroundColor: '#fef3c7',
      borderColor: '#fbbf24',
    };
  };

  const getOptionIcon = (optionId: string) => {
    if (selectedAnswer !== optionId || !showExplanation) return null;
    
    const isCorrect = currentQuestion.options.find(opt => opt.id === optionId)?.isCorrect;
    return (
      <Ionicons
        name={isCorrect ? 'checkmark-circle' : 'close-circle'}
        size={24}
        color={isCorrect ? '#22c55e' : '#ef4444'}
        style={{ marginLeft: 8 }}
      />
    );
  };

  return (
    <BackgroundWrapper>
      <SafeAreaView style={tw`flex-1`}>
        {/* Header */}
        <View style={tw`flex-row items-center justify-between p-4`}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={tw`bg-white bg-opacity-20 p-3 rounded-full`}
          >
            <Ionicons name="arrow-back" size={24} color="#101519" />
          </TouchableOpacity>
          <Text style={tw`text-xl font-bold text-yellow-600`}>
            Quiz Time! 🎯
          </Text>
          <TouchableOpacity
            onPress={() => router.push({
              pathname: '/cast-to-tv',
              params: { 
                videoTitle: videoTitle || 'Educational Video',
                qrData: qrData || '',
                mode: 'quiz'
              }
            })}
            style={tw`bg-white bg-opacity-20 p-3 rounded-full`}
          >
            <Ionicons name="tv" size={24} color="#101519" />
          </TouchableOpacity>
        </View>

        {/* Progress Section */}
        <View style={tw`px-4 mb-6`}>
          <View style={tw`flex-row justify-between items-center mb-2`}>
            <Text style={tw`text-lg font-bold text-gray-700`}>
              Question {currentQuestionIndex + 1} of {sampleQuiz.totalQuestions}
            </Text>
            <Text style={tw`text-lg font-bold text-blue-600`}>
              {Math.round(progress * 100)}%
            </Text>
          </View>
          
          {/* Progress Bar */}
          <View style={tw`h-3 bg-gray-200 rounded-full overflow-hidden`}>
            <Animated.View
              style={[
                tw`h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full`,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
        </View>

        {/* Question Card */}
        <View style={tw`flex-1 px-4`}>
          <Animatable.View
            animation="fadeInUp"
            duration={500}
            style={tw`bg-white rounded-3xl p-6 shadow-lg border-2 border-yellow-200`}
          >
            {/* Question */}
            <View style={tw`mb-6`}>
              <View style={tw`flex-row items-center mb-3`}>
                <View style={tw`w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3`}>
                  <Text style={tw`text-lg font-bold text-blue-600`}>?</Text>
                </View>
                <Text style={tw`text-lg font-bold text-gray-700`}>
                  Question {currentQuestionIndex + 1}
                </Text>
              </View>
              <Text style={tw`text-xl font-bold text-gray-800 leading-7`}>
                {currentQuestion.question}
              </Text>
            </View>

            {/* Options */}
            <View style={tw`space-y-3`}>
              {currentQuestion.options.map((option, index) => (
                <Animated.View
                  key={option.id}
                  style={[
                    {
                      transform: [{
                        translateY: optionAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [50, 0],
                        })
                      }],
                      opacity: optionAnim,
                    }
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => handleAnswerSelect(option.id)}
                    disabled={selectedAnswer !== null}
                    style={[
                      tw`flex-row items-center p-4 rounded-2xl border-2`,
                      getOptionStyle(option.id),
                    ]}
                  >
                    <View style={tw`w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3`}>
                      <Text style={tw`font-bold text-blue-600`}>{option.id}</Text>
                    </View>
                    <Text style={tw`flex-1 text-lg text-gray-800`}>
                      {option.text}
                    </Text>
                    {getOptionIcon(option.id)}
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>

            {/* Explanation */}
            {showExplanation && currentQuestion.explanation && (
              <Animatable.View
                animation="fadeIn"
                style={tw`mt-4 p-4 bg-green-50 rounded-2xl border border-green-200`}
              >
                <View style={tw`flex-row items-center mb-2`}>
                  <Ionicons name="bulb" size={20} color="#22c55e" />
                  <Text style={tw`ml-2 font-bold text-green-700`}>Explanation</Text>
                </View>
                <Text style={tw`text-green-800`}>
                  {currentQuestion.explanation}
                </Text>
              </Animatable.View>
            )}
          </Animatable.View>
        </View>

        {/* Next Button */}
        <View style={tw`p-4`}>
          <TouchableOpacity
            onPress={handleNextQuestion}
            disabled={!selectedAnswer}
            style={[
              tw`py-4 rounded-2xl items-center`,
              selectedAnswer
                ? tw`bg-gradient-to-r from-blue-500 to-purple-600`
                : tw`bg-gray-300`,
            ]}
          >
            <Text style={tw`text-white font-bold text-lg`}>
              {currentQuestionIndex < sampleQuiz.totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </BackgroundWrapper>
  );
} 