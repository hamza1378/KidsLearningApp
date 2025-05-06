import * as Speech from "expo-speech";
import { Audio } from "expo-av";

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

export const SoundManager = {
  speak: ({
    text,
    style = {},
    onDone,
    onError,
  }: SpeakOptions): void => {
    try {
      Speech.stop(); // stop current speech
      Speech.speak(text, {
        language: style.language || "en-US",
        rate: style.rate || 1,
        pitch: style.pitch || 1,
        voice: style.voice,
        onDone,
        onError,
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
    const { sound } = await Audio.Sound.createAsync(file);
    await sound.setVolumeAsync(volume);
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  },
};
