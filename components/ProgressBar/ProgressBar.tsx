import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import tw from '@/lib/tailwind';

interface ProgressBarProps {
  percentage: number; // 0-100
  fromColor?: string;
  toColor?: string;
  height?: number;
}

export default function ProgressBar({
  percentage,
  fromColor = '#3b82f6',
  toColor = '#8b5cf6',
  height = 12,
}: ProgressBarProps) {
  const animated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animated, {
      toValue: Math.min(Math.max(percentage, 0), 100),
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  return (
    <View style={tw.style('bg-gray-200 rounded-full overflow-hidden', { height })}>
      <Animated.View
        style={[
          tw`h-full rounded-full`,
          {
            width: animated.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }),
            backgroundColor: fromColor,
          }
        ]}
      />
    </View>
  );
}
