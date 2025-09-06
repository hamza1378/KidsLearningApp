import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from '@/lib/tailwind';
import * as Animatable from 'react-native-animatable';

interface DashboardWelcomeHeaderProps {
  userName?: string;
}

export default function DashboardWelcomeHeader({ userName = "Alex" }: DashboardWelcomeHeaderProps) {
  return (
    <Animatable.View animation="fadeInDown" duration={800} style={tw`rounded-3xl p-6 mb-4 overflow-hidden shadow-2xl`}>
      {/* Beautiful Gradient Background */}
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={tw`absolute inset-0 rounded-3xl`}
      />
      
      {/* Elegant Border with Shine */}
      <View style={tw`absolute inset-0 rounded-3xl border-2 border-white/30`} /> 
      {/* Multiple Shiny Overlay Effects */}
      <View style={tw`absolute inset-0 rounded-3xl`}>
        {/* Corner Shine Effect */}
        <View style={tw`absolute top-0 right-0 w-20 h-20 rounded-full bg-white/25`} />
        <View style={tw`absolute top-2 right-2 w-16 h-16 rounded-full bg-white/20`} />
      </View>
      
      {/* Content */}
      <View style={tw`items-center relative z-10`}>
        <View style={tw`flex-row items-center justify-center`}>
          <Animatable.View 
            animation={{
              0: { transform: [{ rotate: '0deg' }] },
              0.2: { transform: [{ rotate: '20deg' }] },
              0.4: { transform: [{ rotate: '0deg' }] },
              0.6: { transform: [{ rotate: '-20deg' }] },
              0.8: { transform: [{ rotate: '0deg' }] },
              1: { transform: [{ rotate: '20deg' }] }
            }}
            iterationCount="infinite" 
            duration={2000}
            style={tw`items-center justify-center`}
          >
            <Text style={tw`text-4xl`}>👋</Text>
          </Animatable.View>
        </View>
        <Text style={tw`text-2xl pt-2 font-bold text-white`}>Welcome back, {userName}!</Text>
        <Text style={tw`text-md font-bold text-yellow-200 text-center`}>Ready to learn something amazing today?</Text>
      </View>
    </Animatable.View>
  );
}
