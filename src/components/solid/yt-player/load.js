/**
 * /**
 * Load the youtube script element into the DOM
 * @param {'http:' | 'https:'} protocol The protocol to use while setting up the youtube api script
 */
function load_yt_script(protocol) {
  let yt_script = document.createElement("script");
  yt_script.src = `${protocol}//www.youtube.com/iframe_api`;

  let scripts = document.getElementsByTagName("script");
  if (scripts.lenght > 0) {
    scripts[0].parentNode.insertBefore(yt_script, scripts[0]);
  } else {
    document.head.appendChild(yt_script);
  }
}

/**
 * Setup the youtube object and player so that it is attached to the current DOM
 *
 * @returns {Promise<{
 *   player: {
 *     cueVideoById(videoId: string, startSeconds?: number): void;
 *     cueVideoById(opts: {videoId: string, startSeconds?: number, endSeconds?: number}): void;
 *     loadVideoById(videoId: string, startSeonds: number): void;
 *     loadVideoById(opts: {videoId: string, startSecons?: number, endSeconds?: number}): void;
 *     cueVideoByUrl(mediaContentUrl: string, startSeconds?: number): void;
 *     cueVideoByUrl(opts: {mediaContentUrl: string, startSeconds?: number, endSeconds?: number}): void;
 *     loadVideoByUrl(mediaContentUrl: string, startSeconds?: number): void;
 *     loadVideoByUrl(opts: {mediaContentUrl: string, startSeconds?: number, endSeconds?: number}): void;
 *     cuePlaylist(playlist: string[], index?: number, startSeconds?: number): void;
 *     cuePlaylist(opts: {list: string[], listType?: 'playlist' | 'user_uploads', index?: number, startSeconds?: number}): void;
 *     loadPlaylist(playlist: string[], index?: number, startSeconds?: number): void;
 *     loadPlaylist(opts: {list: string[], listType?: 'playlist' | 'user_uploads', index?: number, startSeconds: number}):void;
 *     playVideo(): void;
 *     pauseVideo(): void;
 *     stopVideo(): void;
 *     seekTo(seconds: number, allowSeekAhead: boolean): void;
 *     nextVideo(): void;
 *     previousVideo(): void;
 *     playVideoAt(index: number): void;
 *     mute(): void;
 *     unMute(): void;
 *     isMuted(): boolean;
 *     setVolume(volume: number): void;
 *     getVolume(): number;
 *     setSize(width: number, height: number): Object;
 *     setPlaybackRate(suggestedRage: number): void;
 *     getAvailablePlaybackRates(): any[];
 *     setLoop(loopPlaylists: boolean): void;
 *     setShuffle(shufflePlaylist: boolean): void;
 *     getVideoLoadedFraction(): number;
 *     getPlayerState(): -1 | 0 | 1 | 2 | 3 | 5;
 *     getCurrentTime(): number;
 *     getDuration(): number;
 *     getVideoUrl(): string;
 *     getVideoEmbedCode(): string;
 *     getPlaylist(): string[];
 *     getPlaylistIndex(): number;
 *     addEventListener(event: string, listener: string): void;
 *     removeEventListener(event: string, listener: string): void;
 *     getIframe(): HTMLIFrameElement;
 *     destroy(): void;
 *     getSphericalProperties(): Object;
 *     setSphericalProperties(properties: Object): void;
 *  }}>} A promise of the youtube object
 */
export default function () {
  /**
   * A promise that is resolved when window.onYouTubeIframeAPIReady is called.
   * The promise is resolved with a reference to window.YT object.
   */
  return new Promise((resolve) => {
    // Check for the YT object and YT.Player function
    if (window.YT && window.YT.Player && window.YT.Player instanceof Function) {
      resolve(window.YT);

      return;
    } else {
      const protocol =
        window.location.protocol === "http:" ? "http:" : "https:";

      load_yt_script(protocol);
    }

    const previous = window.onYouTubeIframeAPIReady;

    // Youtube API calls this function when the script is finished setting up
    // the JavaScript for the player API.
    window.onYouTubeIframeAPIReady = () => {
      if (previous) {
        previous();
      }

      resolve(window.YT);
    };
  });
}
