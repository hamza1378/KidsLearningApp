import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Alert,
    Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { router } from 'expo-router';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import MusicLayout from '@/components/MusicLayout';
import { SoundManager } from '@/hooks/SoundManager';
import { VOICE_STYLES } from '@/constants/voicePresets';
import { useLoader } from '@/context/LoaderContext';
import { playClickSound } from '@/hooks/buttonPopSound';
import * as Animatable from 'react-native-animatable';

export default function QRScanner() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);
    const [isScanning, setIsScanning] = useState(true);
    const { showLoader, hideLoader } = useLoader();
    
    // Animation refs
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const scanLineAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Voice prompt
        SoundManager.speak({
            text: "Point your camera at a QR code to scan!",
            style: VOICE_STYLES.funKid,
        });

        // Simulate permission check
        setTimeout(() => {
            setHasPermission(true);
        }, 1000);

        // Start pulse animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Start scan line animation
        Animated.loop(
            Animated.timing(scanLineAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const handleScan = async () => {
        if (scanned) return;
        
        setScanned(true);
        setIsScanning(false);
        
        // Play success sound
        await playClickSound();
        
        // Voice feedback
        SoundManager.speak({
            text: "QR code detected! Opening content...",
            style: VOICE_STYLES.funKid,
        });

        showLoader();
        
        try {
            // Simulate processing time
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Navigate to video player with scanned data
            router.push({
                pathname: '/video-player',
                params: { qrData: 'scanned-qr-data-' + Date.now() }
            });
        } catch (error) {
            console.error('Navigation error:', error);
            Alert.alert('Error', 'Failed to open content. Please try again.');
        } finally {
            hideLoader();
        }
    };

    const handleRetry = async () => {
        await playClickSound();
        setScanned(false);
        setIsScanning(true);
        
        SoundManager.speak({
            text: "Ready to scan again!",
            style: VOICE_STYLES.funKid,
        });
    };

    if (hasPermission === null) {
        return (
            <MusicLayout musicKey="landing" screenId="qr-scanner-loading">
                <BackgroundWrapper>
                    <View style={tw`flex-1 justify-center items-center`}>
                        <Animatable.View animation="pulse" iterationCount="infinite">
                            <Ionicons name="camera" size={80} color="#1dd7e0" />
                        </Animatable.View>
                        <Text style={tw`text-xl font-bold text-yellow-600 mt-4`}>
                            Initializing Scanner...
                        </Text>
                    </View>
                </BackgroundWrapper>
            </MusicLayout>
        );
    }

    if (hasPermission === false) {
        return (
            <MusicLayout musicKey="landing" screenId="qr-scanner-permission">
                <BackgroundWrapper>
                    <View style={tw`flex-1 justify-center items-center px-8`}>
                        <Animatable.View animation="shake" iterationCount="infinite">
                            <Ionicons name="close-circle" size={80} color="#ff6b6b" />
                        </Animatable.View>
                        <Text style={tw`text-2xl font-bold text-yellow-600 mt-4 text-center`}>
                            Scanner Unavailable
                        </Text>
                        <Text style={tw`text-gray-600 mt-2 text-center`}>
                            Camera access is required for QR scanning. Please try again later.
                        </Text>
                    </View>
                </BackgroundWrapper>
            </MusicLayout>
        );
    }

    return (
        <MusicLayout musicKey="landing" screenId="qr-scanner-screen">
            <BackgroundWrapper>
                <SafeAreaView style={tw`flex-1`}>
                    {/* Header */}
                    <View style={tw`flex-row items-center justify-center p-4`}>
                        <Text style={tw`text-2xl font-bold text-yellow-600`}>
                            QR Scanner 📱
                        </Text>
                    </View>

                    {/* Camera View */}
                    <View style={tw`flex-1 mx-4 mb-4 rounded-3xl overflow-hidden bg-black`}>
                        {/* Camera Preview */}
                        <View style={tw`flex-1 bg-gray-900 justify-center items-center`}>
                            <Ionicons name="camera" size={100} color="#666" />
                            <Text style={tw`text-gray-400 text-lg mt-4`}>
                                Camera Preview
                            </Text>
                        </View>

                        {/* Scan Overlay */}
                        <View style={tw`absolute inset-0 justify-center items-center`}>
                            {/* Scan Frame */}
                            <Animated.View
                                style={[
                                    tw`w-64 h-64 border-4 border-yellow-400 rounded-3xl`,
                                    { transform: [{ scale: pulseAnim }] }
                                ]}
                            >
                                {/* Corner Indicators */}
                                <View style={tw`absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-yellow-400`} />
                                <View style={tw`absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-yellow-400`} />
                                <View style={tw`absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-yellow-400`} />
                                <View style={tw`absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-yellow-400`} />
                                
                                {/* Scanning Line */}
                                <Animated.View
                                    style={[
                                        tw`absolute left-0 right-0 h-1 bg-yellow-400`,
                                        {
                                            transform: [{
                                                translateY: scanLineAnim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [0, 240]
                                                })
                                            }]
                                        }
                                    ]}
                                />
                            </Animated.View>
                        </View>

                        {/* Instructions */}
                        <View style={tw`absolute bottom-8 left-0 right-0 items-center`}>
                            <Animatable.Text
                                animation="fadeIn"
                                iterationCount="infinite"
                                style={tw`text-white text-lg font-bold text-center bg-black bg-opacity-50 px-4 py-2 rounded-xl`}
                            >
                                {isScanning ? "Tap to scan QR code" : "QR Code Detected!"}
                            </Animatable.Text>
                        </View>

                        {/* Scan Button */}
                        <TouchableOpacity
                            onPress={handleScan}
                            style={tw`absolute top-4 right-4 bg-yellow-500 px-4 py-2 rounded-xl`}
                        >
                            <Text style={tw`text-white font-bold`}>
                                Scan QR
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Action Buttons */}
                    {scanned && (
                        <View style={tw`px-4 pb-4`}>
                            <TouchableOpacity
                                style={tw`bg-yellow-500 py-4 rounded-xl items-center`}
                                onPress={handleRetry}
                            >
                                <Text style={tw`text-white font-bold text-xl`}>
                                    Scan Another QR Code
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </SafeAreaView>
            </BackgroundWrapper>
        </MusicLayout>
    );
} 