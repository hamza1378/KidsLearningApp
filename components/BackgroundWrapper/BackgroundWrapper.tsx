import tw from "@/lib/tailwind";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

type Props = {
  children: ReactNode;
  alignment?: "start" | "center" | "end";
};

const BackgroundWrapper = ({ children, alignment = "start" }: Props) => {
  const getAlignmentStyle = () => {
    switch (alignment) {
      case "center":
        return tw`justify-center`;
      case "end":
        return tw`justify-end`;
      default:
        return tw`justify-start`;
    }
  };

  return (
    <>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <ImageBackground
        source={require("../../assets/images/signinbg.jpg")}
        resizeMode="cover"
        style={tw`flex-1`}
      >
        <LinearGradient
          colors={["rgba(29, 215, 224, 0.8)", "rgba(215, 166, 203, 0.8)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.3, y: 0.9 }}
          style={tw`absolute top-0 left-0 right-0 bottom-0`}
        >
          <View style={[tw`flex-1`, getAlignmentStyle()]}>
            {children}
          </View>
        </LinearGradient>
      </ImageBackground>
    </>
  );
};

export default BackgroundWrapper;
