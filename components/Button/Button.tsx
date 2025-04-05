import tw from '@/lib/tailwind';
import { router } from 'expo-router';
import React from 'react';
import {
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import ButtonPropsType from '@/types/ButtonPropsTypes';
import Colors from '@/constants/Colors';

const Button = ({
    title = '',
    showAnimatedHand = false,
    onPress = () => { },
    disabled = false,
    size = 'medium',
}: ButtonPropsType) => {
    return (
        <View
            style={tw`justify-center mx-auto ${size === 'small' ? 'w-1/2' : 'w-4/5'}`}
        >
            {/* Get Started Button */}
            <TouchableOpacity
                onPress={onPress}
                style={tw`rounded-xl border-4 ${disabled ? 'border-gray-400' : 'border-yellow-500'} overflow-hidden`}
            >
                <LinearGradient
                    colors={disabled ? [Colors.disabled, Colors.disabled] : ["#8ba0ff", "#1dd7e0"]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={tw`py-4 rounded-xl items-center`}
                >
                    <Animatable.Text
                        animation={disabled ? '' : 'pulse'}
                        iterationCount="infinite"
                        duration={1000}
                        style={tw`text-center font-bold text-2xl ${disabled ? 'text-white' : 'text-yellow-300'}`}
                    >
                        {title}
                    </Animatable.Text>
                </LinearGradient>
            </TouchableOpacity>

            {/* Animated Cursor Pointer */}
            {
                showAnimatedHand && (
                    <TouchableOpacity
                        onPress={onPress}
                    >
                        <Animatable.View
                            animation={{
                                0: { translateY: 10 },
                                0.5: { translateY: -5 },
                                1: { translateY: 10 },
                            }}
                            iterationCount="infinite"
                            duration={1500}
                            easing="ease-in-out"
                            style={tw`absolute right-0 bottom-0`}
                        >
                            <Image
                                source={require("../../assets/images/hand-pointer.png")}
                                style={{ width: 60, height: 60, resizeMode: "contain" }}
                            />
                        </Animatable.View>
                    </TouchableOpacity>
                )
            }
        </View>
    )
};

export default Button;