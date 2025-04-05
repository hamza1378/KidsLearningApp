import { useEffect } from "react";
import { View, Image } from "react-native";
import { useRouter } from "expo-router";
import * as Animatable from "react-native-animatable";
import tw from "../lib/tailwind";
import Button from '@/components/Button';
import { playVoice } from "@/hooks/playVoice";
import BackgroundWrapper from "@/components/BackgroundWrapper";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    playVoice({
      text: "Lets get started"
    });
  }, []);

  const handlePress = () => {
    router.navigate('/(auth)/nickname');
  };

  return (
    <BackgroundWrapper>      
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
        delay={100}
        style={tw`w-full justify-center items-center`}
      >
        <Image
          source={require("../assets/images/landing-page.png")}
          style={{ width: 300, height: 500, resizeMode: "contain" }}
        />
      </Animatable.View>

      {/* Content Section */}
      <View style={tw`absolute bottom-10 w-full`}>
        <Button
          title="Get Started"
          showAnimatedHand={true}
          onPress={handlePress}
        />
      </View>
    </BackgroundWrapper>
  );
}
