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
import { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import tw from "twrnc";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated";
import SecurityLock from "../../assets/icons/Security-Lock.svg";
import Button from "@/components/Button";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { useLoader } from "@/context/LoaderContext";
import MusicLayout from "@/components/MusicLayout";
import { SoundManager } from "@/hooks/SoundManager";
import { VOICE_MESSAGES, VOICE_STYLES } from "@/constants/voicePresets";
import { MusicManager } from "@/hooks/MusicManager";
import { playClickSound } from "@/hooks/buttonPopSound";



const questions = [
  { id: 0, text: "What is your favorite color?", icon: "🎨" },
  { id: 1, text: "What is your pet's name?", icon: "🐶" },
  { id: 2, text: "What is your mother's name?", icon: "👩" },
  { id: 3, text: "What is the name of your favourite teacher?", icon: "👨‍🏫" },
];

const voiceMessages = [
  'Enter yout favorite color!',
  'Enter your pet\'s name!',
  'Enter your mother\'s name!',
  'Enter the name of your favourite teacher!',
  'Enter your answer!',
];

export default function SecurityQuestion() {
  useEffect(() => {
    SoundManager.speak({
      text: VOICE_MESSAGES.securityQuestion,
      style: VOICE_STYLES.funKid,
    });
  }, []);

  const router = useRouter();
  const { showLoader, hideLoader } = useLoader();
  const [selectedQuestion, setSelectedQuestion] = useState<{ id: number; text: string; icon: string } | null>(null);
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
  const showDropdownAnim = useSharedValue(0);

  const dropdownStyle = useAnimatedStyle(() => ({
    height: withTiming(showDropdown ? 285 : 0, { duration: 300 }),
    overflow: 'hidden',
  }));

  const handleSubmit = async () => {
    showLoader();
    await MusicManager.fadeOutAndStop();
    await new Promise((resolve) => setTimeout(resolve, 3500));
    hideLoader();

    setTimeout(() => {
      router.push("/(auth)/subjectselection");
    }, 100);
  };

  const handleDropdownClick = (item: { id: number; text: string; icon: string }) => {
    playClickSound();
    if (item.id !== selectedQuestion?.id) {
      setSelectedQuestion(item);
      setAnswer("");
      SoundManager.speak({
        text: voiceMessages[item?.id ?? 4],
        style: VOICE_STYLES.funKid,
      });
    } else {
      if(answer.trim() === "") {
        SoundManager.speak({
          text: voiceMessages[item?.id ?? 4],
          style: VOICE_STYLES.funKid,
        });
      }
    }
    setShowDropdown(false);
  };

  return (
    <MusicLayout musicKey="landing">
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
                style={tw`w-11/12 self-center items-center bg-green-100 border-4 border-green-500 rounded-full p-4`}
                onPress={() => {
                  playClickSound();
                  setShowDropdown(!showDropdown);
                  showDropdownAnim.value = showDropdown ? 0 : 1;
                  Keyboard.dismiss();
                }}
              >
                <View style={tw`flex-row justify-center items-center`}>
                  {selectedQuestion && (
                    <TouchableOpacity onPress={handleIconPress} style={tw`mr-2`}>
                      <Animated.View style={[tw`w-10 h-10 rounded-full bg-green-300 flex items-center justify-center`, animatedStyle]}>
                        <Text style={tw`text-lg`}>{selectedQuestion.icon}</Text>
                      </Animated.View>
                    </TouchableOpacity>
                  )}
                  <View style={tw`flex-1 items-center justify-center`}>
                    <Text
                      style={tw`text-lg font-bold text-gray-500 text-center`}
                      numberOfLines={2}
                    >
                      {selectedQuestion ? selectedQuestion.text : "Select a security question?"}
                    </Text>
                  </View>
                  {!selectedQuestion && (
                    <FontAwesome
                      name={showDropdown ? "chevron-up" : "chevron-down"}
                      size={22}
                      color="red"
                      style={tw`ml-2`}
                    />
                  )}
                </View>
              </TouchableOpacity>

              {/* Animated Dropdown Section */}
              {showDropdown && (
                <Animated.View style={[tw`mt-2 bg-red-100 border-4 border-red-400 rounded-2xl shadow-lg w-11/12 self-center absolute top-32`, dropdownStyle]}>
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
                        onPress={()=> handleDropdownClick(item)}
                      >
                        <View style={tw`w-10 h-10 rounded-full bg-red-300 items-center justify-center mr-2`}>
                          <Text style={tw`text-lg`}>{item.icon}</Text>
                        </View>
                        <Text
                          style={tw`text-lg text-gray-700 flex-1`}
                          numberOfLines={2}
                        >
                          {item.text}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </Animated.View>
              )}
            </View>

            {selectedQuestion && (
              <View style={tw`mb-8`}>
                <View style={tw`flex-row items-center justify-center w-11/12 self-center border-4 border-blue-400 rounded-full bg-yellow-100 p-3`}>
                  <TextInput
                    value={answer}
                    onChangeText={setAnswer}
                    placeholder="Enter your answer"
                    placeholderTextColor="gray"
                    style={tw`flex-1 text-lg font-bold text-gray-600`}
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
    </MusicLayout>
  );
}