import { createEffect, splitProps } from "solid-js";
import YoutubePlayer from "youtube-player";

import type {
  CarrouselAttributes,
  IFrameAttributes,
  ImageAttributes,
  MetaData,
  VideoAttributes,
} from "./types";
import { CarrouselContainer } from "./types";
import { YT_ERROR, YT_STATE } from "./core";

const CarrouselImage = (props: {
  attrs: ImageAttributes;
  anchor: CarrouselAttributes;
  metadata: MetaData;
}) => {
  const [style, rest] = splitProps(props.attrs, ["class"]);
  if (props.anchor.href) {
    return (
      <a
        href={props.anchor.href}
        target={props.anchor.target}
        title={props.anchor.label as string}
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
      <source src={rest.src} type={rest.type} className="w-full aspect-video" />
      <UnsupportedVideo />
    </video>
  );

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
        {vplayer}
        {props.anchor.label && (
          <div className="w-full h-full absolute top-0 left-0 bg-slate-700/50 backdrop-blur-[2px] rounded-md"></div>
        )}
      </a>
    );
  } else {
    return vplayer;
  }
};

const CarrouselYoutube = (props: {
  attrs: IFrameAttributes;
  anchor: CarrouselAttributes;
  metadata: MetaData;
  next: () => void;
}) => {
    let isReady = false;
  let [vAttrs, style, rest] = splitProps(
    props.attrs,
    ["autoNext", "loop", "start"],
    ["class"]
  );

  let player: any;
  createEffect(() => {
    player = YoutubePlayer(`ciframe-yt-${props.metadata.idx}`, {
        width: "100%",
        height: "100%",
        videoId: rest.src,
        playerVars: {
          controls: 0,
          muted: 1,
          rel: 0,
          modestbranding: 1,
        },
    });
    player.on('ready', (e: Event) => {
        isReady = true;
        console.log(e.target.g);
        player.mute();
        if (!vAttrs.autoNext && vAttrs.loop) {
          player.setLoop(true);
        }
        player.seekTo(vAttrs.start || 0);
        if (props.metadata.active) {
            player.playVideo();
        }
    });
    player.on('stateChange', (e: Event) => {
        if (e.data === YT_STATE.ENDED && vAttrs.autoNext) {
        player.seekTo(0);
        props.next();
        }
    });
    player.on('error', (e: Event) => {
        if (!YT_ERROR[e.data]) {
            console.log('[yt-iframe-error]:', 'Unkown error.');
        } else {
            console.error('[yt-iframe-error]:', YT_ERROR[e.data]);
        }
    });
  })

  createEffect(() => {
    if (isReady) {
        if (props.metadata.active) {
        player.playVideo();
        } else {
        player.pauseVideo();
        }
    }
  });

  let vplayer = <div id={`ciframe-yt-${props.metadata.idx}`} className="rounded-md"></div>;
//   let vplayer = (
//     <iframe width="560" height="315" src="https://www.youtube.com/embed/LDU_Txk06tM?controls=0autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
//   )

  if (props.anchor.href) {
    return (
      <a
        href={props.anchor.href}
        target={props.anchor.target}
        title={props.anchor.label as string}
        className="relative rounded-md"
      >
        <div className="w-full h-full absolute top-0 left-0 bg-black rounded-md -z-10 rounded-md"></div>
        {props.anchor.label && (
          <span className="w-full h-full absolute top-0 left-0 flex justify-center items-center z-10 rounded-md">
            <h3 className="text-center text-2xl font-bold text-white tracking-wide">
              {props.anchor.label}
            </h3>
          </span>
        )}
        {vplayer}
        {props.anchor.label && (
          <div className="w-full h-full absolute top-0 left-0 bg-slate-700/50 backdrop-blur-[2px] rounded-md"></div>
        )}
      </a>
    );
  } else {
    return vplayer;
  }
};

export const CarrouselContent = (props: {
  content: CarrouselContainer;
  metadata: MetaData;
  next: () => void;
}) => {
  if (props.content.type === "image") {
    return (
      <CarrouselImage
        attrs={props.content.attributes}
        anchor={props.content.anchor}
        metadata={props.metadata}
      />
    );
  } else if (props.content.type === "video") {
    return (
      <CarrouselVideo
        attrs={props.content.attributes}
        anchor={props.content.anchor}
        metadata={props.metadata}
        next={props.next}
      />
    );
  } else if (props.content.type === "youtube") {
    return <CarrouselYoutube
      attrs={props.content.attributes}
      anchor={props.content.anchor}
      metadata={props.metadata}
      next={props.next}
    />;
  }
};
