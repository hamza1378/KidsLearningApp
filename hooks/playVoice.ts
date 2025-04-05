import * as Speech from "expo-speech";

interface PropsType {
    text: string;
    rate?: number;
    pitch?: number;
};

export const playVoice = ({ text, rate = 1, pitch = 2 }: PropsType) => {
    try {
        Speech.speak(text, {
            voice: "com.apple.ttsbundle.siri_female_en-US", // Example: Siri Female Voice
            rate: rate, // Speed of speech
            pitch: pitch, // Higher pitch for a kid-like voice
        });
    } catch (error) {
        console.log(error);
    }
};