import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import tw from '@/lib/tailwind';
import * as Animatable from 'react-native-animatable';
import { router } from 'expo-router';

export default function SmartTVSync() {
  return (
    <Animatable.View animation="fadeInUp" duration={800} delay={700} style={tw`rounded-2xl p-6 shadow-lg border border-indigo-200 overflow-hidden`}>
      <LinearGradient
        colors={['#e0e7ff', '#c7d2fe', '#a5b4fc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={tw`absolute inset-0 rounded-2xl`}
      />
      <View style={tw`relative z-10`}>
        <View style={tw`items-center`}>
          <TouchableOpacity onPress={() => router.push('/cast-to-tv')} style={tw`relative`}>
            <View style={tw`rounded-full items-center justify-center shadow-md bg-red-200 p-4`}>
              <Ionicons name="tv" size={40} color="red" />
            </View>
            <View style={tw`absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white items-center justify-center`}>
              <Ionicons name="wifi" size={12} color="white" />
            </View>
          </TouchableOpacity>
          <Text style={tw`text-lg font-bold text-center text-gray-800 mt-3 mb-1`}>Smart TV Sync 📺</Text>
          <Text style={tw`text-gray-600 text-center text-sm mb-4`}>Mirror entire app to your TV</Text>
          <TouchableOpacity onPress={() => router.push('/cast-to-tv')} style={tw`bg-green-50 rounded-xl p-3 border border-green-200 w-full`}>
            <View style={tw`flex-row items-center justify-between`}>
              <View style={tw`flex-row items-center`}>
                <View style={tw`w-2 h-2 bg-green-500 rounded-full mr-2`} />
                <Text style={tw`text-green-700 text-sm font-medium`}>Ready to sync</Text>
              </View>
              <View style={tw`bg-green-100 px-2 py-1 rounded-full`}>
                <Text style={tw`text-green-700 text-xs font-semibold`}>Tap to connect</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  );
}
