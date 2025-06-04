import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

interface ListItemProps {
  title: string;
  status: string;
  icon: "checkmark" | "play-outline" | "lock";
  image: string; // Placeholder for image URI
}

const VideoListItem: React.FC<ListItemProps> = ({
  title,
  status,
  icon,
  image,
}) => {
  return (
    <View style={tw`flex-row items-center py-3`}>
      <Image source={{ uri: image }} style={tw`w-15 h-15 rounded-xl mr-4`} />
      <View style={tw`flex-1 justify-center`}>
        <Text style={tw`text-base font-semibold mb-1`}>{title}</Text>
        <Text style={tw`text-sm`}>{status}</Text>
      </View>
      <View style={tw`w-6 items-center justify-center`}>
        {icon === "checkmark" && <Ionicons name="checkmark" size={24} />}
        {icon === "play-outline" && <Ionicons name="play-outline" size={24} />}
        {icon === "lock" && <Ionicons name="lock-closed-outline" size={24} />}
      </View>
    </View>
  );
};

export default VideoListItem;
