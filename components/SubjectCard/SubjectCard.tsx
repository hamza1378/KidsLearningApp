import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from '@/lib/tailwind';
import { Subject, Course } from '@/data/subjects';
import ProgressBar from '@/components/ProgressBar';
import * as Animatable from 'react-native-animatable';

interface SubjectCardProps {
  subject: Subject;
  onPress: (subject: Subject) => void;
  onCoursePress: (subject: Subject, course: Course) => void;
}

const { width } = Dimensions.get('window');

export default function SubjectCard({ subject, onPress, onCoursePress }: SubjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpanded = () => {
    const toValue = isExpanded ? 0 : 1;
    setIsExpanded(!isExpanded);
    
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const getStatusIcon = (status: Course['status']) => {
    switch (status) {
      case 'completed':
        return <Ionicons name="checkmark-circle" size={16} color="#22c55e" />;
      case 'in-progress':
        return <Ionicons name="play-circle" size={16} color="#f59e0b" />;
      case 'locked':
        return <Ionicons name="lock-closed" size={16} color="#6b7280" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: Course['status']) => {
    switch (status) {
      case 'completed':
        return '#dcfce7';
      case 'in-progress':
        return '#fef3c7';
      case 'locked':
        return '#f3f4f6';
      default:
        return '#f3f4f6';
    }
  };

  const getTypeIcon = (type: Course['type']) => {
    switch (type) {
      case 'video':
        return <Ionicons name="play" size={12} color="#6b7280" />;
      case 'quiz':
        return <Ionicons name="help-circle" size={12} color="#6b7280" />;
      case 'interactive':
        return <Ionicons name="hand-left" size={12} color="#6b7280" />;
      default:
        return null;
    }
  };

  return (
    <Animatable.View
      animation="fadeInUp"
      duration={600}
      style={tw`bg-white rounded-2xl shadow-lg border border-gray-100 mb-4 overflow-hidden min-h-20`}
    >
      {/* Main Subject Header */}
      <TouchableOpacity
        onPress={() => !subject.isLocked && onPress(subject)}
        disabled={subject.isLocked}
        style={tw`p-4 min-h-20`}
      >
        <View style={tw`flex-row items-center justify-between h-20`}>
          {/* Subject Info */}
          <View style={tw`flex-row items-center flex-1`}>
            <View style={tw.style('w-12 h-12 rounded-2xl items-center justify-center mr-3 flex-shrink-0', {
              backgroundColor: subject.isLocked ? '#f3f4f6' : `${subject.color}20`,
            })}>
              <Text style={tw`text-4xl`}>{subject.icon}</Text>
            </View>
            
            <View style={tw`flex-1 min-h-0 justify-between h-full`}>
              <View style={tw`flex-row items-center`}>
                <View style={tw`flex-1 min-h-0`}>
                  <Text 
                    style={tw.style('text-lg font-bold leading-5', {
                      color: subject.isLocked ? '#9ca3af' : '#1f2937'
                    })}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {subject.name}
                  </Text>
                </View>
                {subject.isLocked && (
                  <Ionicons name="lock-closed" size={16} color="#9ca3af" style={tw`ml-2 flex-shrink-0`} />
                )}
              </View>
              
              {/* Progress Bar */}
              <View style={tw`mt-auto`}>
                <View style={tw`flex-row items-center justify-between mb-1`}>
                  <Text style={tw`text-xs text-gray-500`}>Progress</Text>
                  <Text style={tw.style('text-xs font-semibold', {
                    color: subject.isLocked ? '#9ca3af' : subject.color
                  })}>
                    {subject.progress}%
                  </Text>
                </View>
                <View style={tw`h-2 bg-gray-200 rounded-full overflow-hidden`}>
                  <View style={tw.style('h-full rounded-full', {
                    backgroundColor: subject.isLocked ? '#d1d5db' : subject.color,
                    width: `${subject.progress}%`,
                  })} />
                </View>
              </View>
            </View>
          </View>

          {/* Expand Button */}
          <TouchableOpacity
            onPress={toggleExpanded}
            style={tw`w-8 h-8 rounded-full items-center justify-center bg-gray-100 ml-3 flex-shrink-0`}
          >
            <Animated.View
              style={{
                transform: [{
                  rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                  }),
                }],
              }}
            >
              <Ionicons name="chevron-down" size={16} color="#6b7280" />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* Expanded Content */}
      <Animated.View
        style={{
          maxHeight: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 400],
          }),
          opacity: animation,
        }}
      >
        <View style={tw`border-t border-gray-100`}>
          {/* Quick Stats */}
          <View style={tw`p-4 bg-gray-50`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-3`}>Quick Stats</Text>
            <View style={tw`flex-row justify-between`}>
              <View style={tw`items-center`}>
                <Text style={tw`text-lg font-bold text-blue-600`}>{subject.stats.passedQuizzes}</Text>
                <Text style={tw`text-xs text-gray-600`}>Quizzes Passed</Text>
              </View>
              <View style={tw`items-center`}>
                <Text style={tw`text-lg font-bold text-green-600`}>{subject.stats.watchedVideos}</Text>
                <Text style={tw`text-xs text-gray-600`}>Videos Watched</Text>
              </View>
              <View style={tw`items-center`}>
                <Text style={tw`text-lg font-bold text-purple-600`}>{subject.stats.streakDays}</Text>
                <Text style={tw`text-xs text-gray-600`}>Day Streak</Text>
              </View>
              <View style={tw`items-center`}>
                <Text style={tw`text-lg font-bold text-orange-600`}>{subject.stats.bestScore}%</Text>
                <Text style={tw`text-xs text-gray-600`}>Best Score</Text>
              </View>
            </View>
          </View>

          {/* Courses List */}
          <View style={tw`p-4`}>
            <View style={tw`flex-row items-center justify-between mb-3`}>
              <Text style={tw`text-sm font-semibold text-gray-700`}>Courses</Text>
              <TouchableOpacity
                onPress={() => !subject.isLocked && onPress(subject)}
                disabled={subject.isLocked}
                style={tw`px-3 py-1 bg-blue-100 rounded-full`}
              >
                <Text style={tw`text-xs font-semibold text-blue-600`}>View All</Text>
              </TouchableOpacity>
            </View>
            
            <View style={tw`gap-2`}>
              {subject.courses.slice(0, 3).map((course, index) => (
                <TouchableOpacity
                  key={course.id}
                  onPress={() => course.status !== 'locked' && onCoursePress(subject, course)}
                  disabled={course.status === 'locked'}
                  style={tw.style('flex-row items-center p-3 rounded-xl', {
                    backgroundColor: getStatusColor(course.status),
                  })}
                >
                  <View style={tw`mr-3`}>
                    {getStatusIcon(course.status)}
                  </View>
                  
                  <View style={tw`flex-1`}>
                    <View style={tw`flex-row items-center`}>
                      {getTypeIcon(course.type)}
                      <Text style={tw`text-xs text-gray-500 ml-1`}>
                        {course.type.charAt(0).toUpperCase() + course.type.slice(1)}
                      </Text>
                    </View>
                    <Text style={tw.style('text-sm font-medium', {
                      color: course.status === 'locked' ? '#9ca3af' : '#374151'
                    })}>
                      {course.title}
                    </Text>
                  </View>
                  
                  <View style={tw`items-end`}>
                    {course.duration && (
                      <Text style={tw`text-xs text-gray-500`}>{course.duration}</Text>
                    )}
                    {course.score && (
                      <Text style={tw`text-xs font-semibold text-green-600`}>{course.score}%</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Animated.View>
    </Animatable.View>
  );
}
