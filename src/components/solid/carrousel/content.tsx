import { createEffect, splitProps, type Component } from "solid-js";

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
            class={`relative w-full h-full transition-transform m-0 ${style.class}`}
            {...rest}
        />
    );
};

const UnsupportedVideo = () => {
    return (
        <div class="w-full h-full flex justify-center items-center">
            <p class="text-lg font-bold underline decoration-wavy underline-offset-8 decoration-rose-500">
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
    let video: HTMLVideoElement | undefined = undefined;
    let [attrs, style, rest] = splitProps(
        props.attrs,
        ["autoNext", "loop", "start", "volume", "controls", "poster", "alwaysRestart"],
        ["class"]
    );

    createEffect(() => {
        video?.addEventListener("loadeddata", () => {
            if (attrs.start !== undefined && video) {  
                video.currentTime = attrs.start as number;
            }
        })
    })

    let onEnd = () => {
        if (attrs.autoNext && video) {
            video.currentTime = attrs.start as number;
            video.volume = attrs.volume !== undefined ? attrs.volume / 100 : 0;
            props.next();
        }
    };

    createEffect(() => {
        if (props.metadata.active && video) {
            video.play();
        } else if (video) {
            video.pause();
            if (attrs.alwaysRestart) {
                video.currentTime = attrs.start ?? 0;
            }
        }
    });

    let vplayer = (
        <div class="w-full h-full absolute top-0 left-0 bg-black z-10">
            <video
                ref={video}
                class={`w-full aspect-video m-0 ${style.class}`}
                // 16:9 aspect ratio
                width={1280}
                height={720}
                // Don't play audio in the carrousel if it is a link
                muted
                controls={attrs.controls}
                // Whether to loop the video
                loop={attrs.loop}
                // What should happen when the video ends
                onEnded={onEnd}
                poster={attrs.poster}
                // Used to play videos inline on mobile. So it doesn't auto fullscreen.
                webkit-playsinline
                playsinline
            >
                <source
                    src={rest.src}
                    type={rest.type}
                    class="w-full aspect-video pointer-events-auto"
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
    let iframe: HTMLIFrameElement | undefined = undefined;
    let [attrs, _, rest] = splitProps(
        props.attrs,
        ["autoNext", "loop", "start", "controls", "volume", "alwaysRestart"],
        ["class"]
    );

    let player: YTPlayer;
    createEffect(() => {
        if (!iframe) {
            return;
        }

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
                controls: attrs.controls ? 1 : 0,
                rel: 0,
                fs: 0,
            },
        });

        // This event is fired when the player is ready to go
        player.on("ready", (e: YTEvent) => {
            // Flag to be used in other events;
            player.setVolume(attrs.volume ?? 0)
            player.mute();
            if (!attrs.autoNext && attrs.loop) {
                player.setLoop(true);
            }
            player.seekTo(attrs.start || 0);
        });

        // Event for when the state changes
        player.on("stateChange", (e: YTEvent) => {
            if (e.data === STATE.ENDED && attrs.autoNext) {
                // When the video ends and autoNext is on. Put video back to the start and
                // go to the next content.
                player.seekTo(attrs.start || 0);
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
            if (attrs.alwaysRestart) {
                player.seekTo(attrs.start ?? 0);
            }
        }
    });

    let vplayer = (
        <div
            ref={iframe}
            tabindex="-1"
            id={`ciframe-yt-${props.metadata.idx}`}
        ></div>
    );

    return vplayer;
};

export const CarrouselContent: Component<{
    content: CarrouselContainer;
    metadata: MetaData;
    next: () => void;
}> = (props) => {
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
            tabindex={props.metadata.active ? "" : "-1"}
            href={props.content.anchor.href}
            target={props.content.anchor.target}
            title={`${props.content.anchor.label} (Slide ${props.metadata.idx+1})`}
            class="relative w-full h-full"
            aria-label={`Slide ${props.metadata.idx}`}
        >
            {props.content.anchor.label && (
                <span class="w-full h-full absolute top-0 left-0 flex justify-center items-center z-10">
                    <h3 class="text-center text-2xl font-bold text-white tracking-wide">
                        {props.content.anchor.label}
                    </h3>
                </span>
            )}
            {content}
            {props.content.anchor.label && (
                <div class="w-full h-full absolute top-0 left-0 bg-zinc-700/50 backdrop-blur-[2px]"></div>
            )}
        </a>
    ) : (
        content
    );
};
