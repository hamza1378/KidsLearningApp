import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from "expo-splash-screen";

export default function RootLayout() {
  SplashScreen.hideAsync(); // Ensure the splash screen stays until fonts are loaded

  return (
    <>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
