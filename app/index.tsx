import { useEffect } from "react";
import { View, Image } from "react-native";
import { useRouter } from "expo-router";
import * as Animatable from "react-native-animatable";
import tw from "../lib/tailwind";
import Button from "@/components/Button";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { useLoader } from "@/context/LoaderContext";

import { SoundManager } from "@/hooks/SoundManager";
import { MusicManager } from "@/hooks/MusicManager";
import { VOICE_MESSAGES, VOICE_STYLES } from "@/constants/voicePresets";
import MusicLayout from "@/components/MusicLayout";

export default function LandingPage() {
  const router = useRouter();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    SoundManager.speak({
      text: VOICE_MESSAGES.welcome,
      style: VOICE_STYLES.funKid,
    });
  }, []);

  const handlePress = async () => {
    showLoader();

    try {
      // Fade out the music
      await MusicManager.fadeOutAndStop();
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for animations or loaders
      hideLoader();
      router.push("/(auth)/nickname"); // Navigate to next screen
    } catch (err) {
      console.error("Something went wrong:", err);
      hideLoader();
    }
  };

  return (
    <MusicLayout musicKey="landing">
      <BackgroundWrapper>
        {/* Animated Background */}
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

        {/* Get Started Button */}
        <View style={tw`absolute bottom-10 w-full`}>
          <Button title="Get Started" showAnimatedHand onPress={handlePress} />
        </View>
      </BackgroundWrapper>
    </MusicLayout>
  );
}
