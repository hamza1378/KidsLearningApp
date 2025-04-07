import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image, // Import Image for displaying the icon
    Animated, // Import Animated API
} from 'react-native';
import tw from 'twrnc';
import Button from '@/components/Button'; // Make sure this path is correct
import { SUBJECTS, Subject } from '../../constants/subject'; // Correct the import path here
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { router } from 'expo-router';

export default function SubjectSelection() {
    // Animated value for scaling
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Animation loop (scale up and down)
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.1, // Scale up
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1, // Scale down
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [scaleAnim]);

    const renderSubjectItem = ({ item, index }: { item: Subject; index: number }) => {
        return (
            <TouchableOpacity
                style={tw`flex-row items-center justify-between bg-${item.color}-100 border-4 border-${item.color}-300 rounded-3xl p-6 mb-4 opacity-100`}
                activeOpacity={0.8}
                key={index}
            >
                <View style={tw`flex-row items-center`}>
                    {/* Render the PNG icon with dynamic background color */}
                    {item.icon && (
                        <View style={tw`bg-${item.color}-400 p-3 rounded-full mr-4`}>
                            <Image
                                source={item.icon}
                                style={tw`w-10 h-10`}
                                resizeMode='contain'
                            />
                        </View>
                    )}
                    <View style={tw`flex-1`}>
                        <Text style={tw`text-2xl font-bold text-gray-700`}>
                            {item.name}
                            {item.comingSoon && (
                                <Text style={tw`text-xs text-${item.color}-500 ml-2`}>
                                    (Coming Soon)
                                </Text>
                            )}
                        </Text>
                        <Text
                            style={tw`text-gray-600 flex-wrap`}
                            numberOfLines={3}
                        >
                            {item.description}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };


    return (
        <BackgroundWrapper>
            {/* Animated PNG image below the title */}
            <View style={tw`items-center mb-8 mt-12`}>
                <Animated.Image
                    source={require('../../assets/icons/Science.png')} // Replace with your PNG image path
                    style={[
                        tw`w-32 h-32`, // Size of the PNG image
                        { transform: [{ scale: scaleAnim }] }, // Applying scale animation
                    ]}
                />
            </View>

            <View style={tw`
                        justify-center items-center w-11/12`}>
                <Text style={tw`text-3xl font-bold text-yellow-600 text-center mb-4`}>
                    Choose Your Subject
                </Text>
                {
                    SUBJECTS?.map((item, index) => renderSubjectItem({ item, index }))
                }
            </View>
            <View style={tw`absolute bottom-10 w-full`}>
                <Button
                    title="Next"
                    onPress={()=> router.navigate('/(auth)/avatarcustomization')}
                    showAnimatedHand={true}
                />
            </View>
        </BackgroundWrapper>
    );
}
