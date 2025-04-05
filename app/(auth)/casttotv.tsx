import BackgroundWrapper from "@/components/BackgroundWrapper"
import Button from "@/components/Button";
import tw from "@/lib/tailwind";
import { router } from "expo-router";
import { Text, View } from "react-native";

const CastToTV = () => {
  return (
    <BackgroundWrapper>
      <Text>Cast To TV</Text>

      <View style={tw`absolute bottom-10 w-full`}>
        <Button
          title="Next"
          showAnimatedHand={true}
          onPress={()=> router.navigate('/(auth)/success')}
        />
      </View>
    </BackgroundWrapper>
  )
};

export default CastToTV;