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
    Dimensions
} from "react-native";
import { useRouter } from "expo-router";
import tw from "twrnc";
import { Keyboard as RNKeyboard } from "react-native";
import WaveBackground from "../../assets/images/wavebackground.svg"; // Import SVG

const { width, height } = Dimensions.get("window"); // Get screen dimensions

export default function LoginScreen() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={tw`flex-1 bg-blue-300`}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={tw`flex-1 relative`}>
                    {/* Content */}
                    <ScrollView
                        contentContainerStyle={tw`flex-grow justify-center items-center px-6`}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={tw`text-3xl font-bold text-primary mb-6 mt-10`}>Register</Text>

                        <View style={tw`w-full`}>
                            <TextInput
                                placeholder="Enter Username"
                                value={username}
                                onChangeText={setUsername}
                                style={tw`border border-gray-300 rounded-lg px-4 py-3 w-full mb-4`}
                            />

                            <TextInput
                                placeholder="Enter Password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                style={tw`border border-gray-300 rounded-lg px-4 py-3 w-full mb-4`}
                            />

                            <TouchableOpacity style={tw`bg-primary px-6 py-3 rounded-lg w-full items-center`}>
                                <Text style={tw`text-white text-lg`}>Login</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text style={tw`text-primary mt-4 text-center`}>Don't have an account? Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                    {/* SVG Background - Always at Bottom & Full Width */}
                    {!keyboardVisible && (
                        <View style={[tw`absolute bottom-0 left-0`, { width: width, height: height * 0.25 }]}>
                            <WaveBackground width={width} height={height * 0.25} preserveAspectRatio="none" />
                        </View>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
