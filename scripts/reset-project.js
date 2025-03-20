#!/usr/bin/env node

/**
 * This script is used to reset the project to a blank state.
 * It deletes or moves the /app, /components, /hooks, /scripts, and /constants directories to /app-example based on user input and creates a new /app directory with an index.tsx and _layout.tsx file.
 * You can remove the `reset-project` script from package.json and safely delete this file after running it.
 */

import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

const root = FileSystem.documentDirectory;
const oldDirs = ["app", "components", "hooks", "constants", "scripts"];
const exampleDir = "app-example";
const newAppDir = "app";
const exampleDirPath = root + exampleDir;

const indexContent = `import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
`;

const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
`;

const moveDirectories = async (userInput) => {
  try {
    if (userInput === "y") {
      await FileSystem.makeDirectoryAsync(exampleDirPath, { intermediates: true });
      console.log(`📁 /${exampleDir} directory created.`);
    }

    for (const dir of oldDirs) {
      const oldDirPath = root + dir;
      if (await FileSystem.getInfoAsync(oldDirPath).then((res) => res.exists)) {
        if (userInput === "y") {
          const newDirPath = `${exampleDirPath}/${dir}`;
          await FileSystem.moveAsync({ from: oldDirPath, to: newDirPath });
          console.log(`➡️ /${dir} moved to /${exampleDir}/${dir}.`);
        } else {
          await FileSystem.deleteAsync(oldDirPath, { idempotent: true });
          console.log(`❌ /${dir} deleted.`);
        }
      } else {
        console.log(`➡️ /${dir} does not exist, skipping.`);
      }
    }

    const newAppDirPath = root + newAppDir;
    await FileSystem.makeDirectoryAsync(newAppDirPath, { intermediates: true });
    console.log("\n📁 New /app directory created.");

    await FileSystem.writeAsStringAsync(`${newAppDirPath}/index.tsx`, indexContent);
    console.log("📄 app/index.tsx created.");

    await FileSystem.writeAsStringAsync(`${newAppDirPath}/_layout.tsx`, layoutContent);
    console.log("📄 app/_layout.tsx created.");

    console.log("\n✅ Project reset complete. Next steps:");
    console.log(
      `1. Run \`npx expo start\` to start a development server.\n2. Edit app/index.tsx to edit the main screen.${
        userInput === "y"
          ? `\n3. Delete the /${exampleDir} directory when you're done referencing it.`
          : ""
      }`
    );
  } catch (error) {
    console.error(`❌ Error during script execution: ${error.message}`);
  }
};

// **Replace readline with an Alert**
Alert.alert(
  "Reset Project",
  "Do you want to move existing files to /app-example instead of deleting them?",
  [
    { text: "No", onPress: () => moveDirectories("n"), style: "cancel" },
    { text: "Yes", onPress: () => moveDirectories("y") },
  ]
);
