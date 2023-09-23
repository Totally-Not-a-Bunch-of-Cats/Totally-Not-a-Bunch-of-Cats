import type {
  CarrouselAttributes,
  IFrameAttributes,
  ImageAttributes,
  VideoAttributes,
} from "./types";
import { CarrouselContainer } from "./types";

export const image = (
  args: ImageAttributes & CarrouselAttributes
): CarrouselContainer => {
  return new CarrouselContainer("image", args);
};

export const video = (
  args: VideoAttributes & CarrouselAttributes
): CarrouselContainer => {
  return new CarrouselContainer("video", args);
};

export const youtube = (
    args: IFrameAttributes & CarrouselAttributes
): CarrouselContainer => {
    return new CarrouselContainer('youtube', args)
}

export const YT_ERROR = {
    2: 'Request contains an invalid.',
    5: 'Request content cannot be played in an HTML5 player or the player cannot play the video at this time.',
    100: 'The owner of the requested video does not allow it to be played in embedded players.',
    101: 'The owner of the requested video does not allow it to be played in embedded players.'
};

export const YT_STATE = {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    VIDEOCUED: 5
}
