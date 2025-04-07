import { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    Animated,
    Easing
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
    const [isArrowDisabled, setIsArrowDisabled] = useState(false);
    const [displayedText, setDisplayedText] = useState(""); // ✅ Typewriter state
    const isNickNameValid = nickName.length >= 3;

    const bounceAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const slideInputAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        playVoice({
            text: "enter your nick name"
        });

        // Balloon floating animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceAnim, {
                    toValue: -10,
                    duration: 1000,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.ease)
                }),
                Animated.timing(bounceAnim, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.ease)
                })
            ])
        ).start();

        // Balloon wiggle animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true
                }),
                Animated.timing(rotateAnim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true
                })
            ])
        ).start();

        // Slide-up input animation
        Animated.timing(slideInputAnim, {
            toValue: 0,
            duration: 800,
            delay: 500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();

        // ✅ Fixed Typewriter Effect
        const fullText = "Enter Your Nick Name";
        let currentIndex = 0;
        setDisplayedText(""); // Clear before typing

        const interval = setInterval(() => {
            setDisplayedText(fullText.slice(0, currentIndex + 1));
            currentIndex++;
            if (currentIndex === fullText.length) {
                clearInterval(interval);
            }
        }, 50); // Typing speed

        return () => clearInterval(interval);
    }, []);

    const handleLogin = () => {
        if (isNickNameValid) {
            router.push("/(auth)/securityquestions");
        }
    };

    const handleFocus = () => {
        setIsArrowDisabled(true);
    };

    const handleBlur = () => {
        setIsArrowDisabled(false);
    };

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["-3deg", "3deg"]
    });

    return (
        <BackgroundWrapper>
            {/* Animated Balloon with wiggle */}
            <Animated.View
                style={[
                    tw`flex-row items-center justify-center mb-4 mt-14`,
                    {
                        transform: [
                            { translateY: bounceAnim },
                            { rotate: rotateInterpolate }
                        ]
                    }
                ]}
            >
                <BalloonIcon width={150} height={150} />
            </Animated.View>

            <View style={tw`w-full items-center mt-16`}>
                {/* ✅ Typewriter Animated Text */}
                <Text style={tw`text-3xl font-bold mb-1 mt-4 text-yellow-600`}>
                    {displayedText}
                </Text>

                <Animated.View
                    style={[
                        tw`w-full relative px-6`,
                        { transform: [{ translateY: slideInputAnim }] }
                    ]}
                >
                    <TextInput
                        placeholder="e.g Chief"
                        value={nickName}
                        onChangeText={setNickName}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        style={tw`border-4 border-blue-400 rounded-full bg-yellow-100 px-4 py-4 font-bold text-2xl text-gray-600`}
                        numberOfLines={1}
                        multiline={false}
                        returnKeyType="done"
                    />
                </Animated.View>
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
