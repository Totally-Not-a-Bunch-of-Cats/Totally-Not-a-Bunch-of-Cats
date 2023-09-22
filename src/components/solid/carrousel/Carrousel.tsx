/* Sample videos: https://gist.github.com/jsturgis/3b19447b304616f18657 
https://developers.google.com/youtube/iframe_api_reference
*/

import type { HTMLAttributes } from "astro/types";
import {
  createSignal,
  type Accessor,
  Show,
  createEffect,
  splitProps,
} from "solid-js";

type CarrouselAttributes = {
  href?: string;
  target?: string;
  label?: string;
};
export type ImageAttributes = Omit<HTMLAttributes<"img">, "class:list">;

export type VideoAttributes = HTMLAttributes<"source"> & {autoScroll?: boolean, loop?: boolean, start?: number};

class CarrouselContainer {
  type: "image" | "video";
  attributes: ImageAttributes | VideoAttributes;
  anchor: CarrouselAttributes;

  constructor(
    type: "image" | "video",
    attributes: (ImageAttributes | VideoAttributes) & CarrouselAttributes
  ) {
    this.type = type;
    const [anchor, rest] = splitProps(attributes, ["href", "target", "label"]);
    this.attributes = rest;
    this.anchor = anchor;
  }
}

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

const CarrouselImage = (props: {
  attrs: ImageAttributes;
  anchor: CarrouselAttributes;
}) => {
  const [style, rest] = splitProps(props.attrs, ["class"]);
  if (props.anchor.href) {
    return (
      <a
        href={props.anchor.href}
        target={props.anchor.target}
        title={props.anchor.title as string}
        className="relative"
      >
        {props.anchor.label && (
          <span className="w-full h-full absolute top-0 left-0 flex justify-center items-center z-10">
            <h3 className="text-center text-2xl font-bold text-white tracking-wide">
              {props.anchor.label}
            </h3>
          </span>
        )}
        <img
          className={`relative rounded-md w-full aspect-video transition-transform ${style.class}`}
          {...rest}
        />
        {props.anchor.label && (
          <div className="w-full h-full absolute top-0 left-0 bg-slate-700/50 backdrop-blur-sm rounded-md"></div>
        )}
      </a>
    );
  } else {
    return (
      <img
        className={`rounded-md w-full aspect-video transition-transform ${style.class}`}
        {...rest}
      />
    );
  }
};

const UnsupportedVideo = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <p className="text-lg font-bold underline decoration-wavy underline-offset-8 decoration-rose-500">
        Video Not Supported
      </p>
    </div>
  );
};

const CarrouselVideo = (props: {
  attrs: VideoAttributes;
  anchor: CarrouselAttributes;
  active: boolean;
  next: () => void
}) => {
  let video: HTMLVideoElement;
  let [vAttrs, style, rest] = splitProps(props.attrs, ["autoScroll", "loop", "start"], ["class"]);

  let onEnd = () => {
        if (vAttrs.autoScroll) {
            video.currentTime = vAttrs.start as number;
            props.next()    
        }
    };
  createEffect(() => {
      if (vAttrs.start !== undefined) {
        video?.addEventListener('loadeddata', () => {
            video.currentTime = vAttrs.start as number;
        });
    }
  });
  createEffect(() => {
    if (props.active) {
      video.play();
    } else {
      video.pause();
    }
  });

  if (props.anchor.href) {
    return (
      <a
        href={props.anchor.href}
        target={props.anchor.target}
        title={props.anchor.label as string}
        className="relative"
      >
        <div className="w-full h-full absolute top-0 left-0 bg-black rounded-md -z-10"></div>
        {props.anchor.label && (
          <span className="w-full h-full absolute top-0 left-0 flex justify-center items-center z-10">
            <h3 className="text-center text-2xl font-bold text-white tracking-wide">
              {props.anchor.label}
            </h3>
          </span>
        )}
        {
            <video
              ref={video}
              width={1920}
              height={1080}
              loop={vAttrs.loop}
              muted
              className={`w-full aspect-video ${style.class}`}
              autoPlay={true}
              onEnded={onEnd}
              >
              <source
                src={rest.src}
                type={rest.type}
                className="w-full aspect-video"
              />
              <UnsupportedVideo />
            </video>
        }
        {props.anchor.label && (
          <div className="w-full h-full absolute top-0 left-0 bg-slate-700/50 backdrop-blur-[2px] rounded-md"></div>
        )}
      </a>
    );
  } else {
    return (
      <video
        ref={video}
        width={1920}
        height={1080}
        loop={vAttrs.loop}
        muted
        onEnded={onEnd}
        className={`w-full aspect-video ${style.class}`}
        autoPlay={true}
      >
        <source src={rest.src} type={rest.type} />
        <UnsupportedVideo />
      </video>
    );
  }
};

