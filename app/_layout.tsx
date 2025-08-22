import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { LoaderProvider } from "@/context/LoaderContext";
import { useEffect } from "react";
import AudioSessionManager from "@/hooks/AudioSessionManager";

export default function RootLayout() {
  useEffect(() => {
    // Initialize audio session early
    const initAudio = async () => {
      try {
        await AudioSessionManager.getInstance().initializeAudioSession();
      } catch (error) {
        console.error("Failed to initialize audio session in root layout:", error);
      }
    };
    
    initAudio();
  }, []);

  SplashScreen.hideAsync();

  return (
    <LoaderProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />

        <Stack.Screen name="video-player" />
        <Stack.Screen name="quiz/quiz-screen" />
        <Stack.Screen name="quiz/result" />
        <Stack.Screen name="teacher/qr-generator" />
        <Stack.Screen name="cast-to-tv" />
      </Stack>
    </LoaderProvider>
  );
}
