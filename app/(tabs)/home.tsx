import React from "react";
import { View, Text, FlatList, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "@/lib/tailwind";
import { Link } from "expo-router";

interface LearningItem {
  id: string;
  title: string;
  level: string;
  image: string;
}

interface AchievementItem {
  id: string;
  title: string;
  image: string;
}

const learningData: LearningItem[] = [
  {
    id: "1",
    title: "Scan And Expand",
    level: "Level 2",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBI2vavF1xtUnvoModMg3rJDThuB42CwK7zexyJG0mSjdcZr8MduuAeIiQ9sW0h9R6f98peJQNNJixxNo2zV3JZGQ6wcAq7PvA8amq8QFsWTuDW8kw0669AXLpZcnWSIbj5wMydWJeMZFQyf6Y3m5yxrsvvyN6wx000h5JCrYszHV6uIz8SPnc4glMTf7bfY3DKOMYYkxJ-z_EzXNKrH7ambMboegn6-0Ksmt_rrvwiy8-HkPdyqlafaDwbGTSyGOguCd_zgnXnxrgW",
  },
  {
    id: "2",
    title: "Building Blocks Fun",
    level: "Level 1",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAcv709V5BepAoGOJQVDkGMyqo3BvnU535SVQpnLJJNoxgeBL2a_4IICd2y4R4_PNxYfW5Pl8PzmPCT9PvyqSf0ITDCp3vS6Ekjx8mKYirn8MmCH6fSEbM0PBjC1jbZcCgtfbP3N1K9SREYAC5K0f0PiFew9FaTULUwGN_QhflKtGKSdl2oigjW0YvmB1BdOx8_mrwr3-XmsupoSqH1v1KPDVb5NVPpkXtfp_RU3KUkdQueSPaCKo-vlstsF5SX-k_PYT1YhyaicRuy",
  },
  {
    id: "3",
    title: "Creative Canvas",
    level: "Level 3",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAwWkR3Q1v7utjdjW4oWdZ2YlmFMmiT68v9x18pq35yxYK0_RvGwoZJT0I1fTmxGFbOzuX8w5tf00ySueBIIRbAy086mIs2KPmujJ6vuyrrJMRlewgVre5EAUI96QAcjhozfDr7BOoIr3z_9HMsZB-P2FaGXjQNW4zyxpNplp9ITLGZg-HZq7raWZIYWoXMYXEVYw6eyo-buKHCmRmFBeE7g01yv8ALQfeP5hKYn3R5Uae3nhIIJsVay1BTqCRP8kKySMs9dju4tUa9",
  },
  {
    id: "4",
    title: "English Language ",
    level: "Level 1",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC7S-gna8Q1sIfzVEuDE7h8iCjXLsiVGmX_2hQFbnVkpLx3rhn6bJ5sZ-ky0mGoWiM1aKFcFmW9OXoGdzipWEhksEXEyJX9DIqhIXbMmfHQaYg9xqOuQFwiqtBuH-nacrg-Ow1DbfoUFYERGt9iICqE5BfvKfcnHveDIlECbPWCwT0Ru8rfaLDZ-bB3Krg9VL0pP9FDvY6EwY0HZ-Bq18j0v7iXTBKsrkqa2OkQlRKwVLzULA7JBN5nNigBjttykBzGhVdqLNFuNxf0",
  },
];

const achievementData: AchievementItem[] = [
  {
    id: "1",
    title: "Math Whiz",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJGhEe34I1PMY-IOj8x-s0SVUVpMkNbOH-CiU0_xXECo3Hj5uKULV6R8IMS0mv6OW6MD7TNBz9TQy5RTluFU-SzE17qUi_U6q79hEVUbglcmFum7IHk3rxLGZO62iiwQidZpbGtLrmv2IO_2yrn1DLgwLtLAv8SJvt6ZRtxI8UTinRSbWbxb0LAbFAbbAtXSwBh_s10zjFLgYYRdXqs6NJdyCBk_ALXT_czE2w0o7Ofr9MOpuQsek-QkbzyJxat0Vh0uEGEnHJejVL",
  },
  {
    id: "2",
    title: "Science Star",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC2AFDC9Xplqb_5PlT139aKDk7Ykyn7Jmv82cpZJsSpDnN5dQzr2GJpIXhx9euThAPj4jNOpWXOtQfxmqMPUFQP-D03qWSZUvnKAcVUPY9eawlSifxVK_iZyKmX-7pkZviBRXZVuMlrsb91GSvj9Ilf5ogsjO-Ge_mlsmpC_gQn0zutuF8GW-yr3VtVZRGdlV0OvtCT4UslKE22w-tJCAhI2yAbomLGmSL719LERcypLuIIZIjhK_ZcOFsGWc0mUw6FjzAMGvMjAiVG",
  },
  {
    id: "3",
    title: "Language Ace",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAYBfScZu41Qb8F2gnqzfCWKmVfHeBIk-OWOW2vB7IolZLR232gIXscpVSm6zXcGIrwNZgIM6FaNxsF9jQMpOjA0MQtjBKf6kVb0x5Di7M33sdj6CXL4TOReihQ_k23ww-j-DGrZADigvkgTdxftKbpr2OQMw_h2EKSQu_BIEZwGJa28g9dVisUTNko1nhVinzVB5A_SBHxDMoTJJUWP0MWBvO_0Wtgq5EoFxRkzRwYIm4aZbCQGVRMp7iCGtqSZfuUzhoqHwPXwftN",
  },
];

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={tw`bg-gray-50 flex-1`}>
      <ScrollView
        contentContainerStyle={tw`pb-5`}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View style={tw`flex-row items-center bg-gray-50 p-2 pb-2`}>
            <View style={tw`w-12 h-12 shrink-0 items-center`}>
              <Image
                source={{
                  uri: "https://assets.grok.com/users/f108d2d9-d86c-47df-8310-03e478c0e92e/VYkJCsjY7vHXeggw-profile-picture.webp",
                }}
                style={tw`w-8 h-8 rounded-full`}
              />
            </View>
            <Text
              style={tw`text-[#101519] text-lg font-bold flex-1 text-center pr-12`}
            >
              Learn with Leo
            </Text>
          </View>

          <Text style={tw`text-[#101519] text-[22px] font-bold px-4 pb-3 pt-5`}>
            Continue Learning
          </Text>
          <View style={tw`flex-1`}>
            <FlatList
              horizontal
              data={learningData}
              renderItem={({ item }) => (
                <Link href={"/courses/course"} style={tw`mx-2`}>
                  <View style={tw`flex-col gap-4 rounded-lg w-40 mx-2`}>
                    <Image
                      source={{ uri: item.image }}
                      style={tw`w-full aspect-square rounded-xl`}
                    />
                    <View>
                      <Text style={tw`text-[#101519] text-base font-medium`}>
                        {item.title}
                      </Text>
                      <Text style={tw`text-[#5a748c] text-sm font-normal`}>
                        {item.level}
                      </Text>
                    </View>
                  </View>
                </Link>
              )}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={tw`px-4`}
            />
          </View>

          <Text style={tw`text-[#101519] text-[22px] font-bold px-4 pb-3 pt-5`}>
            Achievements
          </Text>
          <View style={tw`flex-row flex-wrap gap-3 px-4 `}>
            {achievementData.map((item) => (
              <View key={item.id} style={tw`flex-col gap-3 pb-3 w-[48%]`}>
                <Image
                  source={{ uri: item.image }}
                  style={tw`w-full aspect-square rounded-xl`}
                />
                <Text style={tw`text-[#101519] text-base font-medium`}>
                  {item.title}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