const CarrouselContent = (props: {
  content: CarrouselContainer;
  active: boolean;
  next: () => void
}) => {
  if (props.content.type === "image") {
    return (
      <CarrouselImage
        attrs={props.content.attributes}
        anchor={props.content.anchor}
      />
    );
  } else {
    return (
      <CarrouselVideo
        attrs={props.content.attributes}
        anchor={props.content.anchor}
        active={props.active}
        next={props.next}
      />
    );
  }
};

export const CarrouselWrapper = (props: {
  idx: number;
  selected: number;
  children?: any;
}) => {
  return (
    <div
      className={`transition-opacity duration-200 absolute top-0 left-0 w-full aspect-video ${
        props.idx === props.selected
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {props.children}
    </div>
  );
};

type ButtonProps = {
  select: () => void;
  idx: number;
  selected: number;
  title?: string;
};
export const CarrouselButton = (props: ButtonProps) => {
  return (
    <button
      type="button"
      className={`rounded-full h-2 text-transparent transition-[width] duration-200 leading-[0] ${
        props.idx === props.selected
          ? "w-[60%] bg-slate-500"
          : "w-[1rem] bg-slate-500/30"
      }`}
      onClick={props.select}
      title={props.title || "" + (props.idx + 1)}
    >
      -
    </button>
  );
};

/*
    System for having thin slices and having them grow into view
    Each slice can be anything as long as it can be dynamically sized

    focused == 60%
    gap==.25rem
    slices will just fill remaining space
    
*/
type Props = {
  content: CarrouselContainer[];
  children?: HTMLElement;
};

export const Carrousel = (props: Props) => {
  let wrapper: HTMLDivElement;
  const [selected, setSelected] = createSignal(0);

  return (
    <section className="w-full my-2">
      <script src="https://www.youtube.com/iframe_api"></script>
      <div ref={wrapper} className="w-full relative">
        <div className="w-full aspect-video"></div>
        <For each={props.content}>
          {(content: CarrouselContainer, idx: Accessor<number>) => (
            <CarrouselWrapper idx={idx()} selected={selected()}>
              <CarrouselContent
                content={content}
                active={idx() === selected()}
                next={() => setSelected((idx() + 1) % props.content.length)}
              />
            </CarrouselWrapper>
          )}
        </For>
        <Show when={props.children}>
          <CarrouselWrapper idx={props.content.length} selected={selected()}>
            {props.children}
          </CarrouselWrapper>
        </Show>
      </div>
      <div className="flex w-full gap-1 px-6 mt-2 justify-center items-center">
        <For each={props.content}>
          {(cnt: ImageAttributes, idx: Accessor<number>) => (
            <CarrouselButton
              idx={idx()}
              selected={selected()}
              select={() => setSelected(idx())}
              title={cnt.label}
            />
          )}
        </For>
        <Show when={props.children}>
          <button
            type="button"
            className={`rounded-full text-transparent transition-[width] duration-200 leading-[0] w-4 h-4 font-bold leading-none flex justify-center items-center ml-1 ${
              props.content.length === selected()
                ? "bg-slate-500 text-slate-200"
                : "bg-slate-500/30 text-slate-950"
            }`}
            onClick={() => {
              if (props.content.length !== selected()) {
                setSelected(props.content.length);
              }
            }}
            title="More Content"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="w-3 h-3"
              viewBox="-4.5 -4.5 24 24"
            >
              <path
                fill="currentColor"
                d="M8.9 6.9v-5a1 1 0 1 0-2 0v5h-5a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5z"
              />
            </svg>
          </button>
        </Show>
      </div>
    </section>
  );
};
