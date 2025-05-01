import { Audio } from "expo-av";

export const playClickSound = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require("../assets/audio/buttonPop.mp3")
  );
  await sound.playAsync();
  setTimeout(() => {
    sound.unloadAsync();
  }, 1000); // unload after sound plays
};
