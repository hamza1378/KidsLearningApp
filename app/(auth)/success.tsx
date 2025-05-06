import React, { useState, useEffect } from "react";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import Button from "@/components/Button";
import tw from "@/lib/tailwind";
import { View } from "react-native";
import LottieView from 'lottie-react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Animatable from 'react-native-animatable';
import { Audio } from 'expo-av';

const AvatarCustomization = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!showContent) {
      playConfettiSound();
    }
  }, [showContent]);

  const playConfettiSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/audio/party-ballon.mp3') // Make sure this path is correct
    );

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync(); // Clean up when sound is done playing
      }
    });

    await sound.playAsync();
  };

  return (
    <BackgroundWrapper>
      {showContent && (
        <Animatable.View animation="fadeIn" duration={300} delay={100} 
        style={tw`flex-1`}>
          <LottieView
            style={tw`h-96 w-96 mt-20`}
            source={require('../../assets/animations/success.json')}
            autoPlay
          />

        </Animatable.View>
      )}

      {!showContent && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          onAnimationEnd={() => setShowContent(true)}
          fadeOut
        />
      )}
    </BackgroundWrapper>
  );
};

export default AvatarCustomization;
