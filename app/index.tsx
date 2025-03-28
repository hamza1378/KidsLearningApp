import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import * as Animatable from "react-native-animatable";
import tw from "../lib/tailwind";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";


export default function LandingPage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default to English

  return (
    <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={tw`flex-1`}>
      <SafeAreaView style={tw`flex-1`}>
        <StatusBar style="dark" translucent backgroundColor="transparent" />
        <View style={tw`flex-1 justify-between`}>

          {/* Image Section with Animated Glow */}
          <Animatable.View
            animation={{
              0: { opacity: 0.9, tintColor: "rgb(114, 233, 144)" },
              0.3: { opacity: 0.5, tintColor: "rgb(55, 194, 160)" },
              0.6: { opacity: 1, tintColor: "rgb(93, 166, 212)" },
              1: { opacity: 0.8, tintColor: "rgb(55, 194, 160)" },
            }}
            iterationCount="infinite"
            duration={3500}
            easing="ease-in-out"
            delay={300}
            style={tw`flex-1 justify-center items-center`}
          >
            <Image
              source={require("../assets/images/landing-page.png")}
              style={{ width: 300, height: 500, resizeMode: "contain" }}
            />
          </Animatable.View>

          {/* Content Section */}
          <View
            style={[
              tw`flex-1 justify-center px-4`,
              { borderTopLeftRadius: 50, borderTopRightRadius: 50, overflow: "hidden" },
            ]}
          >

            {/* Get Started Button */}
            <TouchableOpacity
              onPress={() => router.push("/(auth)/signin")}
              style={tw`rounded-xl mx-8 mt-4 border-4 border-yellow-500 overflow-hidden`}
            >
              <LinearGradient
                colors={["#8ba0ff", "#1dd7e0"]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={tw`py-4 rounded-xl items-center`}
              >
                <Animatable.Text
                  animation="pulse"
                  iterationCount="infinite"
                  duration={1000}
                  style={tw`text-center font-bold text-2xl text-yellow-300`}
                >
                  Get Started
                </Animatable.Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Animated Cursor Pointer */}
            <TouchableOpacity>
              <Animatable.View
                animation={{
                  0: { translateY: 10 },
                  0.5: { translateY: -5 },
                  1: { translateY: 10 },
                }}
                iterationCount="infinite"
                duration={1500}
                easing="ease-in-out"
                style={tw`absolute right-3 bottom-0`}
              >
                <Image
                  source={require("../assets/images/hand-pointer.png")}
                  style={{ width: 60, height: 60, resizeMode: "contain" }}
                />
              </Animatable.View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
