import { useEffect } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import { FontAwesome } from '@expo/vector-icons'; // Use the icon from Expo
import AnimatedArrowPropsType from "@/types/AnimtedArrowPropsTypes";

const AnimatedArrow = ({ disabled }: AnimatedArrowPropsType) => {
    // Shared value for the bouncing effect
    const bounce = useSharedValue(0);

    // Animation: Moves the arrow up and down
    useEffect(() => {
        if (disabled) {
            bounce.value = 0; // Stop the animation when disabled
        } else {
            bounce.value = withRepeat(
                withSequence(
                    withTiming(6, { duration: 500 }), // Move up
                    withTiming(0, { duration: 500 })   // Move down
                ),
                8, // Infinite loop
                true // Reverse direction for continuous bounce effect
            );
        }
    }, [disabled]); // Re-run this effect whenever the disabled prop changes

    // Animated style
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: bounce.value }],
    }));

    return (
        <Animated.View
            style={[
                {
                    position: "absolute", // Ensure it's positioned absolutely
                    top: 40, // Adjust to position above the TextInput (you can tweak this)
                    left: "85%", // Center the arrow horizontally
                    zIndex: 10, // Ensure it's above other components
                },
                animatedStyle,
            ]}
        >
            <FontAwesome
                name="arrow-up"
                size={60}
                color="green"
            /> {/* Use the arrow icon */}
        </Animated.View>
    );
};

export default AnimatedArrow;
