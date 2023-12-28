import { splitProps, type JSX } from "solid-js";

export type CarrouselAttributes = {
  href?: string;
  target?: string;
  label?: string;
};
type PlaybackAttributes = {
  loop?: boolean;
  start?: number;
  autoNext?: boolean;
  alwaysRestart?: boolean;
  controls?: boolean,
  volume?: number,
};
export type ImageAttributes = JSX.ImgHTMLAttributes<HTMLImageElement>;
export type VideoAttributes = JSX.SourceHTMLAttributes<HTMLSourceElement> & PlaybackAttributes & {
    poster?: string
};
export type IFrameAttributes = Omit<JSX.IframeHTMLAttributes<HTMLIFrameElement>, 'src'> & PlaybackAttributes & {
    videoId: string
};

export type MetaData = {
  idx: number;
  selected: number;
  active: boolean;
  timeout?: number;
};

export class CarrouselContainer {
  type: "image" | "video" | "youtube";
  attributes: ImageAttributes | VideoAttributes | IFrameAttributes;
  anchor: CarrouselAttributes;

  constructor(
    type: "image" | "video" | "youtube",
    attributes: (ImageAttributes | VideoAttributes | IFrameAttributes) & CarrouselAttributes
  ) {
    this.type = type;
    const [anchor, rest] = splitProps(attributes, ["href", "target", "label"]);
    this.attributes = rest;
    this.anchor = anchor;
  }
}
