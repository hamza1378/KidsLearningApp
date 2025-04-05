import { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import tw from "twrnc";
import BalloonIcon from "../../assets/images/balloon.svg";
import { playVoice } from "@/hooks/playVoice";
import Button from '@/components/Button';
import PencilIcons from "../../assets/images/pencils.svg";
import BackgroundWrapper from "@/components/BackgroundWrapper";

export default function LoginScreen() {
    const router = useRouter();
    const [nickName, setNickName] = useState("");
    const [isArrowDisabled, setIsArrowDisabled] = useState(false); // State to control arrow visibility
    const isNickNameValid = nickName.length >= 3;

    useEffect(() => {
        playVoice({
            text: "enter your nick name"
        });
    }, []);

    const handleLogin = () => {
        if (isNickNameValid) {
            router.push("/(auth)/securityquestions");
        }
    };

    const handleFocus = () => {
        setIsArrowDisabled(true); // Disable arrow (hide it) when TextInput is focused
    };

    const handleBlur = () => {
        setIsArrowDisabled(false); // Re-enable arrow (show it) when TextInput loses focus
    };

    return (
        <BackgroundWrapper>
            {/* Icons Row */}
            <View style={tw`flex-row items-center justify-center mb-4 mt-14`}>
                <BalloonIcon width={150} height={150} />
            </View>

            <View style={tw`w-full items-center mt-16`}>
                <Text style={tw`text-3xl font-bold mb-1 mt-4 text-yellow-600`}>
                    Enter Your Nick Name
                </Text>


                <View style={tw`w-full relative px-6`}>
                    {/* Input Field */}
                    <TextInput
                        placeholder="e.g Chief"
                        value={nickName}
                        onChangeText={setNickName}
                        onFocus={handleFocus} // Triggered when the TextInput is focused
                        onBlur={handleBlur}   // Triggered when the TextInput loses focus
                        style={tw`border-4 border-blue-400 rounded-full bg-yellow-100 px-4 py-4 font-bold text-2xl text-gray-600`}
                        numberOfLines={1}
                        multiline={false}
                        returnKeyType="done"
                    />
                </View>
            </View>

            <View style={tw`absolute bottom-10 w-full`}>
                <Button
                    title="Next"
                    disabled={!isNickNameValid}
                    showAnimatedHand={isNickNameValid}
                    onPress={handleLogin}
                />
            </View>
        </BackgroundWrapper>
    );
}
