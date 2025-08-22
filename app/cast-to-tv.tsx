import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import tw from 'twrnc';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { playClickSound } from '@/hooks/buttonPopSound';
import { SoundManager } from '@/hooks/SoundManager';
import { VOICE_STYLES } from '@/constants/voicePresets';
import * as Animatable from 'react-native-animatable';
import TVInterface from '@/components/TVInterface';

const { width } = Dimensions.get('window');

interface TVDevice {
  id: string;
  name: string;
  type: 'chromecast' | 'airplay' | 'dlna' | 'miracast';
  isConnected: boolean;
  signalStrength: number;
}

// Sample TV devices - in real app, this would be discovered via network
const sampleTVDevices: TVDevice[] = [
  {
    id: '1',
    name: 'Living Room TV',
    type: 'chromecast',
    isConnected: false,
    signalStrength: 85,
  },
  {
    id: '2',
    name: 'Bedroom Smart TV',
    type: 'airplay',
    isConnected: false,
    signalStrength: 92,
  },
  {
    id: '3',
    name: 'Kitchen Display',
    type: 'dlna',
    isConnected: false,
    signalStrength: 78,
  },
  {
    id: '4',
    name: 'Study Room TV',
    type: 'miracast',
    isConnected: false,
    signalStrength: 88,
  },
];

