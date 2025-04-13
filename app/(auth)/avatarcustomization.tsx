import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import tw from "@/lib/tailwind";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import Button from "@/components/Button";
import AvatarIcon from "@/assets/icons/Avatar-Icon.svg";
import { LinearGradient } from "expo-linear-gradient";

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

const avatarBgColors = [
  "bg-red-100",
  "bg-blue-100",
  "bg-yellow-100",
  "bg-purple-100",
  "bg-pink-100",
  "bg-green-100",
  "bg-indigo-100",
  "bg-orange-100",
];

const selectedAvatarBgColors = [
  "bg-red-300",
  "bg-blue-300",
  "bg-yellow-300",
  "bg-purple-300",
  "bg-pink-300",
  "bg-green-300",
  "bg-indigo-300",
  "bg-orange-300",
];

const AvatarCustomization = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [genderStep, setGenderStep] = useState(true);
  const [genderFilter, setGenderFilter] = useState<"boy" | "girl" | null>(null);
  const bounceAnim = useState(new Animated.Value(0))[0];
  const [tempSelectedId, setTempSelectedId] = useState<number | null>(null);

  const handleNext = async () => {
    if (selectedId !== null) {
      await AsyncStorage.setItem("selectedAvatar", selectedId.toString());
      router.push("/(auth)/casttotv");
    }
  };

  const handleSelectAvatar = (id: number) => {
    setTempSelectedId(id);
  };

  const handleGenderSelect = (gender: "boy" | "girl") => {
    setGenderFilter(gender);
    setGenderStep(false);
  };

  const handleConfirm = () => {
    if (tempSelectedId !== null) {
      setSelectedId(tempSelectedId);
      bounceAnim.setValue(0);
      Animated.spring(bounceAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }).start();
    }
    setModalVisible(false);
  };

  const filteredAvatars =
    genderFilter === null
      ? []
      : avatars.filter((avatar) => avatar.gender === genderFilter);

  const selectedAvatar = avatars.find((a) => a.id === selectedId);

  return (
    <BackgroundWrapper>
      <View style={tw`flex-1 w-full items-center p-4 mt-14`}>
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
            <View style={tw`bg-white bg-opacity-20 rounded-full p-4 flex justify-center items-center`}>
            <Image
              source={selectedAvatar?.src}
              style={tw`w-50 h-50 rounded-full`}
              resizeMode="contain"
            />
            <Text style={tw`text-3xl font-bold text-gray-600 my-2`}>
              {selectedAvatar?.name}
            </Text>
            </View>
          </Animated.View>
        )}

        <Text style={tw`text-3xl font-bold text-yellow-600 my-6 text-center`}>
          Select Your Avatar!
        </Text>

        <View style={tw`w-full px-4`}>
          <Button
            title="Avatar"
            onPress={() => {
              setModalVisible(true);
              setGenderStep(true);
              setGenderFilter(null);
              setTempSelectedId(selectedId); // pre-select if already chosen
            }}
            showAnimatedHand={selectedId === null}
          />
        </View>

        {selectedId !== null && (
          <View style={tw`absolute bottom-10 self-center w-full px-4`}>
            <Button title="Next" showAnimatedHand={true} onPress={handleNext} />
          </View>
        )}

        {/* Modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={tw`flex-1 bg-black bg-opacity-30 justify-center items-center`}>
            <LinearGradient
              colors={["#93eda4", "#9881de"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={tw`shadow-lg rounded-2xl p-4 w-[90%] max-h-[85%]`}
            >
              {genderStep ? (
                <>
                  <Text style={tw`text-2xl text-gray-600 font-bold text-center my-6`}>
                    Are you a boy or a girl?
                  </Text>
                  <View style={tw`flex-row justify-around`}>
                    <TouchableOpacity
                      onPress={() => handleGenderSelect("boy")}
                      style={tw`items-center`}
                    >
                      <Image
                        source={require("@/assets/images/avatar/boy1.png")}
                        style={tw`w-30 h-30 rounded-md bg-blue-200`}
                        resizeMode="contain"
                      />
                      <Text style={tw`mt-2 text-lg font-bold text-blue-600`}>Boy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleGenderSelect("girl")}
                      style={tw`items-center`}
                    >
                      <Image
                        source={require("@/assets/images/avatar/girl1.png")}
                        style={tw`w-30 h-30 rounded-md bg-pink-200`}
                        resizeMode="contain"
                      />
                      <Text style={tw`mt-2 font-bold text-lg text-pink-500`}>Girl</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={tw`mt-6 py-3 bg-red-400 rounded-full w-1/2 self-center border4 border-yellow-300`}
                  >
                    <Text style={tw`text-white text-xl text-center font-bold`}>Cancel</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={tw`text-2xl text-gray-600 font-bold text-center my-4`}>
                    Choose Your Avatar
                  </Text>
                  <ScrollView
                    contentContainerStyle={tw`flex-row flex-wrap justify-center`}
                    showsVerticalScrollIndicator={false}
                  >
                    {filteredAvatars.map((avatar, index) => {
                      const bgColor =
                        avatar.id === tempSelectedId
                          ? selectedAvatarBgColors[index % selectedAvatarBgColors.length]
                          : avatarBgColors[index % avatarBgColors.length];

                      const borderColor =
                        avatar.id === tempSelectedId ? "border-yellow-500 tex-white" : "border-gray-300";

                      return (
                        <TouchableOpacity
                          key={avatar.id}
                          onPress={() => handleSelectAvatar(avatar.id)}
                          style={tw`m-2 rounded-xl border-4 ${borderColor} ${bgColor}`}
                        >
                          <Image
                            source={avatar.src}
                            style={tw`w-30 h-30 rounded-md`}
                            resizeMode="contain"
                          />
                          <Text style={tw`text-center my-1 text-gray-500 text-lg font-bold ${avatar.id === tempSelectedId ? "text-white" : "text-gray-500"}`}>
                            {avatar.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>

                  <View style={tw`flex-row justify-between mt-4`}>
                    <TouchableOpacity
                      onPress={() => {
                        setGenderStep(true);
                        setGenderFilter(null);
                        setTempSelectedId(null);
                      }}
                      style={tw`flex-1 mr-2 py-3 bg-gray-400 border4 border-blue-400 rounded-full`}
                    >
                      <Text style={tw`text-center text-white text-lg font-bold`}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleConfirm}
                      style={tw`flex-1 ml-2 py-3 bg-green-400 border4 border-yellow-300 rounded-full`}
                    >
                      <Text style={tw`text-center text-white text-lg font-bold`}>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
          </LinearGradient>
      </View>
    </Modal>
      </View >
    </BackgroundWrapper >
  );
};

export default AvatarCustomization;
