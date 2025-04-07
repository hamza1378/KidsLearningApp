import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";

import { FontAwesome } from "@expo/vector-icons";
import tw from "twrnc";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated";
import SecurityLock from "../../assets/icons/Security-Lock.svg";
import Button from "@/components/Button";
import BackgroundWrapper from "@/components/BackgroundWrapper";

const questions = [
  { text: "What is your favorite color?", icon: "🎨" },
  { text: "What is your pet's name?", icon: "🐶" },
  { text: "What is your mother's name?", icon: "👩" },
  { text: "What is the name of your favourite teacher?", icon: "👨‍🏫" },
];

export default function SecurityQuestion() {
  const router = useRouter();
  const [selectedQuestion, setSelectedQuestion] = useState<{ text: string; icon: string } | null>(null);
  const [answer, setAnswer] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState(false);

  const isButtonDisabled = !selectedQuestion || !answer.trim();

  // Animated SVG Bounce Effect
  const scaleValue = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
  }));

  const handleIconPress = () => {
    scaleValue.value = withSpring(1.2, { damping: 3 }, () => {
      scaleValue.value = withSpring(1);
    });
  };

  // Dropdown Slide Animation
  const showDropdownAnim = useSharedValue(0); // Controls the height of the dropdown

  const dropdownStyle = useAnimatedStyle(() => ({
    height: withTiming(showDropdown ? 285 : 0, { duration: 300 }), // Slide down or up animation
    overflow: 'hidden',
  }));

  const handleSubmit = () => {
    router.push("/(auth)/subjectselection");
  };

  return (
    <BackgroundWrapper>
      <TouchableWithoutFeedback onPress={() => {
        setShowDropdown(false);
        Keyboard.dismiss();
      }}>
        <View style={tw`flex-1 w-full`}>
          <View style={tw`items-center mb-8 mt-12`}>
            <SecurityLock width={150} height={150} />
          </View>

          {/* Dropdown Container */}
          <View style={tw`mb-4 z-30`}>
            <Text style={tw`text-3xl font-bold text-yellow-600 text-center mb-4`}>
              Security Questions
            </Text>
            <TouchableOpacity
              style={tw`flex-row items-center w-11/12 self-center justify-between bg-green-100 border-4 border-green-500 rounded-full p-4`}
              onPress={() => {
                setShowDropdown(!showDropdown);
                showDropdownAnim.value = showDropdown ? 0 : 1; // Toggle dropdown visibility
                Keyboard.dismiss();
              }}
            >
              <View style={tw`flex-row items-center`}>
                {selectedQuestion && (
                  <TouchableOpacity onPress={handleIconPress}>
                    <Animated.View style={[tw`w-10 h-10 rounded-full bg-green-300 flex items-center justify-center mr-2`, animatedStyle]}>
                      <Text style={tw`text-lg`}>{selectedQuestion.icon}</Text>
                    </Animated.View>
                  </TouchableOpacity>
                )}
                <Text style={tw`text-lg font-semibold text-gray-500`}>
                  {selectedQuestion ? selectedQuestion.text : "Select a security question?"}
                </Text>
              </View>
              {!selectedQuestion && (
                <FontAwesome name={showDropdown ? "chevron-up" : "chevron-down"} size={22} color="red" />
              )}
            </TouchableOpacity>

            {/* Animated Dropdown Section */}
            {showDropdown && (
              <Animated.View style={[tw`mt-2 bg-red-100 border-4 border-red-400 rounded-2xl shadow-lg  w-11/12 self-center absolute top-32`, dropdownStyle]}>
                <ScrollView
                  style={tw`flex-1`}
                  contentContainerStyle={tw`pb-2`}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                >
                  {questions.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={tw`flex-row items-center p-3 ${index !== questions.length - 1 ? "border-b border-gray-300" : ""}`}
                      onPress={() => {
                        setSelectedQuestion(item);
                        setShowDropdown(false);
                      }}
                    >
                      <View style={tw`w-10 h-10 rounded-full bg-red-300 items-center justify-center mr-3`}>
                        <Text style={tw`text-lg`}>{item.icon}</Text>
                      </View>
                      <Text style={tw`text-lg text-gray-700 flex-1`}>{item.text}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </Animated.View>
            )}
          </View>

          {selectedQuestion && (
            <View style={tw`mb-8`}>
              <View style={tw`flex-row items-center w-11/12 self-center border-4 border-blue-400 rounded-full bg-yellow-100 p-3`}>
                <TextInput
                  value={answer}
                  onChangeText={setAnswer}
                  placeholder="Enter your answer"
                  placeholderTextColor="gray"
                  style={tw`flex-1 text-lg font-bold text-gray-700`}
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
              </View>
            </View>
          )}

          <View style={tw`absolute bottom-10 w-full`}>
            <Button
              title="Submit"
              showAnimatedHand={!isButtonDisabled}
              onPress={handleSubmit}
              disabled={isButtonDisabled}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </BackgroundWrapper>
  );
}
