import React from 'react';
import { View, Text, TouchableOpacity, ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import tw from '@/lib/tailwind';

interface HeaderBarProps extends ViewProps {
  title: string;
  showBack?: boolean;
  rightActionIcon?: keyof typeof Ionicons.glyphMap;
  backgroundColor?: string;
  onRightActionPress?: () => void;
}

export default function HeaderBar({
  title,
  showBack = true,
  rightActionIcon,
  onRightActionPress,
  style,
  backgroundColor,
  ...rest
}: HeaderBarProps) {
  const router = useRouter();

  return (
    <View {...rest} style={tw.style('flex-row items-center justify-between p-4')}>
      {showBack ? (
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`bg-white bg-opacity-20 p-3 rounded-full`}
          accessibilityLabel="Go Back"
        >
          <Ionicons name="arrow-back" size={24} color="#101519" />
        </TouchableOpacity>
      ) : (
        <View style={tw`w-12`} />
      )}

      <Text style={tw`text-xl font-bold text-gray-900`}>{title}</Text>

      {rightActionIcon ? (
        <TouchableOpacity
          onPress={onRightActionPress}
          style={tw`bg-white bg-opacity-20 p-3 rounded-full`}
        >
          <Ionicons name={rightActionIcon as any} size={24} color="#101519" />
        </TouchableOpacity>
      ) : (
        <View style={tw`w-12`} />
      )}
    </View>
  );
}
