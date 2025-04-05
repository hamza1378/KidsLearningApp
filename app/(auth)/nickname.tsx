import { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import tw from "twrnc";
import { LinearGradient } from "expo-linear-gradient";
import BalloonIcon from "../../assets/images/balloon.svg";
import { playVoice } from "@/hooks/playVoice";
import Button from '@/components/Button';
import PencilIcons from "../../assets/images/pencils.svg";
import AnimatedArrow from "@/components/AnimatedArrow";

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
        <LinearGradient
            colors={["rgba(29, 215, 224, 0.8)", "rgba(215, 166, 203, 0.8)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.3, y: 0.9 }}
            style={tw`flex-1 justify-center items-center`}
        >
            {/* Icons Row */}
            <View style={tw`flex-row items-center justify-center mb-4`}>
                <BalloonIcon width={130} height={130} style={tw`mr-8`} />
                <PencilIcons width={130} height={130} />
            </View>

            <Text style={tw`text-3xl font-bold mb-1 mt-4 text-yellow-600`}>
                Enter Your Nick Name
            </Text>

            <View style={tw`w-full relative px-6`}>
                {/* Conditionally render the AnimatedArrow based on focus state */}
                {!isArrowDisabled && <AnimatedArrow disabled={isArrowDisabled} />} {/* Hide arrow when focused */}

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

            <View style={tw`absolute bottom-10 w-full`}>
                <Button
                    title="Next"
                    disabled={!isNickNameValid}
                    showAnimatedHand={isNickNameValid}
                    onPress={handleLogin}
                />
            </View>

        </LinearGradient>
    );
}
