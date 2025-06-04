import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import tw from "@/lib/tailwind";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#00000",
        tabBarInactiveTintColor: "#4A739C",
        tabBarHideOnKeyboard: true,

        // Tab Bar container style
        tabBarStyle: {
          ...tw` pb-4 px-`,
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb", // Tailwind's gray-200
          height: 70,
        },

        // Each tab item style
        tabBarItemStyle: {
          ...tw`rounded-xl px-2 py-1`, // round corners and internal padding
        },

        // Icon style inside tab
        tabBarIconStyle: {
          ...tw`mb-1`, // adds margin below icon before label
        },

        // Label style
        tabBarLabelStyle: {
          ...tw`text-sm font-medium`, // smaller font and medium weight
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: "Help",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
