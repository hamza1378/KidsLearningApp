import { MusicManager } from "./MusicManager";

class GlobalMusicManager {
  private static instance: GlobalMusicManager;
  private activeScreens: Set<string> = new Set();
  private currentMusicKey: string | null = null;

  private constructor() {}

  public static getInstance(): GlobalMusicManager {
    if (!GlobalMusicManager.instance) {
      GlobalMusicManager.instance = new GlobalMusicManager();
    }
    return GlobalMusicManager.instance;
  }

  public registerScreen(screenId: string, musicKey: string): void {
    console.log(`GlobalMusicManager: Registering screen ${screenId} with music ${musicKey}`);
    this.activeScreens.add(screenId);
    
    // Only start music if it's not already playing or if it's a different music key
    if (!this.currentMusicKey || this.currentMusicKey !== musicKey) {
      this.currentMusicKey = musicKey;
      MusicManager.playMusic(musicKey).catch(console.error);
    }
  }

  public unregisterScreen(screenId: string): void {
    console.log(`GlobalMusicManager: Unregistering screen ${screenId}`);
    this.activeScreens.delete(screenId);
    
    // If no screens are active, stop the music
    if (this.activeScreens.size === 0) {
      console.log("GlobalMusicManager: No active screens, stopping music");
      this.currentMusicKey = null;
      MusicManager.stopMusic().catch(console.error);
    }
  }

  public getActiveScreens(): string[] {
    return Array.from(this.activeScreens);
  }

  public getCurrentMusicKey(): string | null {
    return this.currentMusicKey;
  }

  public isMusicPlaying(): boolean {
    return MusicManager.isMusicPlaying();
  }
}

export default GlobalMusicManager; 