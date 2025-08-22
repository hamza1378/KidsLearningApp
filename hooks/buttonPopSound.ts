import { Audio } from "expo-av";
import AudioSessionManager from "./AudioSessionManager";

const audioSessionManager = AudioSessionManager.getInstance();

export const playClickSound = async () => {
  try {
    // Only play sound if app is active
    if (!audioSessionManager.isAppInForeground()) {
      console.log("App is in background, skipping button sound");
      return;
    }

    console.log("Playing button click sound");
    const sound = await audioSessionManager.createSoundWithErrorHandling(
      require("../assets/audio/buttonPop.mp3")
    );
    
    if (!sound) {
      console.error("Failed to create button sound");
      return;
    }
    
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync().catch(console.error);
      }
      if (status.isLoaded && status.error) {
        console.error("Button sound playback error:", status.error);
      }
    });

    await sound.playAsync();
    console.log("Button sound started");
    
    // Cleanup after 1 second
    setTimeout(() => {
      sound.unloadAsync().catch(console.error);
    }, 1000);
  } catch (error) {
    console.error("Failed to play button sound:", error);
  }
};
