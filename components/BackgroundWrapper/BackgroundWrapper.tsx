import tw from "@/lib/tailwind";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";


type Props = {
    children: ReactNode;
    alignment?: 'start' | 'center' | 'end';
};

const BackgroundWrapper = ({ children, alignment = 'start' }: Props) => {
    return (
        <KeyboardAwareScrollView contentContainerStyle={tw`flex-1`} >
            <StatusBar style="dark" translucent backgroundColor="transparent" />
            <ImageBackground
                source={require('../../assets/images/signinbg.jpg')} // Make sure the path is correct
                resizeMode="cover"
                style={tw`flex-1`}
            >
                <LinearGradient
                    colors={['rgba(29, 215, 224, 0.8)', 'rgba(215, 166, 203, 0.8)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.3, y: 0.9 }}
                    style={tw`absolute top-0 left-0 right-0 bottom-0`}
                >
                    <SafeAreaView style={tw`flex-1 justify-${alignment} items-center`}>
                        {children}
                    </SafeAreaView>
                </LinearGradient>
            </ImageBackground>
        </KeyboardAwareScrollView >
    )
};

export default BackgroundWrapper;