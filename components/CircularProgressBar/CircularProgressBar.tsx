import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import tw from '@/lib/tailwind';

interface CircularProgressBarProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  title?: string;
  subtitle?: string;
  showPercentage?: boolean;
  animated?: boolean;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  color = '#3b82f6',
  backgroundColor = '#d1d5db',
  title,
  subtitle,
  showPercentage = true,
  animated = true,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (animated) {
      Animated.timing(animatedValue, {
        toValue: percentage,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    } else {
      animatedValue.setValue(percentage);
    }
  }, [percentage, animated]);

  // Calculate the stroke dash offset for the progress circle
  const progressPercentage = Math.min(Math.max(percentage, 0), 100);
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;
  
  // Ensure the background trail is always visible - make it much more prominent
  const trailColor = backgroundColor || '#9ca3af';
  
  // Debug: Log the values to ensure they're correct
  console.log('CircularProgressBar Debug:', {
    percentage,
    progressPercentage,
    circumference,
    strokeDashoffset,
    color,
    trailColor
  });

  return (
    <View style={tw`items-center`}>
      <View style={tw`relative`}>
                 {/* Background Circle (Trail) */}
         <Svg width={size} height={size}>
                                               <Circle
               cx={size / 2}
               cy={size / 2}
               r={radius}
               stroke={trailColor}
               strokeWidth={strokeWidth}
               fill="transparent"
               strokeLinecap="round"
               opacity={1}
             />
         </Svg>

                                   {/* Progress Circle */}
          <View style={tw`absolute`}>
            <Svg width={size} height={size}>
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            </Svg>
          </View>

        {/* Center Content */}
        <View style={tw`absolute inset-0 items-center justify-center`}>
          {showPercentage && (
            <View style={tw`items-center`}>
              <Animated.Text
                style={[
                  tw`text-2xl font-bold text-gray-800`,
                  { color: color }
                ]}
              >
                {Math.round(percentage)}%
              </Animated.Text>
              {title && (
                <Text style={tw`text-sm text-gray-600 text-center mt-1`}>
                  {title}
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
      
      {subtitle && (
        <Text style={tw`text-xs text-gray-500 text-center mt-2`}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

export default CircularProgressBar;