export default function CastToTVScreen() {
  const { videoTitle, qrData, mode } = useLocalSearchParams<{
    videoTitle?: string;
    qrData?: string;
    mode?: 'video' | 'quiz';
  }>();
  
  const [devices, setDevices] = useState<TVDevice[]>(sampleTVDevices);
  const [isScanning, setIsScanning] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<TVDevice | null>(null);
  const [isAppMirroring, setIsAppMirroring] = useState(false);
  const [castMode, setCastMode] = useState<'video' | 'quiz'>(mode as 'video' | 'quiz' || 'video');

  useEffect(() => {
    // Voice prompt
    SoundManager.speak({
      text: "Choose a TV to cast your learning content!",
      style: VOICE_STYLES.funKid,
    });
  }, []);

  const handleScanDevices = async () => {
    await playClickSound();
    setIsScanning(true);
    
    SoundManager.speak({
      text: "Scanning for nearby TVs...",
      style: VOICE_STYLES.funKid,
    });

    // Simulate device discovery
    setTimeout(() => {
      setIsScanning(false);
      Alert.alert('Devices Found', `${devices.length} TV devices found!`);
    }, 3000);
  };

  const handleConnectToDevice = async (device: TVDevice) => {
    await playClickSound();
    
    // Disconnect from other devices
    const updatedDevices = devices.map(d => ({ ...d, isConnected: false }));
    setDevices(updatedDevices);
    
    // Connect to selected device
    const connectedDevices = updatedDevices.map(d => 
      d.id === device.id ? { ...d, isConnected: true } : d
    );
    setDevices(connectedDevices);
    setConnectedDevice(device);

    SoundManager.speak({
      text: `Connected to ${device.name}!`,
      style: VOICE_STYLES.funKid,
    });

    // Show success message with animation
    Alert.alert(
      '🎉 Connected Successfully!',
      `You're now connected to ${device.name}. Ready to cast your learning content!`,
      [
        { 
          text: 'Start Casting', 
          onPress: () => handleStartCasting()
        },
        { text: 'OK' }
      ]
    );
  };

  const handleDisconnect = async () => {
    await playClickSound();
    
    const updatedDevices = devices.map(d => ({ ...d, isConnected: false }));
    setDevices(updatedDevices);
    setConnectedDevice(null);

    SoundManager.speak({
      text: "Disconnected from TV!",
      style: VOICE_STYLES.funKid,
    });
  };

  const handleStartCasting = async () => {
    if (!connectedDevice) {
      Alert.alert('No Device Connected', 'Please connect to a TV first.');
      return;
    }

    await playClickSound();

    if (castMode === 'video') {
      // Navigate to video player with casting enabled
      router.push({
        pathname: '/video-player',
        params: {
          qrData: qrData || '',
          videoTitle: videoTitle || 'Educational Video',
          isCasting: 'true',
          deviceName: connectedDevice.name,
        }
      });
    } else {
      // Navigate to quiz with casting enabled
      router.push({
        pathname: '/quiz/quiz-screen',
        params: {
          videoTitle: videoTitle || 'Educational Video',
          qrData: qrData || '',
          isCasting: 'true',
          deviceName: connectedDevice.name,
        }
      });
    }
  };

  const handleStartAppMirroring = async () => {
    if (!connectedDevice) {
      Alert.alert('No Device Connected', 'Please connect to a TV first.');
      return;
    }

    await playClickSound();
    setIsAppMirroring(true);

    SoundManager.speak({
      text: `Starting app mirroring to ${connectedDevice.name}!`,
      style: VOICE_STYLES.funKid,
    });

    Alert.alert(
      '🎉 App Mirroring Started!',
      `Your entire app is now syncing to ${connectedDevice.name}. Use your phone as a remote control!`,
      [
        { 
          text: 'Stop Mirroring', 
          onPress: () => handleStopAppMirroring()
        },
        { text: 'OK' }
      ]
    );
  };

  const handleStopAppMirroring = async () => {
    await playClickSound();
    setIsAppMirroring(false);

    SoundManager.speak({
      text: "App mirroring stopped!",
      style: VOICE_STYLES.funKid,
    });

    Alert.alert('Mirroring Stopped', 'App mirroring has been disconnected.');
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'chromecast':
        return 'cast';
      case 'airplay':
        return 'airplane';
      case 'dlna':
        return 'wifi';
      case 'miracast':
        return 'phone-portrait';
      default:
        return 'tv';
    }
  };

  const getSignalStrengthColor = (strength: number) => {
    if (strength >= 80) return '#22c55e';
    if (strength >= 60) return '#fbbf24';
    return '#ef4444';
  };

  const getSignalStrengthText = (strength: number) => {
    if (strength >= 80) return 'Excellent';
    if (strength >= 60) return 'Good';
    return 'Poor';
  };

  return (
    <BackgroundWrapper>
      <SafeAreaView style={tw`flex-1`}>
        {/* Header */}
        <View style={tw`flex-row items-center justify-between p-4`}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={tw`bg-white bg-opacity-20 p-3 rounded-full`}
          >
            <Ionicons name="arrow-back" size={24} color="#101519" />
          </TouchableOpacity>
                     <Text style={tw`text-xl font-bold text-yellow-600`}>
             Smart TV Sync 📺
           </Text>
          <View style={tw`w-12`} />
        </View>

                 {/* App Mirroring Options */}
         <View style={tw`px-4 mb-6`}>
           <View style={tw`bg-white rounded-2xl p-4 shadow-lg border border-blue-100`}>
             <Text style={tw`text-lg font-bold text-gray-800 mb-4`}>Sync Options</Text>
             <View style={tw`space-y-3`}>
               <TouchableOpacity
                 onPress={handleStartAppMirroring}
                 disabled={!connectedDevice || isAppMirroring}
                 style={[
                   tw`py-4 rounded-xl items-center`,
                   isAppMirroring 
                     ? tw`bg-green-100 border-2 border-green-300` 
                     : connectedDevice 
                       ? tw`bg-gradient-to-r from-purple-500 to-blue-600` 
                       : tw`bg-gray-100`,
                 ]}
               >
                 <View style={tw`flex-row items-center justify-center`}>
                   <Ionicons 
                     name="phone-portrait" 
                     size={24} 
                     color={isAppMirroring ? '#22c55e' : connectedDevice ? 'white' : '#6b7280'} 
                   />
                   <Text 
                     style={[
                       tw`ml-3 font-bold text-xl`,
                       { color: isAppMirroring ? '#22c55e' : connectedDevice ? 'white' : '#6b7280' }
                     ]}
                   >
                     {isAppMirroring ? 'App Syncing...' : 'Sync Entire App'}
                   </Text>
                 </View>
                 <Text 
                   style={[
                     tw`text-center mt-2 text-sm`,
                     { color: isAppMirroring ? '#22c55e' : connectedDevice ? 'rgba(255,255,255,0.8)' : '#6b7280' }
                   ]}
                 >
                   {isAppMirroring ? 'Your app is running on TV!' : 'Mirror entire app to TV'}
                 </Text>
               </TouchableOpacity>

               {isAppMirroring && (
                 <TouchableOpacity
                   onPress={handleStopAppMirroring}
                   style={tw`py-3 rounded-xl items-center bg-red-100 border-2 border-red-300`}
                 >
                   <View style={tw`flex-row items-center justify-center`}>
                     <Ionicons name="stop-circle" size={20} color="#ef4444" />
                     <Text style={tw`ml-2 font-bold text-lg text-red-600`}>
                       Stop Mirroring
                     </Text>
                   </View>
                 </TouchableOpacity>
               )}
             </View>
           </View>
         </View>

        {/* Content Info */}
        {videoTitle && (
          <View style={tw`px-4 mb-6`}>
            <View style={tw`bg-white rounded-2xl p-4 shadow-lg border border-green-100`}>
              <View style={tw`flex-row items-center`}>
                <Ionicons name="information-circle" size={24} color="#22c55e" />
                <Text style={tw`text-lg font-bold text-gray-800 ml-2`}>Content to Cast</Text>
              </View>
              <Text style={tw`text-gray-700 mt-2`}>
                {castMode === 'video' ? 'Video:' : 'Quiz:'} {videoTitle}
              </Text>
            </View>
          </View>
        )}

        {/* Device Discovery */}
        <View style={tw`px-4 mb-6`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="tv" size={24} color="#3b82f6" />
              <Text style={tw`text-lg font-bold text-gray-800 ml-2`}>Available TVs</Text>
              <View style={tw`ml-2 px-2 py-1 bg-blue-100 rounded-full`}>
                <Text style={tw`text-xs font-semibold text-blue-600`}>{devices.length}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleScanDevices}
              disabled={isScanning}
              style={[
                tw`px-4 py-2 rounded-xl flex-row items-center`,
                isScanning ? tw`bg-gray-400` : tw`bg-gradient-to-r from-blue-500 to-purple-600`
              ]}
            >
              <Animatable.View animation={isScanning ? "rotate" : undefined} iterationCount="infinite">
                <Ionicons name="refresh" size={16} color="white" />
              </Animatable.View>
              <Text style={tw`text-white font-bold ml-2`}>
                {isScanning ? 'Scanning...' : 'Scan'}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={tw`space-y-3`} showsVerticalScrollIndicator={false}>
            {devices.map((device, index) => (
              <Animatable.View
                key={device.id}
                animation="fadeInUp"
                delay={index * 100}
                style={tw.style('bg-white rounded-2xl p-4 shadow-lg border border-gray-100', {
                  borderColor: device.isConnected ? '#22c55e' : '#e5e7eb',
                  borderWidth: device.isConnected ? 2 : 1,
                  backgroundColor: device.isConnected ? '#f0fdf4' : '#ffffff',
                })}
              >
                <View style={tw`flex-row items-center justify-between`}>
                  <View style={tw`flex-row items-center flex-1`}>
                    <View style={tw.style('w-12 h-12 rounded-full items-center justify-center mr-3', {
                      backgroundColor: device.isConnected ? '#dcfce7' : '#f3f4f6',
                      borderWidth: device.isConnected ? 2 : 0,
                      borderColor: device.isConnected ? '#22c55e' : 'transparent',
                    })}>
                      <Ionicons 
                        name={getDeviceIcon(device.type) as any} 
                        size={24} 
                        color={device.isConnected ? '#22c55e' : '#6b7280'} 
                      />
                    </View>
                    <View style={tw`flex-1`}>
                      <View style={tw`flex-row items-center`}>
                        <Text style={tw`text-lg font-bold text-gray-800`}>
                          {device.name}
                        </Text>
                        {device.isConnected && (
                          <View style={tw`ml-2 px-2 py-1 bg-green-100 rounded-full`}>
                            <Text style={tw`text-xs font-semibold text-green-600`}>Connected</Text>
                          </View>
                        )}
                      </View>
                      <Text style={tw`text-sm text-gray-600 capitalize`}>
                        {device.type}
                      </Text>
                      <View style={tw`flex-row items-center mt-1`}>
                        <View style={tw`w-16 h-2 bg-gray-200 rounded-full overflow-hidden`}>
                          <View 
                            style={tw.style('h-full rounded-full', {
                              width: `${device.signalStrength}%`,
                              backgroundColor: getSignalStrengthColor(device.signalStrength),
                            })}
                          />
                        </View>
                        <Text style={tw`text-xs text-gray-500 ml-2`}>
                          {getSignalStrengthText(device.signalStrength)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  
                  <TouchableOpacity
                    onPress={() => device.isConnected ? handleDisconnect() : handleConnectToDevice(device)}
                    style={tw.style('px-4 py-2 rounded-xl', {
                      backgroundColor: device.isConnected ? '#ef4444' : '#22c55e',
                    })}
                  >
                    <Text style={tw`text-white font-bold`}>
                      {device.isConnected ? 'Disconnect' : 'Connect'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            ))}
          </ScrollView>
        </View>

        

        {/* TV Preview */}
        {connectedDevice && (
          <View style={tw`px-4 mb-6`}>
            <View style={tw`bg-gray-900 rounded-2xl p-4 border border-gray-700`}>
              <View style={tw`flex-row items-center mb-3`}>
                <Ionicons name="tv" size={20} color="#3b82f6" />
                <Text style={tw`text-lg font-bold text-white ml-2`}>TV Preview</Text>
              </View>
              <View style={tw`bg-black rounded-xl overflow-hidden`}>
                               <TVInterface
                 mode={isAppMirroring ? 'app' : castMode}
                 title={isAppMirroring ? 'Kids Learning App' : (videoTitle || 'Educational Content')}
                 content={isAppMirroring ? 'Full app mirroring active' : (castMode === 'video' ? 'Video will play here' : 'Quiz questions will appear here')}
                 isConnected={true}
                 isAppMirroring={isAppMirroring}
               />
              </View>
            </View>
          </View>
        )}

                 {/* Instructions */}
         <View style={tw`px-4 pb-6`}>
           <View style={tw`bg-blue-50 rounded-2xl p-4 border border-blue-200`}>
             <View style={tw`flex-row items-center mb-2`}>
               <Ionicons name="bulb" size={20} color="#3b82f6" />
               <Text style={tw`text-lg font-bold text-blue-700 ml-2`}>How App Mirroring Works</Text>
             </View>
             <Text style={tw`text-blue-800 text-sm leading-5`}>
               1. Make sure your TV and phone are on the same WiFi network{'\n'}
               2. Tap "Scan" to find available TVs{'\n'}
               3. Tap "Connect" on your preferred TV{'\n'}
               4. Tap "Sync Entire App" to start mirroring{'\n'}
               5. Your entire app will run on TV - use phone as remote!
             </Text>
           </View>
         </View>
      </SafeAreaView>
    </BackgroundWrapper>
  );
} 