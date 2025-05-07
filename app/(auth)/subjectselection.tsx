import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated,
    ScrollView,
} from 'react-native';
import tw from 'twrnc';
import Button from '@/components/Button';
import { SUBJECTS, Subject } from '../../constants/subject';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { router } from 'expo-router';
import { useLoader } from '@/context/LoaderContext';
import { SoundManager } from '@/hooks/SoundManager';
import { VOICE_STYLES } from '@/constants/voicePresets';
import { MusicManager } from '@/hooks/MusicManager';
import MusicLayout from '@/components/MusicLayout';
import { playClickSound } from '@/hooks/buttonPopSound';

export default function SubjectSelection() {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [scaleAnim]);

    useEffect(() => {
        SoundManager.speak({
            text: "Welcome to Learning Programs!",
            style: VOICE_STYLES.funKid,
        });
    }, []);

    const renderSubjectItem = ({ item, index }: { item: Subject; index: number }) => {

        const handlePress = async () => {
            playClickSound();
        };

        return (
            <TouchableOpacity
                style={tw`flex-row items-center justify-between bg-${item.color}-100 border-2 border-${item.color}-300 rounded-3xl p-3 mb-4 opacity-100`}
                activeOpacity={0.8}
                key={index}
                disabled={item.comingSoon}
                onPress={handlePress}
            >
                <View style={tw`flex-row items-center`}>
                    {item.icon && (
                        <View style={tw`bg-${item.color}-400 p-3 rounded-full mr-4`}>
                            <Image
                                source={item.icon}
                                style={tw`w-6 h-6`}
                                resizeMode='contain'
                            />
                        </View>
                    )}
                    <View style={tw`flex-1`}>
                        <View style={tw`flex-row items-center justify-between`}>
                            <Text style={tw`text-lg font-bold ${item.comingSoon ? 'text-gray-500' : 'text-gray-800'}`}>
                                {item.name}
                            </Text>
                            {item.comingSoon && (
                                <Text style={tw`text-xs text-${item.color}-500`}>
                                    (Coming Soon)
                                </Text>
                            )}
                        </View>
                        <Text
                            style={tw`text-gray-600 flex-wrap text-xs italic`}
                            numberOfLines={3}
                        >
                            {item.description}
                        </Text>

                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const handleNext = async () => {
        showLoader();
        try {
            await MusicManager.fadeOutAndStop();
            await new Promise(resolve => setTimeout(resolve, 3500));
            router.navigate('/(auth)/success');
        } catch (error) {
            console.error("Navigation error:", error);
        } finally {
            hideLoader();
        }
    };

    return (
        <MusicLayout musicKey="landing">
            <BackgroundWrapper>
                <ScrollView contentContainerStyle={tw`w-full items-center pb-40`} showsVerticalScrollIndicator={false}>
                    <View style={tw`items-center mb-8 mt-12`}>
                        <Animated.Image
                            source={require('../../assets/icons/Science.png')}
                            style={[
                                tw`w-32 h-32`,
                                { transform: [{ scale: scaleAnim }] },
                            ]}
                        />
                    </View>

                    <View style={tw`justify-center items-center w-11/12`}>
                        <Text style={tw`text-3xl font-bold text-yellow-600 text-center mb-4`}>
                            Learning Programs
                        </Text>
                        {SUBJECTS?.map((item, index) => renderSubjectItem({ item, index }))}
                    </View>
                </ScrollView>

                <View style={tw`absolute bottom-10 w-full`}>
                    <Button
                        title="Next"
                        onPress={handleNext}
                        showAnimatedHand={true}
                    />
                </View>
            </BackgroundWrapper>
        </MusicLayout>
    );
}
