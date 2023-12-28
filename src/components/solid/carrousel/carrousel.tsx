/* Sample videos: https://gist.github.com/jsturgis/3b19447b304616f18657 
https://developers.google.com/youtube/iframe_api_reference
*/

export { image, video } from "./core";
import '../../../styles/custom.css';

import { createSignal, type Accessor, Show, splitProps, createEffect, For, type Component, type JSX } from "solid-js";

import { CarrouselContainer } from "./types";
import { CarrouselContent } from "./content";

export const aspect = 'aspect-[8/3]';

type CarrouselWrapperProps = {
    idx: number,
    selected: number;
    children: JSX.Element;
    aspect: string;
};

type CarrouselButtonProps = {
    select: () => void;
    idx: number;
    selected: number;
    title?: string;
    "select-color": string;
    "unselect-color": string;
};

type CarrouselProps = Omit<JSX.HTMLAttributes<HTMLElement>, 'children'> & {
    content: CarrouselContainer[];
    speed?: number;
    "no-arrows"?: boolean;
    wrap?: boolean;
    full?: boolean;
    children?: Element;
};

export const CarrouselWrapper: Component<CarrouselWrapperProps> = (props) => {
    return (
        <div
            class={`transition-opacity duration-200 absolute top-0 left-0 w-full h-fit ${props.aspect} ${props.idx === props.selected
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
        >
            {props.children}
        </div>
    );
};

export const CarrouselButton: Component<CarrouselButtonProps> = (props) => {
    return (
        <button
            type="button"
            class={
                `rounded-full h-[.4rem] text-transparent transition-[width] duration-200 leading-[0] w-[2rem]
                    ${props.idx === props.selected ? ` ${props['select-color']}` : ` ${props['unselect-color']}`}
                `
            }
            onClick={props.select}
            title={`${props.title} (Slide ${props.idx+1})`}
        >
            -
        </button>
    );
};


/**
 * @param {CarrouselContainer[]} content The list of items to show in the carrousel.
 * These can be images, videos, and youtube videos. Use the `image`, `video`, and `youtube`
 * helper methods to construct content.
 * @param {?number} speed If present the carrousel will automatically go to the next
 * piece of content after the speed (duration) has ended. This only applies to images.
 * @param {?boolean} no-arrow Hide the carrousel arrows
 * @param {?HTMLElement} children The single element to display at the end of the carrousel
 */
export const Carrousel: Component<CarrouselProps> = (props) => {
    let wrapper: HTMLDivElement | undefined = undefined;
    const [selected, setSelected] = createSignal(0);
    const [hasChildren, setHasChildren] = createSignal(false);
    const [data, style, rest] = splitProps(
        props,
        ["content", "children"],
        ["class", "full"]
    );

    let scolor = 'bg-zinc-500', ucolor = 'bg-zinc-500/30';
    if (props.full) {
        scolor = 'bg-zinc-400';
        ucolor='bg-zinc-400/40';
    } else {
        scolor = 'bg-zinc-500';
        ucolor = 'bg-zinc-500/30';
    }
    

    let lastInterval: NodeJS.Timer;
    createEffect(() => {
        setHasChildren(data.children !== undefined && data.children.children.length > 0);
    })

    // If there is a speed and there is a child node and the child node is the current
    // content. Set an interval that will autoscroll
    createEffect(() => {
        if (props.speed && hasChildren() && selected() === data.content.length) {
            lastInterval = setInterval(() => {
                clearInterval(lastInterval);
                next()
            }, props.speed)
        } else if (lastInterval) {
            clearInterval(lastInterval);
        }
    })

    const next = () => {
        setSelected(
            (selected() + 1) % (data.content.length + (hasChildren() ? 1 : 0))
        );
    };

    const previous = () => {
        const max = data.content.length + (hasChildren() ? 1 : 0);
        let prev = (selected() - 1) % max;
        if (prev < 0) {
            prev = max + prev;
        }

        setSelected(prev);
    };

    return (
        <section class={`${style.full ? '':`my-2 mx-auto`} w-full hover-arrows relative`} {...rest}>
            <div
                ref={wrapper}
                class={`w-full relative overflow-x-hidden ${props.full ? '':'shadow-md shadow-zinc-700/30 rounded-md max-w-[90ch]'} ${style.class}`}
            >
                {!props["no-arrows"] && (
                    <button
                        type="button"
                        class="carrousel-arrow transition-opacity opacity-0 duration-100 absolute top-[50%] left-2 w-fit h-fit z-20 bg-zinc-100/20 pointer-events-auto rounded-full p-2 hover:bg-zinc-100"
                        onClick={previous}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                    </button>
                )}
                <div class={`w-full ${props.full ? `${aspect}`: 'aspect-video max-w-[90ch]'}`}></div>
                <For each={data.content}>
                    {(content: CarrouselContainer, idx: Accessor<number>) => (
                        <CarrouselWrapper idx={idx()} selected={selected()} aspect={props.full ? aspect: 'aspect-video'}>
                            <CarrouselContent
                                content={content}
                                metadata={{
                                    idx: idx(),
                                    selected: selected(),
                                    active: idx() === selected(),
                                    timeout: props.speed,
                                }}
                                next={() =>
                                    setSelected(
                                        (idx() + 1) %
                                        (data.content.length + (hasChildren() ? 1 : 0))
                                    )
                                }
                            />
                        </CarrouselWrapper>
                    )}
                </For>
                <Show when={hasChildren()}>
                    <CarrouselWrapper idx={data.content.length} selected={selected()} aspect={props.full ? aspect: 'aspect-video'}>
                        {data.children}
                    </CarrouselWrapper>
                </Show>

                {!props["no-arrows"] && (
                    <button
                        type="button"
                        class="carrousel-arrow transition-opacity duration-100 opacity-0 absolute top-[50%] right-2 w-fit h-fit z-20 bg-zinc-100/20 pointer-events-auto rounded-full p-2 hover:bg-zinc-100"
                        onClick={next}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </button>
                )}
            </div>
            <div class={`${style.full ? 'absolute bottom-0 left-0 mb-6 z-50': 'px-6 mt-2'} flex w-full gap-1 justify-center items-center`}>
                <For each={data.content}>
                    {(cnt: CarrouselContainer, idx: Accessor<number>) => (
                        <CarrouselButton
                            idx={idx()}
                            selected={selected()}
                            select={() => setSelected(idx())}
                            title={cnt.anchor.label}
                            select-color={scolor}
                            unselect-color={ucolor}
                        />
                    )}
                </For>
                <Show when={hasChildren()}>
                    <button
                        type="button"
                        class={
                            `rounded-full text-transparent transition-[width] duration-200 w-4 h-4 font-bold leading-none flex justify-center items-center ml-1 
                                ${data.content.length === selected() ? `${scolor}` : `${ucolor}`}
                            `}
                        onClick={() => {
                            if (data.content.length !== selected()) {
                                setSelected(data.content.length);
                            }
                        }}
                        title="More Content"
                    ></button>
                </Show>
            </div>
        </section>
    );
};
