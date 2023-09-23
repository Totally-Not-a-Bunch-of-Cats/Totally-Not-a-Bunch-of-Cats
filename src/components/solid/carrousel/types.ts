import type { HTMLAttributes } from "astro/types";
import { splitProps } from "solid-js";

export type CarrouselAttributes = {
  href?: string;
  target?: string;
  label?: string;
};
type PlaybackAttributes = {
    loop?: boolean;
    start?: number;
    autoNext?: boolean;
}
export type ImageAttributes = Omit<HTMLAttributes<"img">, "class:list">;
export type VideoAttributes = HTMLAttributes<"source"> & PlaybackAttributes;
export type IFrameAttributes = HTMLAttributes<'iframe'> & PlaybackAttributes;

export type MetaData = {
    idx: number,
    selected: number,
    active: boolean
};

export class CarrouselContainer {
  type: "image" | "video" | 'youtube';
  attributes: ImageAttributes | VideoAttributes;
  anchor: CarrouselAttributes;

  constructor(
    type: "image" | "video" | 'youtube',
    attributes: (ImageAttributes | VideoAttributes) & CarrouselAttributes
  ) {
    this.type = type;
    const [anchor, rest] = splitProps(attributes, ["href", "target", "label"]);
    this.attributes = rest;
    this.anchor = anchor;
  }
}
