import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

interface GradientButtonProps extends TouchableOpacityProps {
  label: string;
  fromColor?: string;
  toColor?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  textSize?: number;
}

export default function GradientButton({
  label,
  fromColor = 'blue-500',
  toColor = 'purple-600',
  icon,
  style,
  textSize = 16,
  ...rest
}: GradientButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} {...rest} style={style}>
      <LinearGradient
        colors={[tw.color(fromColor) as string, tw.color(toColor) as string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={tw`px-4 py-3 rounded-2xl flex-row items-center justify-center`}
      >
        {icon && <Ionicons name={icon as any} size={20} color="white" style={tw`mr-2`} />}
        <Text style={tw.style('font-bold text-white', { fontSize: textSize })}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
