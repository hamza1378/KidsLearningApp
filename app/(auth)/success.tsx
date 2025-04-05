import BackgroundWrapper from "@/components/BackgroundWrapper"
import Button from "@/components/Button";
import tw from "@/lib/tailwind";
import { router } from "expo-router";
import { Text, View } from "react-native";

const AvatarCustomization = () => {
  return (
    <BackgroundWrapper>
      <Text>Success</Text>

      <View style={tw`absolute bottom-10 w-full`}>
        <Button
          title="Go To Dashboard"
          showAnimatedHand={true}
          onPress={()=> router.navigate('/(auth)/casttotv')}
        />
      </View>
    </BackgroundWrapper>
  )
};

export default AvatarCustomization;