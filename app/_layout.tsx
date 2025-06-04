import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { LoaderProvider } from "@/context/LoaderContext";

export default function RootLayout() {
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
      </Stack>
    </LoaderProvider>
  );
}
