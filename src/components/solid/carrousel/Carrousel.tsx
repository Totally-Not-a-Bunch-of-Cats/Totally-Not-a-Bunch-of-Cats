/* Sample videos: https://gist.github.com/jsturgis/3b19447b304616f18657 
https://developers.google.com/youtube/iframe_api_reference
*/

export { image, video } from './core';

import {
  createSignal,
  type Accessor,
  Show,
} from "solid-js";

import { CarrouselContainer, type MetaData } from './types';
import { CarrouselContent } from './content';

export const CarrouselWrapper = (props: {
  idx: number;
  selected: number;
  children?: any;
}) => {
  return (
    <div
      className={`transition-opacity duration-200 absolute top-0 left-0 w-full aspect-video rounded-md ${
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
      <div ref={wrapper} className="w-full relative shadow-md shadow-slate-700/30 rounded-md">
        <div className="w-full aspect-video"></div>
        <For each={props.content}>
          {(content: CarrouselContainer, idx: Accessor<number>) => (
            <CarrouselWrapper idx={idx()} selected={selected()}>
              <CarrouselContent
                content={content}
                metadata={{
                    idx: idx(),
                    selected: selected(),
                    active: idx() === selected()
                }}
                next={() => setSelected((idx() + 1) % (props.content.length + (props.children ? 1 : 0)))}
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
          {(cnt: CarrouselContainer, idx: Accessor<number>) => (
            <CarrouselButton
              idx={idx()}
              selected={selected()}
              select={() => setSelected(idx())}
              title={cnt.anchor.label}
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
          </button>
        </Show>
      </div>
    </section>
  );
};
