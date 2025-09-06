import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from '@/lib/tailwind';

export interface PendingItemCardProps {
  id: string;
  title: string;
  icon: string;
  color: string;
  bgColor: string; // tailwind class string
  borderColor: string; // tailwind class string
  subtitleLeft: string; // e.g. time ago
  subtitleRight?: string; // e.g. duration
  progress?: number; // 0-100 for videos
  onPress: () => void;
}

const PendingItemCard: React.FC<PendingItemCardProps> = ({
  title,
  icon,
  color,
  bgColor,
  borderColor,
  subtitleLeft,
  subtitleRight,
  progress,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`${bgColor} rounded-md border ${borderColor} p-3 shadow-sm`}
    >
      <View style={tw`flex-row items-center`}>
        <View
          style={tw`w-10 h-10 bg-white rounded-full items-center justify-center mr-3 shadow-sm`}
        >
          <Ionicons name={icon as any} size={20} color={color} />
        </View>
        <View style={tw`flex-1`}>
          <Text
            style={tw`text-sm font-bold text-gray-800 mb-1`}
            numberOfLines={1}
          >
            {title}
          </Text>
          <View style={tw`flex-row items-center justify-between`}>
            <Text style={tw`text-xs text-gray-500`}>{subtitleLeft}</Text>
            {subtitleRight ? (
              <Text style={tw`text-xs text-gray-500`}>{subtitleRight}</Text>
            ) : null}
          </View>
          {progress !== undefined && progress > 0 ? (
            <View style={tw`mt-1`}>
              <View style={tw`h-1 bg-gray-200 rounded-full overflow-hidden`}>
                <View
                  style={[
                    tw`h-full rounded-full`,
                    { width: `${progress}%`, backgroundColor: color },
                  ]}
                />
              </View>
              <Text style={tw`text-xs text-gray-400 mt-1`}>{progress}% watched</Text>
            </View>
          ) : null}
        </View>
        <View style={tw`ml-2 bg-white rounded-full p-2 shadow-sm`}>
          <Ionicons name="play" size={14} color={color} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PendingItemCard;
