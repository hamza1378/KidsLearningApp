import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import tw from "@/lib/tailwind";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import MusicLayout from "@/components/MusicLayout";
import * as Animatable from "react-native-animatable";
import { FontAwesome } from "@expo/vector-icons";

interface HistoryItem {
  id: string;
  title: string;
  date: string;
  duration: string;
  score: string;
  image: string;
}

const historyData: HistoryItem[] = [
  {
    id: "1",
    title: "Scan and Expand - Level 2",
    date: "Today",
    duration: "15 minutes",
    score: "95%",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBI2vavF1xtUnvoModMg3rJDThuB42CwK7zexyJG0mSjdcZr8MduuAeIiQ9sW0h9R6f98peJQNNJixxNo2zV3JZGQ6wcAq7PvA8amq8QFsWTuDW8kw0669AXLpZcnWSIbj5wMydWJeMZFQyf6Y3m5yxrsvvyN6wx000h5JCrYszHV6uIz8SPnc4glMTf7bfY3DKOMYYkxJ-z_EzXNKrH7ambMboegn6-0Ksmt_rrvwiy8-HkPdyqlafaDwbGTSyGOguCd_zgnXnxrgW",
  },
  {
    id: "2",
    title: "Building Blocks Fun - Level 1",
    date: "Yesterday",
    duration: "20 minutes",
    score: "88%",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcv709V5BepAoGOJQVDkGMyqo3BvnU535SVQpnLJJNoxgeBL2a_4IICd2y4R4_PNxYfW5Pl8PzmPCT9PvyqSf0ITDCp3vS6Ekjx8mKYirn8MmCH6fSEbM0PBjC1jbZcCgtfbP3N1K9SREYAC5K0f0PiFew9FaTULUwGN_QhflKtGKSdl2oigjW0YvmB1BdOx8_mrwr3-XmsupoSqH1v1KPDVb5NVPpkXtfp_RU3KUkdQueSPaCKo-vlstsF5SX-k_PYT1YhyaicRuy",
  },
  {
    id: "3",
    title: "Creative Canvas - Level 3",
    date: "2 days ago",
    duration: "25 minutes",
    score: "92%",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwWkR3Q1v7utjdjW4oWdZ2YlmFMmiT68v9x18pq35yxYK0_RvGwoZJT0I1fTmxGFbOzuX8w5tf00ySueBIIRbAy086mIs2KPmujJ6vuyrrJMRlewgVre5EAUI96QAcjhozfDr7BOoIr3z_9HMsZB-P2FaGXjQNW4zyxpNplp9ITLGZg-HZq7raWZIYWoXMYXEVYw6eyo-buKHCmRmFBeE7g01yv8ALQfeP5hKYn3R5Uae3nhIIJsVay1BTqCRP8kKySMs9dju4tUa9",
  },
  {
    id: "4",
    title: "English Language - Level 1",
    date: "3 days ago",
    duration: "18 minutes",
    score: "85%",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7S-gna8Q1sIfzVEuDE7h8iCjXLsiVGmX_2hQFbnVkpLx3rhn6bJ5sZ-ky0mGoWiM1aKFcFmW9OXoGdzipWEhksEXEyJX9DIqhIXbMmfHQaYg9xqOuQFwiqtBuH-nacrg-Ow1DbfoUFYERGt9iICqE5BfvKfcnHveDIlECbPWCwT0Ru8rfaLDZ-bB3Krg9VL0pP9FDvY6EwY0HZ-Bq18j0v7iXTBKsrkqa2OkQlRKwVLzULA7JBN5nNigBjttykBzGhVdqLNFuNxf0",
  },
];

