import React, { useState } from "react";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import Button from "@/components/Button";
import tw from "@/lib/tailwind";
import { View } from "react-native";
import LottieView from 'lottie-react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Animatable from 'react-native-animatable';

const AvatarCustomization = () => {
  const [showContent, setShowContent] = useState(false);

  return (
    <BackgroundWrapper>
      {showContent && (
        <Animatable.View animation="fadeIn" duration={800} delay={100} 
        style={tw`flex-1`}>
          <LottieView
            style={tw`h-96 w-96 mt-20`}
            source={require('../../assets/animations/success.json')}
            autoPlay
          />

          <View style={tw`absolute bottom-10 w-full`}>
            <Button
              title="Go To Dashboard"
              showAnimatedHand={true}
            />
          </View>
        </Animatable.View>
      )}

      {!showContent && (
        <ConfettiCannon
          count={100}
          origin={{ x: -10, y: 0 }}
          onAnimationEnd={() => setShowContent(true)}
          fadeOut
        />
      )}
    </BackgroundWrapper>
  );
};

export default AvatarCustomization;
