// components/MusicLayout.tsx
import { useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { MusicManager } from "@/hooks/MusicManager";

type Props = {
  children: React.ReactNode;
  musicKey: string;
};

export default function MusicLayout({ children, musicKey }: Props) {
  // When the screen is focused, start or resume music
  useFocusEffect(
    useCallback(() => {
      MusicManager.playMusic(musicKey); // Play the music when screen is focused

      return () => {
        MusicManager.stopMusic(); // Stop the music when the screen is unfocused
      };
    }, [musicKey])
  );

  return <>{children}</>;
}
