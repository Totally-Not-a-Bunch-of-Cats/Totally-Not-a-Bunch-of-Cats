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
