import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons"; // Icons for dropdown
import tw from "twrnc";
import * as Animatable from "react-native-animatable";

const questions = [
  { text: "What is your favorite color?", icon: "🎨" },
  { text: "What is your pet’s name?", icon: "🐶" },
  { text: "What is your mother’s name?", icon: "👩" },
  { text: "What is the name of your favourite teacher?", icon: "👨‍🏫" },
];

export default function SecurityQuestion() {
  const router = useRouter();
  const [selectedQuestion, setSelectedQuestion] = useState<{ text: string; icon: string } | null>(null);
  const [answer, setAnswer] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState(false);

  const isButtonDisabled = !selectedQuestion || !answer.trim();

  const handleSubmit = () => {
    console.log("Selected Question:", selectedQuestion?.text);
    console.log("User Answer:", answer);
    router.push("/(auth)/signin");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../../assets/images/signinbg.jpg")}
        resizeMode="cover"
        style={tw`flex-1`}
      >
        <LinearGradient
          colors={["rgba(29, 215, 224, 0.8)", "rgba(215, 166, 203, 0.8)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.3, y: 0.9 }}
          style={tw`absolute top-0 left-0 right-0 bottom-0`}
        />

        <SafeAreaView style={tw`flex-1 px-6 py-10`}>
          <Text style={tw`text-3xl font-bold text-yellow-600 text-center`}>
            Security Questions
          </Text>

          <View style={tw`relative mt-6`}>
            <TouchableOpacity
              style={tw`flex-row items-center justify-between bg-green-100 border-4 border-green-500 rounded-full p-4`}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <View style={tw`flex-row items-center`}>
                {selectedQuestion && (
                  <View style={tw`w-10 h-10 rounded-full bg-green-300 flex items-center justify-center mr-2`}>
                    <Text style={tw`text-lg`}>{selectedQuestion.icon}</Text>
                  </View>
                )}
                <Text style={tw`text-lg font-semibold text-gray-500`}>
                  {selectedQuestion ? selectedQuestion.text : "Select a security question"}
                </Text>
              </View>
              <FontAwesome name={showDropdown ? "chevron-up" : "chevron-down"} size={22} color="red" />
            </TouchableOpacity>

            {showDropdown && (
              <View
                style={tw`absolute z-50 bg-white border-4 border-red-400 rounded-2xl top-full left-0 right-0 mt-2 shadow-lg`}
              >
                <ScrollView style={tw`max-h-48`}>
                  {questions.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={tw`flex-row items-center py-3 px-4 border-b border-gray-300`}
                      onPress={() => {
                        setSelectedQuestion(item);
                        setShowDropdown(false);
                      }}
                    >
                      <View style={tw`w-10 h-10 bg-red-300 rounded-full flex items-center justify-center`}>
                        <Text style={tw`text-lg text-white`}>{item.icon}</Text>
                      </View>
                      <Text style={tw`text-lg text-gray-700 ml-3`}>{item.text}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          <View style={tw`mt-4 flex-row items-center border-4 border-blue-400 rounded-full bg-yellow-100 py-2 px-3`}>
            <TextInput
              value={answer}
              onChangeText={setAnswer}
              placeholder="Enter your answer"
              placeholderTextColor="gray"
              style={tw`flex-1 text-lg text-gray-700`}
            />
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isButtonDisabled}
            style={tw`rounded-full w-full flex items-center justify-center mt-6 border-4 ${
              isButtonDisabled ? "border-gray-400 bg-gray-300" : "border-yellow-500 bg-blue-400"
            }`}
          >
            <LinearGradient
              colors={isButtonDisabled ? ["#b4b3b2", "#a0a0a0"] : ["#8ba0ff", "#1dd7e0"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={tw`py-3 w-full rounded-full items-center`}
            >
              <Animatable.Text
                animation="pulse"
                iterationCount="infinite"
                duration={1000}
                style={tw`text-center font-bold text-2xl ${
                  isButtonDisabled ? "text-gray-300" : "text-yellow-300"
                }`}
              >
                Submit
              </Animatable.Text>
            </LinearGradient>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}
