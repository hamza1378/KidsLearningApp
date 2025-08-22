import { View, Text, FlatList, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import tw from "@/lib/tailwind";
import VideoListItem from "@/components/video-list-item";
import QuickActionItem from "@/components/quick-action-item";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import BackgroundWrapper from "@/components/BackgroundWrapper";

interface ListItem {
  id: string;
  title: string;
  status: string;
  icon: "checkmark" | "play-outline" | "lock";
  image: string;
  videoUrl?: string | number;
}

const data: ListItem[] = [
  {
    id: "1",
    title: "Addition Basics",
    status: "Completed",
    icon: "checkmark",
    image:
      "https://www.aph.org/app/uploads/woocommerce-placeholder-600x600.png",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: "2",
    title: "Subtraction Fundamentals",
    status: "Completed",
    icon: "checkmark",
    image:
      "https://www.aph.org/app/uploads/woocommerce-placeholder-600x600.png",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: "3",
    title: "Multiplication Mastery",
    status: "In Progress",
    icon: "play-outline",
    image:
      "https://www.aph.org/app/uploads/woocommerce-placeholder-600x600.png",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: "4",
    title: "Division Demystified",
    status: "Locked",
    icon: "lock",
    image:
      "https://www.aph.org/app/uploads/woocommerce-placeholder-600x600.png",
  },
  {
    id: "5",
    title: "Fractions Fun",
    status: "Locked",
    icon: "lock",
    image:
      "https://www.aph.org/app/uploads/woocommerce-placeholder-600x600.png",
  },
];

const quickActionsData: {
  id: string;
  title: string;
  icon: keyof typeof import("@expo/vector-icons/Ionicons").default.glyphMap;
}[] = [
  {
    id: "0",
    title: "Resume Lesson",
    icon: "play-outline",
  },
  {
    id: "1",
    title: "Download PDF/Notes",
    icon: "download-outline",
  },
  {
    id: "3",
    title: "Start Your Quiz",
    icon: "help-outline",
  },
];

const CourseScreen = () => {
  const handleVideoClick = (item: ListItem) => {
    if (item.status === "Locked") {
      Alert.alert(
        "Video Locked",
        "This video is locked. Complete previous lessons to unlock it!",
        [{ text: "OK" }]
      );
      return;
    }

    if (!item.videoUrl) {
      Alert.alert(
        "Video Not Available",
        "This video is not available yet.",
        [{ text: "OK" }]
      );
      return;
    }

    // Navigate to video player with video data
    router.push({
      pathname: '/video-player',
      params: { 
        qrData: `video-${item.id}-${item.title}`,
        videoUrl: typeof item.videoUrl === 'number' ? item.videoUrl.toString() : item.videoUrl || '',
        videoTitle: item.title,
        isLocalVideo: typeof item.videoUrl === 'number' ? 'true' : 'false'
      }
    });
  };

  return (
    <BackgroundWrapper>
      <ScrollView contentContainerStyle={tw`pb-5`}>
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 16,
          paddingBottom: 12,
          paddingHorizontal: 16,
          backgroundColor: '#FFE066',
          borderRadius: 18,
          margin: 12,
          marginTop: 12,
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
          borderBottomWidth: 1,
          borderBottomColor: '#FFD700',
        }}>
          <Link href={"/(tabs)/home"}>
            <AntDesign name="arrowleft" size={20} color="#101519" />
          </Link>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              color: '#101519',
              fontSize: 16,
              fontWeight: 'bold',
              letterSpacing: 0.5,
              marginLeft: -20,
            }}
          >
            Scan And Expand
          </Text>
        </View>
        <View style={{ marginHorizontal: 12, marginTop: 18 }}>
          {/* Math Section */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <View style={{
              height: 48,
              width: 48,
              borderRadius: 24,
              backgroundColor: '#bae6fd',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 14,
              borderWidth: 2,
              borderColor: '#38bdf8',
            }}>
              <Entypo name="calculator" size={26} color="#101519" />
            </View>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#101519' }}>Math</Text>
            <Text style={{ fontSize: 22, marginLeft: 8 }}>🧮</Text>
          </View>

          {/* Progress Cards */}
          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 18 }}>
            <View style={{
              flex: 1,
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 14,
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
              borderWidth: 1,
              borderColor: '#f3f4f6',
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: '#fef3c7',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                }}>
                  <Ionicons name="checkmark-circle" size={18} color="#f59e0b" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#101519', marginBottom: 1 }}>2 / 5</Text>
                  <Text style={{ fontSize: 11, color: '#6b7280', fontWeight: '500' }}>Lessons</Text>
                </View>
              </View>
              <View style={{
                height: 4,
                backgroundColor: '#f3f4f6',
                borderRadius: 2,
                overflow: 'hidden',
              }}>
                <View style={{
                  width: '40%',
                  height: '100%',
                  backgroundColor: '#f59e0b',
                  borderRadius: 2,
                }} />
              </View>
            </View>
            
            <View style={{
              flex: 1,
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 14,
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
              borderWidth: 1,
              borderColor: '#f3f4f6',
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: '#dbeafe',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                }}>
                  <Ionicons name="trophy" size={18} color="#3b82f6" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#101519', marginBottom: 1 }}>40%</Text>
                  <Text style={{ fontSize: 11, color: '#6b7280', fontWeight: '500' }}>Course</Text>
                </View>
              </View>
              <View style={{
                height: 4,
                backgroundColor: '#f3f4f6',
                borderRadius: 2,
                overflow: 'hidden',
              }}>
                <View style={{
                  width: '40%',
                  height: '100%',
                  backgroundColor: '#3b82f6',
                  borderRadius: 2,
                }} />
              </View>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={{
            height: 14,
            backgroundColor: '#e0e7ff',
            borderRadius: 7,
            overflow: 'hidden',
            shadowColor: '#bae6fd',
            shadowOpacity: 0.10,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            elevation: 1,
            marginBottom: 18,
          }}>
            <View style={{
              width: '40%',
              height: '100%',
              backgroundColor: '#38bdf8',
              borderRadius: 7,
            }} />
          </View>

          {/* Quick Actions */}
          <View style={{ marginBottom: 18 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#101519', marginBottom: 8 }}>⚡ Quick Actions</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {quickActionsData.map((item) => (
                <View
                  key={item.id}
                  style={{
                    width: '31%',
                    backgroundColor: '#fff',
                    borderRadius: 16,
                    padding: 12,
                    alignItems: 'center',
                    shadowColor: '#bae6fd',
                    shadowOpacity: 0.10,
                    shadowRadius: 4,
                    shadowOffset: { width: 0, height: 2 },
                    elevation: 1,
                    borderWidth: 1,
                    borderColor: '#e0e7ff',
                  }}
                >
                  <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#fef3c7',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 6,
                  }}>
                    <Ionicons name={item.icon} size={20} color={'#f59e0b'} />
                  </View>
                  <Text style={{ 
                    fontWeight: 'bold', 
                    fontSize: 10, 
                    color: '#101519',
                    textAlign: 'center',
                    lineHeight: 14,
                  }}>
                    {item.title}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Videos List */}
          <View style={{ marginBottom: 18 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#101519', marginBottom: 8 }}>🎬 Videos</Text>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleVideoClick(item)}
                  style={{
                  backgroundColor: '#fff',
                  borderRadius: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                  padding: 10,
                  shadowColor: '#bae6fd',
                  shadowOpacity: 0.10,
                  shadowRadius: 4,
                  shadowOffset: { width: 0, height: 2 },
                  elevation: 1,
                  }}
                  activeOpacity={0.7}
                >
                  <Image source={{ uri: item.image }} style={{ width: 48, height: 48, borderRadius: 12, marginRight: 12, backgroundColor: '#e0e7ff' }} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#101519' }}>{item.title}</Text>
                    <Text style={{ fontSize: 13, color: '#5a748c' }}>{item.status}</Text>
                  </View>
                  <Ionicons
                    name={item.icon}
                    size={28}
                    color={item.icon === 'checkmark' ? '#22c55e' : item.icon === 'play-outline' ? '#fbbf24' : '#a1a1aa'}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 2 }}
              scrollEnabled={false}
            />
          </View>

          {/* Upcoming Features */}
          <View style={{ marginBottom: 18 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#101519', marginBottom: 8 }}>🔒 Upcoming Features</Text>
            <View style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              shadowColor: '#bae6fd',
              shadowOpacity: 0.10,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 2 },
              elevation: 1,
            }}>
              <Ionicons name={'lock-closed-outline'} size={26} color={'#a1a1aa'} style={{ marginRight: 12 }} />
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#101519' }}>Unlock Advanced Topics. Upgrade to Unlock</Text>
            </View>
          </View>

          {/* Gamification */}
          <View style={{ marginBottom: 18 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#101519', marginBottom: 8 }}>🏅 Gamification</Text>
            <View style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              shadowColor: '#bae6fd',
              shadowOpacity: 0.10,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 2 },
              elevation: 1,
            }}>
              <Ionicons name={'medal-outline'} size={26} color={'#22c55e'} style={{ marginRight: 12 }} />
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#101519' }}>Badges Earned</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Floating Help Button */}
      <TouchableOpacity
        onPress={() => router.push('/(tabs)/help')}
        style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          backgroundColor: '#38bdf8',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 28,
          shadowColor: '#38bdf8',
          shadowOpacity: 0.18,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
          elevation: 4,
          zIndex: 100,
        }}
      >
        <Ionicons name="help-outline" size={28} color={"white"} />
      </TouchableOpacity>
    </BackgroundWrapper>
  );
};

export default CourseScreen;
