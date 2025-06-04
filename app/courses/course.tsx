import { View, Text, FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import tw from "@/lib/tailwind";
import VideoListItem from "@/components/video-list-item";
import QuickActionItem from "@/components/quick-action-item";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

interface ListItem {
  id: string;
  title: string;
  status: string;
  icon: "checkmark" | "play-outline" | "lock";
  image: string;
}

const data: ListItem[] = [
  {
    id: "1",
    title: "Addition Basics",
    status: "Completed",
    icon: "checkmark",
    image:
      "https://www.aph.org/app/uploads/woocommerce-placeholder-600x600.png",
  },
  {
    id: "2",
    title: "Subtraction Fundamentals",
    status: "Completed",
    icon: "checkmark",
    image:
      "https://www.aph.org/app/uploads/woocommerce-placeholder-600x600.png",
  },
  {
    id: "3",
    title: "Multiplication Mastery",
    status: "In Progress",
    icon: "play-outline",
    image:
      "https://www.aph.org/app/uploads/woocommerce-placeholder-600x600.png",
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
    title: "Resume Last Lesson",
    icon: "play-outline",
  },
  {
    id: "1",
    title: "Download PDF/Notes",
    icon: "download-outline",
  },
  {
    id: "3",
    title: "Take Quiz",
    icon: "help-outline",
  },
];

const CourseScreen = () => {
  return (
    <SafeAreaView style={tw`bg-[#F7FAFC] flex-1`}>
      <ScrollView contentContainerStyle={tw`pb-5`}>
        <View style={tw`flex-row items-center pt-4 pb-4 px-3`}>
          <Link href={"/(tabs)/home"}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </Link>
          <Text
            style={tw`text-center text-[#0D141C] flex-1 text-xl font-black tracking-wider`}
          >
            Scan And Expand
          </Text>
        </View>
        <View style={tw`mx-5`}>
          <View style={tw`flex items-center flex-row`}>
            <View
              style={tw`h-10 w-10 flex items-center justify-center rounded-[10px] bg-[#E8EDF5]`}
            >
              <Entypo name="calculator" size={20} color="black" />
            </View>
            <Text style={tw`mx-6 text-xl font-semibold`}>Math</Text>
          </View>

          <View style={tw`flex gap-3 flex-row my-5`}>
            <View
              style={tw`flex-1 border border-[#CFDBE8] rounded-[5px] py-3 pb-8 px-4`}
            >
              <Text style={tw`mb-3 text-2xl font-bold`}>2 / 5</Text>
              <Text style={tw`text-lg`}>Lessons Completed</Text>
            </View>
            <View
              style={tw`flex-1 border border-[#CFDBE8] rounded-[5px] py-3 pb-8 px-4`}
            >
              <Text style={tw`mb-3 text-2xl font-bold`}>40 %</Text>
              <Text style={tw`text-lg`}>Course Completed</Text>
            </View>
          </View>

          <View
            style={tw`h-3 bg-gray-200 rounded-[10px] overflow-hidden shadow-md`}
          >
            <View style={tw`w-1/3 h-full bg-[#3D99F5] rounded-[10px]`} />
          </View>

          <View style={tw`my-5`}>
            <Text style={tw`font-bold text-lg tracking-wide mb-1`}>Videos</Text>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <VideoListItem
                  title={item.title}
                  status={item.status}
                  icon={item.icon}
                  image={item.image}
                />
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={tw`pb-2`}
              scrollEnabled={false}
            />
          </View>

          <View style={tw`my-5`}>
            <Text style={tw`font-bold text-lg tracking-wide mb-3`}>
              Quick Actions
            </Text>
            <FlatList
              data={quickActionsData}
              renderItem={({ item }) => (
                <QuickActionItem title={item.title} icon={item.icon} />
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={tw`pb-2`}
              scrollEnabled={false}
            />
          </View>

          <View style={tw`my-5`}>
            <Text style={tw`font-bold text-lg tracking-wide mb-3`}>
              Upcoming Features
            </Text>
            <QuickActionItem
              title={"Unlock Advanced Topics. Upgrade to Unlock"}
              icon={"lock-closed-outline"}
            />
          </View>

          <View style={tw`my-5`}>
            <Text style={tw`font-bold text-lg tracking-wide mb-3`}>
              Gamification
            </Text>
            <QuickActionItem title={"Badges Earned"} icon={"medal-outline"} />
          </View>

          <View
            style={tw`w-14 h-14 bg-blue-500  flex flex-row items-center justify-center rounded-sm self-end`}
          >
            <Ionicons name="help-outline" size={24} color={"white"} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CourseScreen;
