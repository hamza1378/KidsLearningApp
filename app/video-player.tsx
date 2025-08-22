import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Alert,
    Dimensions,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import tw from 'twrnc';
import { router, useLocalSearchParams } from 'expo-router';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { useLoader } from '@/context/LoaderContext';
import { playClickSound } from '@/hooks/buttonPopSound';
import * as Animatable from 'react-native-animatable';
import { MusicManager } from '@/hooks/MusicManager';

const { width } = Dimensions.get('window');

export default function VideoPlayer() {
    const { qrData, videoUrl, videoTitle, isLocalVideo } = useLocalSearchParams<{
        qrData: string;
        videoUrl?: string;
        videoTitle?: string;
        isLocalVideo?: string;
    }>();
    const [videoStatus, setVideoStatus] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { showLoader, hideLoader } = useLoader();
    const videoRef = useRef<Video>(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Stop background music when video starts
        const stopBackgroundAudio = async () => {
            try {
                await MusicManager.fadeOutAndStop();
            } catch (error) {
                // ignore
            }
        };
        stopBackgroundAudio();
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const handlePlayPause = async () => {
        await playClickSound();
        if (isPlaying) {
            await videoRef.current?.pauseAsync();
            setIsPlaying(false);
        } else {
            await videoRef.current?.playAsync();
            setIsPlaying(true);
        }
    };

    const handleBackPress = async () => {
        await playClickSound();
        router.back();
    };

    const handleVideoEnd = async () => {
        // Navigate to quiz after video ends
        router.push({
            pathname: '/quiz/quiz-screen',
            params: { 
                videoTitle: videoTitle || 'Educational Video',
                qrData: qrData || ''
            }
        });
    };

    const handleVideoLoad = () => {
        setIsLoading(false);
    };

    const handleVideoError = (error: any) => {
        setIsLoading(false);
        Alert.alert(
            'Video Error',
            'Failed to load video. Please try again.',
            [
                { text: 'OK', onPress: () => router.back() }
            ]
        );
    };

    // Get video source from params or fallback to sample video
    const getVideoSource = () => {
        if (videoUrl && isLocalVideo === 'true') {
            return parseInt(videoUrl);
        } else if (videoUrl) {
            return { uri: videoUrl };
        }
        return { uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' };
    };
    const videoSource = getVideoSource();

    // Status display helper
    const getStatusIcon = () => {
        if (videoStatus?.isPlaying) return <Ionicons name="play" size={18} color="#22c55e" style={{ marginRight: 4 }} />;
        if (videoStatus?.positionMillis > 0) return <Ionicons name="pause" size={18} color="#fbbf24" style={{ marginRight: 4 }} />;
        return <Ionicons name="lock-closed" size={18} color="#a1a1aa" style={{ marginRight: 4 }} />;
    };

    return (
            <BackgroundWrapper>
            <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                {/* Navbar/Header */}
                <View style={[styles.headerContainer, { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }]}>
                        <TouchableOpacity
                            onPress={handleBackPress}
                        style={styles.backButton}
                        >
                        <Ionicons name="arrow-back" size={22} color="#101519" />
                        </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <Text style={styles.headerTitle} numberOfLines={1}>
                            {videoTitle || 'Educational Video'}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.push({
                            pathname: '/cast-to-tv',
                            params: { 
                                videoTitle: videoTitle || 'Educational Video',
                                qrData: qrData || '',
                                mode: 'video'
                            }
                        })}
                        style={styles.castButton}
                    >
                        <Ionicons name="tv" size={20} color="#101519" />
                    </TouchableOpacity>
                </View>

                {/* Playful background shapes */}
                <View style={styles.bgShape1} />
                <View style={styles.bgShape2} />

                {/* Video Player Area - Centered */}
                <Animated.View style={[styles.videoContainer, { opacity: fadeAnim }]}> 
                        {isLoading && (
                        <View style={styles.loadingContainer}>
                                <Animatable.View animation="pulse" iterationCount="infinite">
                                <MaterialIcons name="slow-motion-video" size={60} color="#38bdf8" />
                                </Animatable.View>
                            <Text style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: 18, marginTop: 12 }}>Loading Video...</Text>
                            </View>
                        )}
                        <Video
                            ref={videoRef}
                        style={styles.video}
                        source={videoSource}
                            useNativeControls={true}
                            resizeMode={ResizeMode.CONTAIN}
                            isLooping={false}
                            onLoad={handleVideoLoad}
                            onError={handleVideoError}
                            onPlaybackStatusUpdate={(status) => {
                                setVideoStatus(status);
                                if ('didJustFinish' in status && status.didJustFinish) {
                                    handleVideoEnd();
                                }
                            }}
                        />
                    </Animated.View>

                {/* Video Info Card - Directly below video */}
                <View style={styles.infoCard}> 
                    <View style={{ width: '100%', padding: 16 }}>
                        <Text style={styles.infoTitle}>{videoTitle || 'Educational Video'}</Text>
                        <Text style={styles.infoSubtitle}>Fun learning session for kids!</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                            {getStatusIcon()}
                            <Text style={{ color: '#5a748c', fontWeight: '600', fontSize: 14 }}>
                                {videoStatus?.isPlaying ? 'Playing' : videoStatus?.positionMillis > 0 ? 'Paused' : 'Ready'}
                            </Text>
                            {videoStatus?.durationMillis && (
                                <Text style={{ color: '#a1a1aa', fontSize: 13, marginLeft: 12 }}>
                                    Duration: {Math.floor((videoStatus.durationMillis || 0) / 1000)}s
                                </Text>
                            )}
                        </View>
                    </View>
                </View>

            </SafeAreaView>
            </BackgroundWrapper>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFE066',
        borderRadius: 16,
        marginTop: 18,
        marginHorizontal: 14,
        marginBottom: 18,
        minHeight: 56,
        paddingVertical: 8,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#FFD700',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        shadowColor: '#FFD700',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.10,
        shadowRadius: 3,
        elevation: 1,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#101519',
        letterSpacing: 0.2,
        fontFamily: 'System',
    },
    bgShape1: {
        position: 'absolute',
        top: 0,
        left: -40,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#bae6fd',
        opacity: 0.18,
        zIndex: -1,
    },
    bgShape2: {
        position: 'absolute',
        bottom: 0,
        right: -30,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#fbbf24',
        opacity: 0.13,
        zIndex: -1,
    },
    videoContainer: {
        width: width,
        height: width * 0.56,
        backgroundColor: '#000', // Set to black for YouTube-like effect
        borderRadius: 0,
        marginBottom: 0, // Remove space below video
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
    },
    video: {
        width: '100%',
        height: '100%',
        borderRadius: 0,
        backgroundColor: 'transparent',
    },
    playPauseOverlay: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -32 }, { translateY: -32 }],
        backgroundColor: 'rgba(0,0,0,0.35)',
        borderRadius: 32,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        backgroundColor: 'rgba(0,0,0,0.12)',
    },
    infoCard: {
        backgroundColor: '#fff',
        width: '100%',
        padding: 18,
        paddingTop: 0, // Remove extra space at the top
        shadowColor: '#bae6fd',
        shadowOpacity: 0.10,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        marginTop: 0, // Remove space above info card
        alignItems: 'center',
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#101519',
        marginBottom: 4,
    },
    infoSubtitle: {
        fontSize: 14,
        color: '#5a748c',
        marginBottom: 2,
    },
    castButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#FFD700',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12,
        shadowColor: '#FFD700',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.10,
        shadowRadius: 3,
        elevation: 1,
    },
}); 