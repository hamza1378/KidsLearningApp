import { Audio } from "expo-av";
import { AppState } from "react-native";

class AudioSessionManager {
  private static instance: AudioSessionManager;
  private isInitialized = false;
  private isAppActive = true;
  private initializationPromise: Promise<void> | null = null;

  private constructor() {
    this.setupAppStateListener();
  }

  public static getInstance(): AudioSessionManager {
    if (!AudioSessionManager.instance) {
      AudioSessionManager.instance = new AudioSessionManager();
    }
    return AudioSessionManager.instance;
  }

  private setupAppStateListener() {
    AppState.addEventListener('change', (nextAppState) => {
      this.isAppActive = nextAppState === 'active';
      console.log(`App state changed to: ${nextAppState}`);
    });
  }

  public async initializeAudioSession(): Promise<void> {
    // If already initializing, wait for that to complete
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    // If already initialized, return immediately
    if (this.isInitialized) {
      return;
    }

    // Create a new initialization promise
    this.initializationPromise = this.performInitialization();
    return this.initializationPromise;
  }

  private async performInitialization(): Promise<void> {
    try {
      console.log("Initializing audio session...");
      
      // Set audio mode with proper error handling
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
      
      this.isInitialized = true;
      console.log("Audio session initialized successfully");
    } catch (error) {
      console.error("Failed to initialize audio session:", error);
      this.isInitialized = false;
      throw error;
    } finally {
      this.initializationPromise = null;
    }
  }

  public isAppInForeground(): boolean {
    return this.isAppActive;
  }

  public async playSoundSafely(soundFunction: () => Promise<void>): Promise<void> {
    try {
      if (!this.isAppActive) {
        console.log("App is in background, skipping audio playback");
        return;
      }

      // Ensure audio session is initialized
      await this.initializeAudioSession();

      await soundFunction();
    } catch (error) {
      console.error("Error playing sound safely:", error);
    }
  }

  public async createSoundWithErrorHandling(file: any): Promise<Audio.Sound> {
    try {
      // Ensure audio session is initialized before creating sound
      await this.initializeAudioSession();

      console.log("Creating sound with file:", file);
      const { sound } = await Audio.Sound.createAsync(file);
      
      // Add error handling for the sound
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.error) {
          console.error("Audio playback error:", status.error);
        }
      });

      return sound;
    } catch (error) {
      console.error("Failed to create sound:", error);
      // Reset initialization state on error
      this.isInitialized = false;
      this.initializationPromise = null;
      throw error;
    }
  }

  // Method to reset audio session (useful for debugging)
  public async resetAudioSession(): Promise<void> {
    try {
      this.isInitialized = false;
      this.initializationPromise = null;
      console.log("Audio session reset");
    } catch (error) {
      console.error("Error resetting audio session:", error);
    }
  }
}

export default AudioSessionManager; 