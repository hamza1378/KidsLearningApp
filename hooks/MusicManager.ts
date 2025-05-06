// hooks/MusicManager.ts
import { Audio } from "expo-av";

let soundInstance: Audio.Sound | null = null;
let currentMusicKey: string | null = null;

const musicFiles: Record<string, any> = {
  landing: require("../assets/musics/bgm1.mp3"),
};

export const MusicManager = {
  async playMusic(musicKey: string): Promise<void> {
    // Check if music is already playing to prevent duplication
    if (musicKey === currentMusicKey && soundInstance) {
      return; // Do not play if the same music is already playing
    }

    // Stop and unload previous music if any is playing
    if (soundInstance) {
      await soundInstance.stopAsync();
      await soundInstance.unloadAsync();
      soundInstance = null;
    }

    // Create a new sound instance and play the new music
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(musicFiles[musicKey]);
      await sound.setIsLoopingAsync(true); // Loop music if necessary
      await sound.setVolumeAsync(0.3); // Adjust volume
      await sound.playAsync(); // Play the music
      soundInstance = sound;
      currentMusicKey = musicKey; // Track the current music being played
    } catch (error) {
      console.error("Failed to load/play sound:", error);
    }
  },

  async stopMusic(): Promise<void> {
    if (soundInstance) {
      await soundInstance.stopAsync();
      await soundInstance.unloadAsync();
      soundInstance = null;
      currentMusicKey = null;
    }
  },

  async fadeOutAndStop(): Promise<void> {
    if (!soundInstance) return;

    try {
      for (let vol = 0.3; vol >= 0; vol -= 0.05) {
        await soundInstance.setVolumeAsync(vol);
        await new Promise((r) => setTimeout(r, 150)); // Fade out
      }
      await soundInstance.stopAsync();
      await soundInstance.unloadAsync();
      soundInstance = null;
      currentMusicKey = null;
    } catch (error) {
      console.error("Fade out error:", error);
    }
  },
};
