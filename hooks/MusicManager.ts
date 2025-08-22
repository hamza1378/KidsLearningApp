// hooks/MusicManager.ts
import { Audio } from "expo-av";
import AudioSessionManager from "./AudioSessionManager";

let soundInstance: Audio.Sound | null = null;
let currentMusicKey: string | null = null;
let isPlaying = false;

const audioSessionManager = AudioSessionManager.getInstance();

const musicFiles: Record<string, any> = {
  landing: require("../assets/musics/bgm1.mp3"),
};

export const MusicManager = {
  async playMusic(musicKey: string): Promise<void> {
    try {
      console.log(`Attempting to play music: ${musicKey}, current: ${currentMusicKey}, isPlaying: ${isPlaying}`);
      
      // Check if music is already playing to prevent duplication
      if (musicKey === currentMusicKey && soundInstance && isPlaying) {
        console.log("Music already playing, skipping");
        return; // Do not play if the same music is already playing
      }

      // Stop and unload previous music if any is playing
      if (soundInstance) {
        try {
          console.log("Stopping previous music");
          await soundInstance.stopAsync();
          await soundInstance.unloadAsync();
        } catch (error) {
          console.warn("Error stopping previous music:", error);
        }
        soundInstance = null;
        isPlaying = false;
      }

      // Only play if app is active
      if (!audioSessionManager.isAppInForeground()) {
        console.log("App is in background, music will be played when app becomes active");
        currentMusicKey = musicKey;
        return;
      }

      // Initialize audio session
      await audioSessionManager.initializeAudioSession();

      // Create a new sound instance and play the new music
      console.log("Creating new sound instance");
      const sound = await audioSessionManager.createSoundWithErrorHandling(musicFiles[musicKey]);
      
      if (!sound) {
        console.error("Failed to create sound instance");
        return;
      }

      await sound.setIsLoopingAsync(true);
      await sound.setVolumeAsync(0.3);
      
      // Add cleanup on finish
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync().catch(console.error);
          isPlaying = false;
        }
        if (status.isLoaded && status.error) {
          console.error("Music playback error:", status.error);
          isPlaying = false;
        }
        if (status.isLoaded && status.isPlaying !== undefined) {
          isPlaying = status.isPlaying;
        }
      });

      console.log("Starting music playback");
      await sound.playAsync();
      soundInstance = sound;
      currentMusicKey = musicKey;
      isPlaying = true;
      console.log("Music started successfully");
    } catch (error) {
      console.error("Failed to load/play sound:", error);
      // Reset state on error
      soundInstance = null;
      currentMusicKey = null;
      isPlaying = false;
      
      // Try to reset audio session on error
      try {
        await audioSessionManager.resetAudioSession();
      } catch (resetError) {
        console.error("Failed to reset audio session:", resetError);
      }
    }
  },

  async stopMusic(): Promise<void> {
    if (soundInstance) {
      try {
        console.log("Stopping music");
        await soundInstance.stopAsync();
        await soundInstance.unloadAsync();
      } catch (error) {
        console.warn("Error stopping music:", error);
      }
      soundInstance = null;
      currentMusicKey = null;
      isPlaying = false;
    }
  },

  async fadeOutAndStop(): Promise<void> {
    if (!soundInstance) return;

    try {
      console.log("Fading out music");
      for (let vol = 0.3; vol >= 0; vol -= 0.05) {
        await soundInstance.setVolumeAsync(vol);
        await new Promise((r) => setTimeout(r, 150));
      }
      await soundInstance.stopAsync();
      await soundInstance.unloadAsync();
      soundInstance = null;
      currentMusicKey = null;
      isPlaying = false;
    } catch (error) {
      console.error("Fade out error:", error);
      // Force cleanup on error
      try {
        if (soundInstance) {
          await soundInstance.unloadAsync();
        }
      } catch (cleanupError) {
        console.error("Cleanup error:", cleanupError);
      }
      soundInstance = null;
      currentMusicKey = null;
      isPlaying = false;
    }
  },

  // Method to resume music when app becomes active
  async resumeMusic(): Promise<void> {
    if (currentMusicKey && !soundInstance && audioSessionManager.isAppInForeground()) {
      console.log("Resuming music");
      await this.playMusic(currentMusicKey);
    }
  },

  // Method to check if music is currently playing
  isMusicPlaying(): boolean {
    return isPlaying && soundInstance !== null;
  },

  // Method to get current music key
  getCurrentMusicKey(): string | null {
    return currentMusicKey;
  },
};
