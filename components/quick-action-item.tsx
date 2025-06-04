import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

interface QuickActionItemProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const QuickActionItem: React.FC<QuickActionItemProps> = ({ title, icon }) => {
  return (
    <View style={tw`flex-row items-center py-3`}>
      <View
        style={tw`w-10 h-10 bg-[#E8EDF5] rounded-xl flex items-center justify-center mr-4`}
      >
        <Ionicons name={icon} size={20} color={"#0D141C"} />
      </View>
      <View style={tw`flex-1 justify-center`}>
        <Text style={tw`text-base mb-1`}>{title}</Text>
      </View>
      <View>
        <Ionicons name="arrow-forward" size={24} />
      </View>
    </View>
  );
};

export default QuickActionItem;
