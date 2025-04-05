import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    FlatList,
    Keyboard,
    Image, // Import Image for displaying the icon
    Animated, // Import Animated API
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';
import Button from '@/components/Button'; // Make sure this path is correct
import { SUBJECTS, Subject } from '../../constants/subject'; // Correct the import path here

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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={tw`flex-1`}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                    />

                    <SafeAreaView style={tw`flex-1 px-6 py-10`}>
                        <Text style={tw`text-3xl font-bold text-yellow-600 text-center mb-4`}>
                            Choose Your Subject
                        </Text>

                        {/* Animated PNG image below the title */}
                        <View style={tw`items-center mb-8`}>
                            <Animated.Image
                                source={require('../../assets/icons/Science.png')} // Replace with your PNG image path
                                style={[
                                    tw`w-28 h-28`, // Size of the PNG image
                                    { transform: [{ scale: scaleAnim }] }, // Applying scale animation
                                ]}
                            />
                        </View>

                        <View style={tw`flex-1 justify-center items-center`}>
                            <FlatList
                                data={SUBJECTS}
                                renderItem={renderSubjectItem}
                                keyExtractor={(item) => item.id}
                                contentContainerStyle={tw`pb-4`}
                                ListEmptyComponent={
                                    <Text style={tw`text-center text-lg text-gray-500`}>
                                        No subjects available yet
                                    </Text>
                                }
                            />

                            <View style={tw`mt-4 w-full`}>
                                <Button
                                    title="Continue"
                                    showAnimatedHand={true}
                                    onPress={() => { }}
                                    disabled={false}
                                />
                            </View>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
