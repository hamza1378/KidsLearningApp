import { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    ImageBackground
} from "react-native";
import { useRouter } from "expo-router";
import tw from "twrnc";
import { Keyboard as RNKeyboard } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import BalloonIcon from "../../assets/images/balloon.svg";
import Slider from "@react-native-community/slider";

export default function LoginScreen() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [age, setAge] = useState(18);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showListener = RNKeyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
        const hideListener = RNKeyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));

        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);

    return (
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
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
                style={tw`flex-1`}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={tw`flex-1`}>
                        <ScrollView
                            contentContainerStyle={tw`flex-grow justify-center items-center px-6`}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >
                            {/* SVG Icon Above the Text */}
                            <BalloonIcon width={150} height={150} style={tw`mb-3`} />

                            <Text style={tw`text-3xl font-bold mb-1 mt-4 text-yellow-600`}>
                                Enter Your Name
                            </Text>

                            <View style={tw`w-full`}>
                                <TextInput
                                    placeholder="Enter your name..."
                                    value={name}
                                    onChangeText={setName}
                                    style={[
                                        tw`border-2 border-blue-400 rounded-xl bg-yellow-100 px-4 py-3 w-full text-lg text-black`,
                                        { height: 50, textAlignVertical: "center" },
                                    ]}
                                    numberOfLines={1}
                                    multiline={false}
                                    returnKeyType="done"
                                />
                            </View>

                            {/* Age Selector */}
                            <Text style={tw`text-3xl font-bold text-yellow-600 mt-6`}>Select Your Age</Text>

                            <View style={tw`w-full items-center mt-3`}>
                                <Slider
                                    style={tw`w-70`}
                                    minimumValue={0}
                                    maximumValue={100}
                                    step={1}
                                    value={age}
                                    minimumTrackTintColor="#1dd7e0"
                                    maximumTrackTintColor="#ddd"
                                    thumbTintColor="#8ba0ff"
                                    onValueChange={(value) => setAge(value)}
                                />
                                <Text style={tw`text-xl font-bold text-green-600 mt-1`}>
                                    Age: {age}
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => router.push('/(auth)/signin')}
                                style={tw`rounded-full mx-8 mt-8 border-4 border-yellow-500 bg-blue-400`}
                            >
                                <LinearGradient
                                    colors={["#8ba0ff", "#1dd7e0"]}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={tw`py-2 px-8 rounded-full items-center`}
                                >
                                    <Animatable.Text
                                        animation="pulse"
                                        iterationCount="infinite"
                                        duration={1000}
                                        style={tw`text-center font-bold text-2xl text-yellow-300`}
                                    >
                                        Let's Go
                                    </Animatable.Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}
