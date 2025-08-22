import * as Speech from "expo-speech";
import { Audio } from "expo-av";
import AudioSessionManager from "./AudioSessionManager";

type VoiceStyle = {
  rate?: number;
  pitch?: number;
  language?: string;
  voice?: string;
};

type SpeakOptions = {
  text: string;
  style?: VoiceStyle;
  onDone?: () => void;
  onError?: (err: any) => void;
};

type PlaySoundEffectOptions = {
  file: any; // require(path)
  volume?: number;
};

const audioSessionManager = AudioSessionManager.getInstance();

export const SoundManager = {
  speak: ({
    text,
    style = {},
    onDone,
    onError,
  }: SpeakOptions): void => {
    try {
      // Only speak if app is active
      if (!audioSessionManager.isAppInForeground()) {
        console.log("App is in background, skipping speech");
        onDone?.();
        return;
      }

      console.log("Starting speech synthesis");
      Speech.stop(); // stop current speech
      Speech.speak(text, {
        language: style.language || "en-US",
        rate: style.rate || 1,
        pitch: style.pitch || 1,
        voice: style.voice,
        onDone: () => {
          console.log("Speech completed");
          onDone?.();
        },
        onError: (error) => {
          console.error("Speech error:", error);
          onError?.(error);
        },
      });
    } catch (error) {
      console.error("Speech error:", error);
      onError?.(error);
    }
  },

  speakAsync: (options: SpeakOptions): Promise<void> =>
    new Promise((resolve, reject) => {
      SoundManager.speak({
        ...options,
        onDone: resolve,
        onError: reject,
      });
    }),

  playEffect: async ({ file, volume = 1 }: PlaySoundEffectOptions) => {
    try {
      // Only play sound effects if app is active
      if (!audioSessionManager.isAppInForeground()) {
        console.log("App is in background, skipping sound effect");
        return;
      }

      console.log("Playing sound effect");
      const sound = await audioSessionManager.createSoundWithErrorHandling(file);
      
      if (!sound) {
        console.error("Failed to create sound effect");
        return;
      }

      await sound.setVolumeAsync(volume);
      
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync().catch(console.error);
        }
        if (status.isLoaded && status.error) {
          console.error("Sound effect playback error:", status.error);
        }
      });

      await sound.playAsync();
      console.log("Sound effect started");
    } catch (error) {
      console.error("Failed to play sound effect:", error);
    }
  },
};