const HistoryScreen: React.FC = () => {
  const getScoreColor = (score: string) => {
    const scoreNum = parseInt(score);
    if (scoreNum >= 90) return "text-green-300";
    if (scoreNum >= 80) return "text-yellow-300";
    return "text-red-300";
  };

  const getScoreIcon = (score: string) => {
    const scoreNum = parseInt(score);
    if (scoreNum >= 90) return "star";
    if (scoreNum >= 80) return "thumbs-up";
    return "heart";
  };

  return (
    <MusicLayout musicKey="landing">
      <BackgroundWrapper>
        <ScrollView
          contentContainerStyle={tw`w-full items-center pb-40`}
          showsVerticalScrollIndicator={false}
        >
          <View style={tw`w-11/12`}>
            {/* Header */}
            <Animatable.View animation="bounceIn" duration={1500}>
              <View style={tw`items-center mb-6 mt-4`}>
                <View style={tw`bg-white bg-opacity-20 rounded-full p-4 mb-4`}>
                  <FontAwesome name="history" size={40} color="white" />
                </View>
                <Text style={tw`text-white text-3xl font-bold text-center`}>
                  Learning History
                </Text>
                <Text style={tw`text-yellow-200 text-lg text-center mt-2`}>
                  Track your amazing progress!
                </Text>
              </View>
            </Animatable.View>

            {/* Stats Summary */}
            <Animatable.View animation="slideInUp" delay={300} style={tw`mb-6`}>
              <View style={tw`bg-white bg-opacity-20 border-4 border-purple-400 rounded-2xl p-4`}>
                <View style={tw`flex-row justify-around`}>
                  <View style={tw`items-center`}>
                    <Text style={tw`text-white text-2xl font-bold`}>4</Text>
                    <Text style={tw`text-purple-200 text-sm`}>Activities</Text>
                  </View>
                  <View style={tw`items-center`}>
                    <Text style={tw`text-white text-2xl font-bold`}>78</Text>
                    <Text style={tw`text-purple-200 text-sm`}>Minutes</Text>
                  </View>
                  <View style={tw`items-center`}>
                    <Text style={tw`text-white text-2xl font-bold`}>90%</Text>
                    <Text style={tw`text-purple-200 text-sm`}>Average</Text>
                  </View>
                </View>
              </View>
            </Animatable.View>

            {/* History Items */}
            {historyData.map((item, index) => (
              <Animatable.View
                key={item.id}
                animation="slideInUp"
                delay={500 + index * 200}
                style={tw`mb-4`}
              >
                <TouchableOpacity
                  style={tw`bg-white bg-opacity-20 border-4 border-green-400 rounded-2xl p-4`}
                  activeOpacity={0.8}
                >
                  <View style={tw`flex-row items-center`}>
                    <Image
                      source={{ uri: item.image }}
                      style={tw`w-16 h-16 rounded-xl mr-4`}
                    />
                    <View style={tw`flex-1`}>
                      <Text style={tw`text-white text-lg font-bold mb-1`}>
                        {item.title}
                      </Text>
                      <View style={tw`flex-row items-center mb-1`}>
                        <FontAwesome name="calendar" size={12} color="#fbbf24" />
                        <Text style={tw`text-yellow-200 text-sm ml-1`}>
                          {item.date}
                        </Text>
                      </View>
                      <View style={tw`flex-row items-center`}>
                        <FontAwesome name="clock-o" size={12} color="#fbbf24" />
                        <Text style={tw`text-yellow-200 text-sm ml-1`}>
                          {item.duration}
                        </Text>
                      </View>
                    </View>
                    <View style={tw`items-center`}>
                      <View style={tw`bg-green-400 rounded-full p-2 mb-1`}>
                        <FontAwesome 
                          name={getScoreIcon(item.score) as any} 
                          size={16} 
                          color="white" 
                        />
                      </View>
                      <Text style={tw`${getScoreColor(item.score)} text-lg font-bold`}>
                        {item.score}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animatable.View>
            ))}

            {/* Clear History Button */}
            <Animatable.View animation="fadeIn" delay={1500} style={tw`mt-8`}>
              <TouchableOpacity
                style={tw`bg-red-500 rounded-2xl p-4 items-center border-4 border-red-400`}
                activeOpacity={0.8}
              >
                <FontAwesome name="trash" size={20} color="white" style={tw`mb-2`} />
                <Text style={tw`text-white text-lg font-bold`}>
                  Clear History
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </ScrollView>
      </BackgroundWrapper>
    </MusicLayout>
  );
};

export default HistoryScreen;
