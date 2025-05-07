import { Stack } from "expo-router";

export default function RootLayout() {

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="nickname"
    >
      <Stack.Screen name="nickname" />
      <Stack.Screen name="securityquestions" />
      <Stack.Screen name="subjectselection" />
      <Stack.Screen name="avatarcustomization" />
      <Stack.Screen name="success" />
    </Stack>
  );
}
