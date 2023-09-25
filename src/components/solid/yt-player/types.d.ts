type Options = {
  height: string | number;
  width: string | number;
  videoId: string;
  playerVars: {
    autoplay: 0 | 1;
    cc_lang_pref: 0 | 1;
    cc_load_policy: 0 | 1;
    color: 0 | 1;
    controls: 0 | 1;
    disablekb: 0 | 1;
    enablejsapi: 0 | 1;
    end: 0 | 1;
    fs: 0 | 1;
    hl: 0 | 1;
    iv_load_policy: 0 | 1;
    list: 0 | 1;
    listType: 0 | 1;
    loop: 0 | 1;
    origin: 0 | 1;
    playlist: 0 | 1;
    playsinline: 0 | 1;
    rel: 0 | 1;
    start: 0 | 1;
    widget_referrer: 0 | 1;
  };
  events: {
    onReady: (e: Event) => void;
    onStateChanged: (e: Event) => void;
    onPlaybackQualityChange: (e: Event) => void;
    onPlaybackRateChange: (e: Event) => void;
    onError: (e: Event) => void;
    onApiChange: (e: Event) => void;
  };
};

export type YTPlayer = {
  cueVideoById(videoId: string, startSeconds?: number): void;
  cueVideoById(opts: {
    videoId: string;
    startSeconds?: number;
    endSeconds?: number;
  }): void;
  loadVideoById(videoId: string, startSeonds: number): void;
  loadVideoById(opts: {
    videoId: string;
    startSecons?: number;
    endSeconds?: number;
  }): void;
  cueVideoByUrl(mediaContentUrl: string, startSeconds?: number): void;
  cueVideoByUrl(opts: {
    mediaContentUrl: string;
    startSeconds?: number;
    endSeconds?: number;
  }): void;
  loadVideoByUrl(mediaContentUrl: string, startSeconds?: number): void;
  loadVideoByUrl(opts: {
    mediaContentUrl: string;
    startSeconds?: number;
    endSeconds?: number;
  }): void;
  cuePlaylist(playlist: string[], index?: number, startSeconds?: number): void;
  cuePlaylist(opts: {
    list: string[];
    listType?: "playlist" | "user_uploads";
    index?: number;
    startSeconds?: number;
  }): void;
  loadPlaylist(playlist: string[], index?: number, startSeconds?: number): void;
  loadPlaylist(opts: {
    list: string[];
    listType?: "playlist" | "user_uploads";
    index?: number;
    startSeconds: number;
  }): void;
  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  seekTo(seconds: number, allowSeekAhead?: boolean): void;
  nextVideo(): void;
  previousVideo(): void;
  playVideoAt(index: number): void;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  setVolume(volume: number): void;
  getVolume(): number;
  setSize(width: number, height: number): Object;
  setPlaybackRate(suggestedRage: number): void;
  getAvailablePlaybackRates(): any[];
  setLoop(loopPlaylists: boolean): void;
  setShuffle(shufflePlaylist: boolean): void;
  getVideoLoadedFraction(): number;
  getPlayerState(): -1 | 0 | 1 | 2 | 3 | 5;
  getCurrentTime(): number;
  getDuration(): number;
  getVideoUrl(): string;
  getVideoEmbedCode(): string;
  getPlaylist(): string[];
  getPlaylistIndex(): number;
  addEventListener(event: string, listener: string): void;
  removeEventListener(event: string, listener: string): void;
  getIframe(): HTMLIFrameElement;
  destroy(): void;
  getSphericalProperties(): Object;
  setSphericalProperties(properties: Object): void;
  on(event: string, listener: (...args: any) => void): void;
  off(event: string, listener: (...args: any) => void): void;
};

export type YTEvent = { target: YTPlayer; data?: number };

export default (
  maybeElementId: string | HTMLElement | YTPlayer,
  options: Options = {}
) => Player;
