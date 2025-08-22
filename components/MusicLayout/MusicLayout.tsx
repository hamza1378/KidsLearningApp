// components/MusicLayout.tsx
import { useEffect, useCallback, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { MusicManager } from "@/hooks/MusicManager";
import GlobalMusicManager from "@/hooks/GlobalMusicManager";
import { AppState } from "react-native";

type Props = {
  children: React.ReactNode;
  musicKey: string;
  screenId?: string; // Optional screen identifier
};

export default function MusicLayout({ children, musicKey, screenId }: Props) {
  const hasInitialized = useRef(false);
  const globalMusicManager = GlobalMusicManager.getInstance();
  const currentScreenId = screenId || `screen_${Date.now()}`;

  // Handle app state changes
  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'active') {
        // Resume music when app becomes active
        MusicManager.resumeMusic().catch(console.error);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, []);

  // When the screen is focused, start or resume music
  useFocusEffect(
    useCallback(() => {
      // Register this screen with the global music manager
      if (!hasInitialized.current) {
        console.log(`MusicLayout: Registering screen ${currentScreenId} with music ${musicKey}`);
        globalMusicManager.registerScreen(currentScreenId, musicKey);
        hasInitialized.current = true;
      } else {
        console.log(`MusicLayout: Screen ${currentScreenId} already registered`);
      }

      return () => {
        // Unregister this screen when it loses focus
        console.log(`MusicLayout: Unregistering screen ${currentScreenId}`);
        globalMusicManager.unregisterScreen(currentScreenId);
        hasInitialized.current = false;
      };
    }, [musicKey, currentScreenId])
  );

  return <>{children}</>;
}
