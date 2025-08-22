import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from '@/lib/tailwind';
import { useRouter } from 'expo-router';

type Props = {
  onRightPress?: () => void;
};

export default function NavBar({ onRightPress }: Props) {
  const router = useRouter();

  return (
    <View
      style={tw.style(
        'absolute top-0 left-0 right-0 z-100 bg-yellow-300 border-b-0 rounded-2xl mx-3 mt-11 mb-1.5 py-2.5 px-4.5 flex-row items-center justify-between min-h-16'
      )}
    >
      <View style={tw`flex-row items-center`}>
        <View
          style={tw.style(
            'w-11 h-11 rounded-full border-2 border-yellow-400 bg-white overflow-hidden mr-3'
          )}
        >
          <Image
            source={require('@/assets/images/avatar/boy3.png')}
            style={tw`w-full h-full`}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={tw`flex-row items-center`}>
        <TouchableOpacity
          onPress={onRightPress ?? (() => router.push('/teacher/qr-generator'))}
          style={tw`p-1.5 rounded-full bg-gray-50 border border-gray-200`}
          accessibilityLabel="Teacher QR Generator"
          activeOpacity={0.7}
        >
          <Ionicons name="school" size={26} color="#fbbf24" />
        </TouchableOpacity>
      </View>
    </View>
  );
}


