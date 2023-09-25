/**
 * @see https://developers.google.com/youtube/iframe_api_reference#Events
 */
export const yt_events = [
    "onReady",
    "onStateChanged",
    "onPlaybackQualityChange",
    "onPlaybackRateChange",
    "onError",
    "onApiChange",
  ];

/**
 * @see https://developers.google.com/youtube/player_parameters#Parameters
 * The available player variables/parameters to modify the player
 */
export const yt_player_vars = [
    "autoplay",
    "cc_lang_pref",
    "cc_load_policy",
    "color",
    "controls",
    "disablekb",
    "enablejsapi",
    "end",
    "fs",
    "hl",
    "iv_load_policy",
    "list",
    "listType",
    "loop",
    "origin",
    "playlist",
    "playsinline",
    "rel",
    "start",
    "widget_referrer",
  ];

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#Events
 * `volumeChange` is not officially supported but seems to work
 * it emits an object: `{volume: 82.6923076923077, muted: false}`
 * 
 * @type {string[]}
 */
export const eventNames = ['ready', 'stateChange', 'playbackQualityChange', 'playbackRateChange', 'error', 'apiChange', 'volumeChange'];

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#Functions
 * @type {string[]}
 */
export const functionNames = ['cueVideoById', 'loadVideoById', 'cueVideoByUrl', 'loadVideoByUrl', 'playVideo', 'pauseVideo', 'stopVideo', 'getVideoLoadedFraction', 'cuePlaylist', 'loadPlaylist', 'nextVideo', 'previousVideo', 'playVideoAt', 'setShuffle', 'setLoop', 'getPlaylist', 'getPlaylistIndex', 'setOption', 'mute', 'unMute', 'isMuted', 'setVolume', 'getVolume', 'seekTo', 'getPlayerState', 'getPlaybackRate', 'setPlaybackRate', 'getAvailablePlaybackRates', 'getPlaybackQuality', 'setPlaybackQuality', 'getAvailableQualityLevels', 'getCurrentTime', 'getDuration', 'removeEventListener', 'getVideoUrl', 'getVideoEmbedCode', 'getOptions', 'getOption', 'addEventListener', 'destroy', 'setSize', 'getIframe', 'getSphericalProperties', 'setSphericalProperties'];

/** 
 * @type {{
 *  BUFFERING: 3,
 *  ENDED: 0,
 *  PAUSED: 2,
 *  PLAYING: 1,
 *  UNSTARTED: -1,
 *  VIDEO_CUED: 5    
 * }}
 */
export const STATE = {
  BUFFERING: 3,
  ENDED: 0,
  PAUSED: 2,
  PLAYING: 1,
  UNSTARTED: -1,
  VIDEO_CUED: 5
};

/** @type {{[key: number]: string}} */
export const ERROR = {
    2: 'Request contains an invalid.',
    5: 'Request content cannot be played in an HTML5 player or the player cannot play the video at this time.',
    100: 'The owner of the requested video does not allow it to be played in embedded players.',
    101: 'The owner of the requested video does not allow it to be played in embedded players.'
}
