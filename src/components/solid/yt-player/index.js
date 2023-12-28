import loadYT from "./load.js";
import Player from "./player.js";
import { EventEmitter } from "./event-emitter.js";

export { ERROR, STATE } from "./constants";

/**
 * @see https://developers.google.com/youtube/iframe_api_reference
 * @typedef {import('./player.js').YT.Player} YT.Player
 */

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#Events
 * @typedef {{target: YT.Player, data?: number}} YT.Event
 */

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#Loading_a_Video_Player
 * @typedef {{
 *  height?: string | number;
 *  width?: string | number;
 *  videoId?: string;
 *  playerVars?: {
 *      autoplay?: 0 | 1
 *      cc_lang_pref?: 0 | 1
 *      cc_load_policy?: 0 | 1
 *      color?: 0 | 1
 *      controls?: 0 | 1
 *      disablekb?: 0 | 1
 *      enablejsapi?: 0 | 1
 *      end?: 0 | 1
 *      fs?: 0 | 1
 *      hl?: 0 | 1
 *      iv_load_policy?: 0 | 1
 *      list?: 0 | 1
 *      listType?: 0 | 1
 *      loop?: 0 | 1
 *      origin?: 0 | 1
 *      playlist?: 0 | 1
 *      playsinline?: 0 | 1
 *      rel?: 0 | 1
 *      start?: 0 | 1
 *      widget_referrer?: 0 | 1
 *  };
 *   events?: {
 *       onReady?: (e: YT.Event) => void
 *       onStateChanged?: (e: YT.Event) => void
 *       onPlaybackQualityChange?: (e: YT.Event) => void
 *       onPlaybackRateChange?: (e: YT.Event) => void
 *       onError?: (e: YT.Event) => void
 *       onApiChange?: (e: YT.Event) => void
 *   };
 * }} YT.Options
 */

let youtubeIframeAPI;

/**
 * A factory function used to produce an instance of YT.Player and queue function calls and proxy events of the resulting object.
 *
 * @param {string  | HTMLElement | YT.Player} maybeElementId Either An existing YT.Player instance,
 * the DOM element or the id of the HTML element where the API will insert an <iframe>.
 * @param {YT.Options} options Set of configuration options for the YT.Player
 *  (Ignored when using an existing YT.Player instance).
 * @returns {YT.Player}
 */
export function YoutubePlayer(maybeElementId, options = {}) {
  const emitter = new EventEmitter();

  if (!youtubeIframeAPI) {
    youtubeIframeAPI = loadYT();
  }

  if (options.events) {
    throw new Error("Event handlers cannot be overwritten.");
  }

  // Setup events so they are renamed and go throught the custom emitter
  options.events = Player.proxyEvents(emitter);

  if (!options.playerVars) {
    options.playerVars = { enablejsapi: 1 };
  } else {
    options.playerVars.enablejsapi = 1;
  }

  if (
    typeof maybeElementId === "string" &&
    !document.getElementById(maybeElementId)
  ) {
    throw new Error('Element "' + maybeElementId + '" does not exist.');
  }

  const playerReady = new Promise((resolve) => {
    if (
      typeof maybeElementId === "object" &&
      maybeElementId.playVideo instanceof Function
    ) {
      const player = maybeElementId;

      resolve(player);
    } else {
      youtubeIframeAPI.then((YT) => {
        const player = new YT.Player(maybeElementId, options);

        emitter.once("ready", (e) => {
            resolve(player);
        });

        return;
      });
    }
  });

  const player = Player.bufferedPlayer(playerReady, emitter);
  return player;
}
