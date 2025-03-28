import { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    Image,
    
} from "react-native";
import { useRouter } from "expo-router";
import tw from "twrnc";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import BalloonIcon from "../../assets/images/balloon.svg";
import Checkbox from "expo-checkbox";

export default function LoginScreen() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [isChecked, setChecked] = useState(false);
    const [showCheckbox, setShowCheckbox] = useState(false);

    const handleNameChange = (text: string) => {
        setName(text);
    };

    useEffect(() => {
        if (name.length >= 3) {
            setShowCheckbox(true);
            setTimeout(() => {
                setChecked(true);
            }, 500);
        } else {
            setShowCheckbox(false);
            setChecked(false);
        }
    }, [name]);

    const handleLogin = () => {
        if (name.length >= 3 && isChecked) {
            router.push("/(auth)/securityquestions");
        }
    };

    const isButtonDisabled = name.length < 3 || !isChecked;

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

            
                <View style={tw`flex-1 justify-center`}>
                    <ScrollView
                        contentContainerStyle={tw`flex-1 justify-center items-center`}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <BalloonIcon width={150} height={150} style={tw`mb-4`} />

                        <Text style={tw`text-3xl font-bold mb-1 mt-4 text-yellow-600`}>
                            Enter Your Nick Name
                        </Text>

                        <View style={tw`w-full mt-3 px-6`}>
                            <TextInput
                                placeholder="Enter your name..."
                                value={name}
                                onChangeText={handleNameChange}
                                style={tw`border-4 border-blue-400 rounded-full bg-yellow-100 px-4 py-4 font-bold text-3xl text-gray-600`}
                                numberOfLines={1}
                                multiline={false}
                                returnKeyType="done"
                            />
                        </View>

                        {showCheckbox && (
                            <Animatable.View
                                animation="fadeInUp"
                                duration={500}
                                style={tw`flex-row items-center mt-4`}
                            >
                                <Checkbox
                                    value={isChecked}
                                    onValueChange={setChecked}
                                    color={isChecked ? "#1dd7e0" : undefined}
                                />
                                <Text style={tw`ml-2 text-gray-700 text-lg`}>
                                    name typing requirement done ✅
                                </Text>
                            </Animatable.View>
                        )}

                        <TouchableOpacity
                            onPress={handleLogin}
                            disabled={isButtonDisabled}
                            style={tw`rounded-full mt-6 border-4 ${isButtonDisabled ? "border-gray-400 bg-gray-300" : "border-yellow-500 bg-blue-400"
                                }`}
                        >
                            <LinearGradient
                                colors={isButtonDisabled ? ["#b4b3b2", "#a0a0a0"] : ["#8ba0ff", "#1dd7e0"]}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={tw`py-3 w-40 rounded-full items-center`}
                            >
                                <Animatable.Text
                                    animation="pulse"
                                    iterationCount="infinite"
                                    duration={1000}
                                    style={tw`text-center font-bold text-2xl ${isButtonDisabled ? "text-gray-300" : "text-yellow-300"
                                        }`}
                                >
                                    Let's Go
                                </Animatable.Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {!isButtonDisabled && (
                            <Animatable.View
                                animation={{
                                    0: { translateY: 10 },
                                    0.5: { translateY: -5 },
                                    1: { translateY: 10 }
                                }}
                                iterationCount="infinite"
                                duration={1500}
                                easing="ease-in-out"
                                style={tw`absolute right-16 bottom-40`}
                            >
                                <Image
                                    source={require("../../assets/images/hand-pointer.png")}
                                    style={{ width: 60, height: 60, resizeMode: "contain" }}
                                />
                            </Animatable.View>
                        )}
                    </ScrollView>
                </View>
            
        </ImageBackground>
    );
}