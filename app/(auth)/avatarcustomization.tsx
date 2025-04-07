import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  Easing,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import tw from "@/lib/tailwind";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import Button from "@/components/Button";
import AvatarIcon from "@/assets/icons/Avatar-Icon.svg";

// Avatar list
const avatars = [
  { id: 1, name: "Rocket", gender: "boy", src: require("@/assets/images/avatar/boy1.png") },
  { id: 2, name: "Smarty", gender: "boy", src: require("@/assets/images/avatar/boy2.png") },
  { id: 3, name: "Maxy", gender: "boy", src: require("@/assets/images/avatar/boy3.png") },
  { id: 4, name: "Bubbly", gender: "boy", src: require("@/assets/images/avatar/boy4.png") },
  { id: 5, name: "Twinkle", gender: "girl", src: require("@/assets/images/avatar/girl1.png") },
  { id: 6, name: "Cutie", gender: "girl", src: require("@/assets/images/avatar/girl2.png") },
  { id: 7, name: "Joy", gender: "girl", src: require("@/assets/images/avatar/girl3.png") },
  { id: 8, name: "Mimi", gender: "girl", src: require("@/assets/images/avatar/girl4.png") },
];

const AvatarCustomization = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [genderFilter, setGenderFilter] = useState<"all" | "boy" | "girl">("all");
  const bounceAnim = useState(new Animated.Value(0))[0];

  const handleNext = async () => {
    if (selectedId !== null) {
      await AsyncStorage.setItem("selectedAvatar", selectedId.toString());
      router.push("/(auth)/casttotv");
    }
  };

  const handleSelectAvatar = (id: number) => {
    setSelectedId(id);
    setModalVisible(false);
    bounceAnim.setValue(0);
    Animated.spring(bounceAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const filteredAvatars =
    genderFilter === "all"
      ? avatars
      : avatars.filter((avatar) => avatar.gender === genderFilter);

  const selectedAvatar = avatars.find((a) => a.id === selectedId);

  return (
    <BackgroundWrapper>
      <View style={tw`flex-1 w-full items-center p-4 mt-14`}>

        {/* Avatar preview or icon */}
        {selectedId === null ? (
          <AvatarIcon width={150} height={150} />
        ) : (
          <Animated.View
            style={{
              transform: [
                {
                  scale: bounceAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
              alignItems: "center",
            }}
          >
            <Image
              source={selectedAvatar?.src}
              style={tw`w-50 h-50 rounded-full`}
              resizeMode="contain"
            />
            <Text style={tw`text-xl font-bold text-white mt-2`}>
              {selectedAvatar?.name}
            </Text>
          </Animated.View>
        )}

        <Text style={tw`text-3xl font-bold text-yellow-600 my-6 text-center`}>
          Select Your Avatar!
        </Text>

        <View style={tw`w-full px-4`}>
          <Button
            title="Avatar"
            onPress={() => setModalVisible(true)}
            showAnimatedHand={selectedId === null}
          />
        </View>

        {selectedId !== null && (
          <View style={tw`absolute bottom-10 self-center w-full px-4`}>
            <Button title="Next" showAnimatedHand={true} onPress={handleNext} />
          </View>
        )}

        {/* Avatar Selection Modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={tw`flex-1 bg-black bg-opacity-20 justify-center items-center`}>
            <View style={tw`bg-white rounded-2xl p-4 w-[90%] max-h-[85%]`}>
              <Text style={tw`text-lg font-semibold text-center mb-3`}>
                Choose Your Avatar
              </Text>

              {/* Gender Filter */}
              <View style={tw`flex-row justify-center mb-2`}>
                {["all", "boy", "girl"].map((gender) => (
                  <TouchableOpacity
                    key={gender}
                    onPress={() => setGenderFilter(gender as any)}
                    style={tw`mx-1 px-3 py-1 rounded-full ${
                      genderFilter === gender
                        ? "bg-yellow-400"
                        : "bg-gray-200"
                    }`}
                  >
                    <Text style={tw`text-sm font-medium capitalize`}>
                      {gender === "all" ? "All" : gender === "boy" ? "Boys" : "Girls"}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <ScrollView
                contentContainerStyle={tw`flex-row flex-wrap justify-center`}
                showsVerticalScrollIndicator={false}
              >
                {filteredAvatars.map((avatar) => (
                  <TouchableOpacity
                    key={avatar.id}
                    onPress={() => handleSelectAvatar(avatar.id)}
                    style={tw`m-2 p-2 rounded-xl border-4 ${
                      selectedId === avatar.id
                        ? "border-yellow-400 bg-yellow-100"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      source={avatar.src}
                      style={tw`w-24 h-24 rounded-md`}
                      resizeMode="contain"
                    />
                    <Text style={tw`text-center mt-1 text-gray-700 text-sm`}>
                      {avatar.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={tw`mt-4 py-2 bg-red-500 rounded-full`}
              >
                <Text style={tw`text-white text-center font-bold`}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </BackgroundWrapper>
  );
};

export default AvatarCustomization;
