import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity, Image, TextInput, Alert, ScrollView } from "react-native";
import tw from "@/lib/tailwind";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import MusicLayout from "@/components/MusicLayout";
import * as Animatable from "react-native-animatable";
import { FontAwesome } from "@expo/vector-icons";

const languages = ["English", "Spanish", "French", "German"];

export default function SettingsScreen() {
  const [soundOn, setSoundOn] = useState(true);
  const [musicOn, setMusicOn] = useState(true);
  const [nickname, setNickname] = useState("Leo");
  const [editNickname, setEditNickname] = useState("");
  const [language, setLanguage] = useState(languages[0]);
  const [restricted, setRestricted] = useState(false);
  const avatar = require("../../assets/images/avatar/boy2.png");

  const handleSaveNickname = () => {
    if (editNickname.trim()) {
      setNickname(editNickname.trim());
      setEditNickname("");
    }
  };

  const handleResetProgress = () => {
    Alert.alert(
      "Reset Progress",
      "Are you sure you want to reset all your progress? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Reset", style: "destructive", onPress: () => Alert.alert("Progress reset!") },
      ]
    );
  };

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
                  <FontAwesome name="cog" size={40} color="white" />
                </View>
                <Text style={tw`text-white text-3xl font-bold text-center`}>
                  Settings
                </Text>
                <Text style={tw`text-yellow-200 text-lg text-center mt-2`}>
                  Customize your learning experience!
                </Text>
              </View>
            </Animatable.View>

            {/* Profile Section */}
            <Animatable.View animation="slideInUp" delay={200} style={tw`mb-6`}>
              <View style={tw`bg-white bg-opacity-20 border-4 border-yellow-400 rounded-2xl p-6 items-center`}>
                <Image source={avatar} style={tw`w-24 h-24 rounded-full border-4 border-yellow-300 bg-white mb-4`} resizeMode="cover" />
                <Text style={tw`text-white text-xl font-bold mb-2`}>{nickname}</Text>
                <TouchableOpacity style={tw`bg-yellow-400 px-4 py-2 rounded-full`}>
                  <Text style={tw`text-white font-bold`}>Change Avatar</Text>
                </TouchableOpacity>
              </View>
            </Animatable.View>

            {/* Nickname Change */}
            <Animatable.View animation="slideInUp" delay={400} style={tw`mb-6`}>
              <View style={tw`bg-white bg-opacity-20 border-4 border-blue-400 rounded-2xl p-4`}>
                <Text style={tw`text-white text-lg font-bold mb-3`}>Change Nickname</Text>
                <View style={tw`flex-row items-center mb-2`}>
                  <TextInput
                    value={editNickname}
                    onChangeText={setEditNickname}
                    placeholder="Enter new nickname"
                    placeholderTextColor="#cbd5e1"
                    style={tw`flex-1 border-2 border-blue-300 rounded-lg px-3 py-2 mr-2 bg-white bg-opacity-20 text-white text-base`}
                    maxLength={16}
                  />
                  <TouchableOpacity onPress={handleSaveNickname} style={tw`bg-blue-400 px-4 py-2 rounded-lg border-2 border-blue-300`}>
                    <Text style={tw`text-white font-bold`}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animatable.View>

            {/* Language Selection */}
            <Animatable.View animation="slideInUp" delay={600} style={tw`mb-6`}>
              <View style={tw`bg-white bg-opacity-20 border-4 border-green-400 rounded-2xl p-4`}>
                <Text style={tw`text-white text-lg font-bold mb-3`}>Language</Text>
                <View style={tw`flex-row flex-wrap gap-2`}>
                  {languages.map((lang) => (
                    <TouchableOpacity
                      key={lang}
                      onPress={() => setLanguage(lang)}
                      style={tw`${language === lang ? 'bg-green-400 border-green-300' : 'bg-white bg-opacity-20 border-white'} border-2 px-4 py-2 rounded-full`}
                    >
                      <Text style={tw`${language === lang ? 'text-white' : 'text-white'} font-bold`}>{lang}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Animatable.View>

            {/* Sound Settings */}
            <Animatable.View animation="slideInUp" delay={800} style={tw`mb-6`}>
              <View style={tw`bg-white bg-opacity-20 border-4 border-purple-400 rounded-2xl p-4`}>
                <Text style={tw`text-white text-lg font-bold mb-4`}>Sound Settings</Text>
                <View style={tw`flex-row items-center justify-between mb-3`}>
                  <Text style={tw`text-white text-base`}>Sound Effects</Text>
                  <Switch value={soundOn} onValueChange={setSoundOn} thumbColor={soundOn ? '#1dd7e0' : '#e5e7eb'} trackColor={{ true: '#a7f3d0', false: '#e5e7eb' }} />
                </View>
                <View style={tw`flex-row items-center justify-between`}>
                  <Text style={tw`text-white text-base`}>Background Music</Text>
                  <Switch value={musicOn} onValueChange={setMusicOn} thumbColor={musicOn ? '#1dd7e0' : '#e5e7eb'} trackColor={{ true: '#a7f3d0', false: '#e5e7eb' }} />
                </View>
              </View>
            </Animatable.View>

            {/* Parental Controls */}
            <Animatable.View animation="slideInUp" delay={1000} style={tw`mb-6`}>
              <View style={tw`bg-white bg-opacity-20 border-4 border-pink-400 rounded-2xl p-4`}>
                <Text style={tw`text-white text-lg font-bold mb-4`}>Parental Controls</Text>
                <View style={tw`flex-row items-center justify-between`}>
                  <Text style={tw`text-white text-base`}>Restricted Mode</Text>
                  <Switch value={restricted} onValueChange={setRestricted} thumbColor={restricted ? '#1dd7e0' : '#e5e7eb'} trackColor={{ true: '#a7f3d0', false: '#e5e7eb' }} />
                </View>
              </View>
            </Animatable.View>

            {/* Reset Progress */}
            <Animatable.View animation="slideInUp" delay={1200} style={tw`mb-6`}>
              <TouchableOpacity 
                onPress={handleResetProgress} 
                style={tw`bg-red-500 border-4 border-red-400 px-6 py-3 rounded-2xl items-center`}
              >
                <FontAwesome name="trash" size={20} color="white" style={tw`mb-2`} />
                <Text style={tw`text-white font-bold text-lg`}>Reset Progress</Text>
              </TouchableOpacity>
            </Animatable.View>

            {/* About Section */}
            <Animatable.View animation="fadeIn" delay={1400} style={tw`mb-6`}>
              <View style={tw`bg-blue-500 bg-opacity-20 border-4 border-blue-400 rounded-2xl p-4 items-center`}>
                <Text style={tw`text-white text-lg font-bold mb-2`}>About KidsLearningApp</Text>
                <Text style={tw`text-white text-base text-center mb-1`}>Version 1.0.0</Text>
                <Text style={tw`text-blue-200 text-base text-center`}>Learn, play, and grow with fun lessons and activities!</Text>
              </View>
            </Animatable.View>
          </View>
        </ScrollView>
      </BackgroundWrapper>
    </MusicLayout>
  );
}