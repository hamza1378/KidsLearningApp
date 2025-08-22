import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import tw from "@/lib/tailwind";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import MusicLayout from "@/components/MusicLayout";
import * as Animatable from "react-native-animatable";
import { FontAwesome } from "@expo/vector-icons";

interface HelpItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const helpData: HelpItem[] = [
  {
    id: "1",
    title: "How to Scan QR Codes",
    description: "Point your camera at any QR code to unlock new learning activities and games!",
    icon: "qrcode",
  },
  {
    id: "2", 
    title: "Track Your Progress",
    description: "Check your achievements and learning history to see how much you've learned!",
    icon: "trophy",
  },
  {
    id: "3",
    title: "Choose Your Avatar",
    description: "Pick your favorite character to make learning more fun and personal!",
    icon: "user",
  },
  {
    id: "4",
    title: "Parent Settings",
    description: "Parents can adjust difficulty levels and monitor learning progress.",
    icon: "cog",
  },
  {
    id: "5",
    title: "Need More Help?",
    description: "Contact our support team for any questions or technical issues.",
    icon: "question-circle",
  },
];

const HelpScreen: React.FC = () => {
  return (
    <MusicLayout musicKey="landing">
      <BackgroundWrapper>
        <ScrollView
          contentContainerStyle={tw`w-full items-center pb-40`}
          showsVerticalScrollIndicator={false}
        >
          <View style={tw`w-11/12`}>
            {/* Header */}
            <Animatable.View animation="bounceIn" duration={1500}>
              <View style={tw`items-center mb-6 mt-4`}>
                <View style={tw`bg-white bg-opacity-20 rounded-full p-4 mb-4`}>
                  <FontAwesome name="question-circle" size={40} color="white" />
                </View>
                <Text style={tw`text-white text-3xl font-bold text-center`}>
                  Help Center
                </Text>
                <Text style={tw`text-yellow-200 text-lg text-center mt-2`}>
                  Everything you need to know!
                </Text>
              </View>
            </Animatable.View>

            {/* Help Items */}
            {helpData.map((item, index) => (
              <Animatable.View
                key={item.id}
                animation="slideInUp"
                delay={index * 200}
                style={tw`mb-4`}
              >
                <TouchableOpacity
                  style={tw`bg-white bg-opacity-20 border-4 border-yellow-400 rounded-2xl p-4`}
                  activeOpacity={0.8}
                >
                  <View style={tw`flex-row items-center`}>
                    <View style={tw`bg-yellow-400 rounded-full p-3 mr-4`}>
                      <FontAwesome name={item.icon as any} size={24} color="white" />
                    </View>
                    <View style={tw`flex-1`}>
                      <Text style={tw`text-white text-lg font-bold mb-1`}>
                        {item.title}
                      </Text>
                      <Text style={tw`text-yellow-100 text-sm`}>
                        {item.description}
                      </Text>
                    </View>
                    <FontAwesome name="chevron-right" size={16} color="yellow" />
                  </View>
                </TouchableOpacity>
              </Animatable.View>
            ))}

            {/* Contact Support */}
            <Animatable.View animation="fadeIn" delay={1200} style={tw`mt-8`}>
              <TouchableOpacity
                style={tw`bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl p-4 items-center border-4 border-blue-300`}
                activeOpacity={0.8}
              >
                <FontAwesome name="envelope" size={24} color="white" style={tw`mb-2`} />
                <Text style={tw`text-white text-lg font-bold`}>
                  Contact Support
                </Text>
                <Text style={tw`text-blue-100 text-sm text-center mt-1`}>
                  Get help from our friendly team
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </ScrollView>
      </BackgroundWrapper>
    </MusicLayout>
  );
};

export default HelpScreen;
