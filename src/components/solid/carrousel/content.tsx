import { createEffect, onMount, splitProps } from "solid-js";

import { YoutubePlayer, STATE, ERROR } from "../yt-player";
import type { YTEvent, YTPlayer } from "../yt-player/types";

import type {
  CarrouselAttributes,
  IFrameAttributes,
  ImageAttributes,
  MetaData,
  VideoAttributes,
} from "./types";
import { CarrouselContainer } from "./types";

const CarrouselImage = (props: {
  attrs: ImageAttributes;
  anchor: CarrouselAttributes;
  metadata: MetaData;
  next: () => void;
}) => {
  let imageTimeout: NodeJS.Timer;
  const [style, rest] = splitProps(props.attrs, ["class"]);

  createEffect(() => {
    if (props.metadata.active && props.metadata.timeout) {
      imageTimeout = setInterval(() => {
        clearInterval(imageTimeout);
        props.next();
      }, props.metadata.timeout);
    } else if (imageTimeout) {
      clearInterval(imageTimeout);
    }
  });

  return (
    <img
      className={`relative rounded-md w-full aspect-video transition-transform ${style.class}`}
      {...rest}
    />
  );
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
  metadata: MetaData;
  next: () => void;
}) => {
  let video: HTMLVideoElement;
  let [vAttrs, style, rest] = splitProps(
    props.attrs,
    ["autoNext", "loop", "start"],
    ["class"]
  );

  let onEnd = () => {
    if (vAttrs.autoNext) {
      video.currentTime = vAttrs.start as number;
      props.next();
    }
  };
  createEffect(() => {
    if (vAttrs.start !== undefined) {
      video?.addEventListener("loadeddata", () => {
        video.currentTime = vAttrs.start as number;
      });
      video?.addEventListener("loadedmetadata", () => {
        video.currentTime = vAttrs.start as number;
      });
    }
  });
  createEffect(() => {
    if (props.metadata.active) {
      video.play();
    } else {
      video.pause();
    }
  });

  let vplayer = (
    <div className="w-full h-full absolute top-0 left-0 bg-black rounded-md -z-10">
      <video
        ref={video}
        className={`w-full aspect-video ${style.class}`}
        // 16:9 aspect ratio
        width={1280}
        height={720}
        // Don't play audio in the carrousel if it is a link
        muted={props.anchor.href ? true : false}
        // Whether to loop the video
        loop={vAttrs.loop}
        // The video should autoplay
        autoPlay={true}
        // What should happen when the video ends
        onEnded={onEnd}
        // Used to play videos inline on mobile. So it doesn't auto fullscreen.
        webkit-playsinline
        playsinline
      >
        <source
          src={rest.src}
          type={rest.type}
          className="w-full aspect-video"
        />
        <UnsupportedVideo />
      </video>
    </div>
  );

  return vplayer;
};

const CarrouselYoutube = (props: {
  attrs: IFrameAttributes;
  anchor: CarrouselAttributes;
  metadata: MetaData;
  next: () => void;
}) => {
  let iframe: HTMLIFrameElement;
  let [vAttrs, style, rest] = splitProps(
    props.attrs,
    ["autoNext", "loop", "start"],
    ["class"]
  );

  let player: YTPlayer;
  createEffect(() => {
    // This creates a referenced youtube player (iframe).
    player = YoutubePlayer(iframe, {
      // 100% width and height tells the player to fill the parent containers space
      width: "100%",
      height: "100%",
      // This is the video id of the video to play
      videoId: rest.videoId,
      // These are extra query parameters added to the iframes url
      // ex: https://youtube.com/embed/<videoId>?controls=0&fs=0
      playerVars: {
        controls: 0,
        rel: 0,
        fs: 0,
      },
    });

    // This event is fired when the player is ready to go
    player.on("ready", (e: YTEvent) => {
      // Flag to be used in other events
      player.mute();
      if (!vAttrs.autoNext && vAttrs.loop) {
        player.setLoop(true);
      }
      player.seekTo(vAttrs.start || 0);
    });

    // Event for when the state changes
    player.on("stateChange", (e: YTEvent) => {
      if (e.data === STATE.ENDED && vAttrs.autoNext) {
        // When the video ends and autoNext is on. Put video back to the start and
        // go to the next content.
        player.seekTo(vAttrs.start || 0);
        props.next();
      }
    });
    // When an error occurs error log the yt equivelant message
    player.on("error", (e: { target: any; data: number }) => {
      if (!ERROR[e.data]) {
        console.log("[yt-iframe-error]:", "Unkown error.");
      } else {
        console.error("[yt-iframe-error]:", ERROR[e.data]);
      }
    });
  });

  createEffect(() => {
    if (props.metadata.active) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }
  });

  let vplayer = (
    <div
      ref={iframe}
      tabindex="-1"
      id={`ciframe-yt-${props.metadata.idx}`}
      className="rounded-md"
    ></div>
  );

  return vplayer;
};

export const CarrouselContent = (props: {
  content: CarrouselContainer;
  metadata: MetaData;
  next: () => void;
}) => {
  let content;
  switch (props.content.type) {
    case "image":
      content = (
        <CarrouselImage
          attrs={props.content.attributes as ImageAttributes}
          anchor={props.content.anchor}
          metadata={props.metadata}
          next={props.next}
        />
      );
      break;
    case "video":
      content = (
        <CarrouselVideo
          attrs={props.content.attributes as VideoAttributes}
          anchor={props.content.anchor}
          metadata={props.metadata}
          next={props.next}
        />
      );
      break;
    case "youtube":
      content = (
        <CarrouselYoutube
          attrs={props.content.attributes as IFrameAttributes}
          anchor={props.content.anchor}
          metadata={props.metadata}
          next={props.next}
        />
      );
      break;
  }
  return props.content.anchor.href ? (
    <a
      tabindex={props.metadata.active ? "-1" : ""}
      href={props.content.anchor.href}
      target={props.content.anchor.target}
      title={props.content.anchor.label as string}
      className="relative rounded-md"
    >
      {props.content.anchor.label && (
        <span className="w-full h-full absolute top-0 left-0 flex justify-center items-center z-10 rounded-md">
          <h3 className="text-center text-2xl font-bold text-white tracking-wide">
            {props.content.anchor.label}
          </h3>
        </span>
      )}
      {content}
      {props.content.anchor.label && (
        <div className="w-full h-full absolute top-0 left-0 bg-slate-700/50 backdrop-blur-[2px] rounded-md"></div>
      )}
    </a>
  ) : (
    content
  );
};
