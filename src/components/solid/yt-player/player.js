import { EventEmitter } from './event-emitter';
import {eventNames, functionNames} from './constants';

/**
 * @typedef {{
 *    cueVideoById(videoId: string, startSeconds?: number): void;
 *    cueVideoById(opts: {videoId: string, startSeconds?: number, endSeconds?: number}): void;
 *    loadVideoById(videoId: string, startSeonds: number): void;
 *    loadVideoById(opts: {videoId: string, startSecons?: number, endSeconds?: number}): void;
 *    cueVideoByUrl(mediaContentUrl: string, startSeconds?: number): void;
 *    cueVideoByUrl(opts: {mediaContentUrl: string, startSeconds?: number, endSeconds?: number}): void;
 *    loadVideoByUrl(mediaContentUrl: string, startSeconds?: number): void;
 *    loadVideoByUrl(opts: {mediaContentUrl: string, startSeconds?: number, endSeconds?: number}): void;
 *    cuePlaylist(playlist: string[], index?: number, startSeconds?: number): void;
 *    cuePlaylist(opts: {list: string[], listType?: 'playlist' | 'user_uploads', index?: number, startSeconds?: number}): void;
 *    loadPlaylist(playlist: string[], index?: number, startSeconds?: number): void;
 *    loadPlaylist(opts: {list: string[], listType?: 'playlist' | 'user_uploads', index?: number, startSeconds: number}):void;
 *    playVideo(): void;
 *    pauseVideo(): void;
 *    stopVideo(): void;
 *    seekTo(seconds: number, allowSeekAhead: boolean): void;
 *    nextVideo(): void;
 *    previousVideo(): void;
 *    playVideoAt(index: number): void;
 *    mute(): void;
 *    unMute(): void;
 *    isMuted(): boolean;
 *    setVolume(volume: number): void;
 *    getVolume(): number;
 *    setSize(width: number, height: number): Object;
 *    setPlaybackRate(suggestedRage: number): void;
 *    getAvailablePlaybackRates(): any[];
 *    setLoop(loopPlaylists: boolean): void;
 *    setShuffle(shufflePlaylist: boolean): void;
 *    getVideoLoadedFraction(): number;
 *    getPlayerState(): -1 | 0 | 1 | 2 | 3 | 5;
 *    getCurrentTime(): number;
 *    getDuration(): number;
 *    getVideoUrl(): string;
 *    getVideoEmbedCode(): string;
 *    getPlaylist(): string[];
 *    getPlaylistIndex(): number;
 *    addEventListener(event: string, listener: string): void;
 *    removeEventListener(event: string, listener: string): void;
 *    getIframe(): HTMLIFrameElement;
 *    destroy(): void;
 *    getSphericalProperties(): Object;
 *    setSphericalProperties(properties: Object): void;
 *    on(event: string, listener: (...args) => void): void;
 *    off(event: string, listener: (...args) => void): void;
 *   }} YT.Player
 */

/**
 * @type {{
 *  proxyEvents(emitter: EventEmitter) => {[key: string]: (event) => void}
 *  bufferedPlayer(playerReady: Promise, emitter: EventEmitter) => YT.Player
 *  }}
 */
const YouTubePlayer = {};

/**
 * Construct an object that defines an event handler for all of the YouTube
 * player events. Proxy captured events through an event emitter.
 *
 * @todo Capture event parameters.
 * @see https://developers.google.com/youtube/iframe_api_reference#Events
 */
YouTubePlayer.proxyEvents = (emitter) => {
    const events = {};
  
    for (const eventName of eventNames) {
      const onEventName = 'on' + eventName.slice(0, 1).toUpperCase() + eventName.slice(1);
  
      events[onEventName] = event => {  
        emitter.emit(eventName, event);
      };
    }
  
    return events;
  };

/**
 * Delays player API method execution until player state is ready.
 *
 * @param playerAPIReady Promise that resolves when player is ready.
 * @returns {YT.Player}
 */
YouTubePlayer.bufferedPlayer = (playerAPIReady, emitter) => {
  const functions = {
    "__emitter__": emitter,
    on: (...args) => emitter.on(...args),
    off: (...args) => emitter.remove(...args)
  };

  for (const functionName of functionNames) {
    functions[functionName] = (...args) => {
      return playerAPIReady.then((player) => {
        return player[functionName](...args);
      });
    };
  }
  return functions;
};

export default YouTubePlayer;
