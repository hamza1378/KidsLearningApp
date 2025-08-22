import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import tw from "@/lib/tailwind";
import { Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useRef, useEffect } from "react";

export default function TabLayout() {
  // Animation for QR scanner tab
  const qrAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(qrAnim, { toValue: 1.1, duration: 1000, useNativeDriver: true }),
        Animated.timing(qrAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0f172a",
        tabBarInactiveTintColor: "#64748b",
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,

        // Tab Bar container style
        tabBarStyle: {
          backgroundColor: '#faf6e6',
          borderRadius: 24,
          marginHorizontal: 16,
          marginBottom: 8,
          paddingTop: 5,
          height: 66,
          paddingHorizontal: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 20,
          elevation: 12,
          zIndex: 200,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          borderColor: '#f8fafc',
          borderTopColor: '#e2e8f0',
        },

        // Each tab item style
        tabBarItemStyle: {
          borderRadius: 20,
          paddingHorizontal: 8,
          paddingVertical: 8,
          marginHorizontal: 2,
        },


        // Label style
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          textTransform: 'none',
          letterSpacing: 0.3,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Animated.View 
              style={[
                tw.style('w-12 h-12 rounded-2xl items-center justify-center', {
                  backgroundColor: focused ? '#e0f2fe' : 'transparent',
                  borderWidth: focused ? 2 : 0,
                  borderColor: focused ? '#0ea5e9' : 'transparent',
                  shadowColor: focused ? '#0ea5e9' : 'transparent',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: focused ? 0.1 : 0,
                  shadowRadius: 4,
                  elevation: focused ? 4 : 0,
                }),
                { transform: [{ scale: focused ? 1.15 : 1 }] }
              ]}
            >
              <FontAwesome 
                size={26} 
                name="home" 
                color={focused ? '#0ea5e9' : '#64748b'} 
              />
            </Animated.View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="help"
        options={{
          title: "Help",
          tabBarIcon: ({ focused }) => (
            <Animated.View 
              style={[
                tw.style('w-12 h-12 rounded-2xl items-center justify-center', {
                  backgroundColor: focused ? '#fef3c7' : 'transparent',
                  borderWidth: focused ? 2 : 0,
                  borderColor: focused ? '#f59e0b' : 'transparent',
                  shadowColor: focused ? '#f59e0b' : 'transparent',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: focused ? 0.3 : 0,
                  shadowRadius: 4,
                  elevation: focused ? 4 : 0,
                }),
                { transform: [{ scale: focused ? 1.15 : 1 }] }
              ]}
            >
              <FontAwesome 
                size={26} 
                name="user" 
                color={focused ? '#f59e0b' : '#64748b'} 
              />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="qr-scanner"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Animated.View 
              style={[
                tw.style('w-14 h-14 -mt-7 rounded-2xl items-center justify-center ', {
                  backgroundColor: focused ? '#1dd7e0' : '#f0f9ff',
                  borderWidth: 2,
                  borderColor: focused ? '#0ea5e9' : '#e0f2fe',
                  shadowColor: focused ? '#1dd7e0' : '#000',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: focused ? 0.4 : 0.15,
                  shadowRadius: 12,
                  elevation: focused ? 12 : 8,
                }),
                { transform: [{ scale: focused ? qrAnim : 1 }] }
              ]}
            >
              <Ionicons 
                name="qr-code" 
                size={36}
                color={focused ? '#ffffff' : '#1dd7e0'} 
              />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ focused }) => (
            <Animated.View 
              style={[
                tw.style('w-12 h-12 rounded-2xl items-center justify-center', {
                  backgroundColor: focused ? '#fce7f3' : 'transparent',
                  borderWidth: focused ? 2 : 0,
                  borderColor: focused ? '#ec4899' : 'transparent',
                  shadowColor: focused ? '#ec4899' : 'transparent',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: focused ? 0.3 : 0,
                  shadowRadius: 4,
                  elevation: focused ? 4 : 0,
                }),
                { transform: [{ scale: focused ? 1.15 : 1 }] }
              ]}
            >
              <FontAwesome 
                size={26} 
                name="history" 
                color={focused ? '#ec4899' : '#64748b'} 
              />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <Animated.View 
              style={[
                tw.style('w-12 h-12 rounded-2xl items-center justify-center', {
                  backgroundColor: focused ? '#e0e7ff' : 'transparent',
                  borderWidth: focused ? 2 : 0,
                  borderColor: focused ? '#6366f1' : 'transparent',
                  shadowColor: focused ? '#6366f1' : 'transparent',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: focused ? 0.3 : 0,
                  shadowRadius: 4,
                  elevation: focused ? 4 : 0,
                }),
                { transform: [{ scale: focused ? 1.15 : 1 }] }
              ]}
            >
              <FontAwesome 
                size={26} 
                name="cog" 
                color={focused ? '#6366f1' : '#64748b'} 
              />
            </Animated.View>
          ),
        }}
      />
    </Tabs>
  );
}
