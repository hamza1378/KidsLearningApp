import { Stack } from "expo-router";

export default function RootLayout() {

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="signin"
    >
      <Stack.Screen name="signin" />
      <Stack.Screen name="securityquestions" />
      
    </Stack>
  );
}
