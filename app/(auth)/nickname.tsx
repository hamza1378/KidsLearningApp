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

import Button from '@/components/Button';

import BackgroundWrapper from "@/components/BackgroundWrapper";
import { useLoader } from "@/context/LoaderContext";  // Import the loader context
import MusicLayout from "@/components/MusicLayout";
import { MusicManager } from "@/hooks/MusicManager";
// ✅ Voice imports
import { SoundManager } from "@/hooks/SoundManager";
import { VOICE_MESSAGES, VOICE_STYLES } from "@/constants/voicePresets";


export default function LoginScreen() {
    const router = useRouter();
    const { showLoader, hideLoader } = useLoader();  // Loader context hook
    const [nickName, setNickName] = useState("");

    const [displayedText, setDisplayedText] = useState(""); // ✅ Typewriter state
    const isNickNameValid = nickName.length >= 3;

    const bounceAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const slideInputAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
         // ✅ Play voice on mount
    SoundManager.speak({
        text: VOICE_MESSAGES.login,
        style: VOICE_STYLES.funKid,
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

    const handleLogin = async () => {
        if (isNickNameValid) {
            showLoader(); // Start loader

            try {
                 await MusicManager.fadeOutAndStop();
                await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate loading
                hideLoader();

                setTimeout(() => {
                    router.push("/(auth)/securityquestions"); 
                }, 100); 
            } catch (err) {
                hideLoader();
                console.error("Login error:", err);
            }
        }
    };

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["-3deg", "3deg"]
    });

    return (
        <MusicLayout musicKey="landing">
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
        </MusicLayout>
    );
}
