import { For } from "solid-js";
import { createStore } from "solid-js/store";
import ToastWrapper from './ToastWrapper';

type Renderable = JSX.Element | string | null;
type Toast = {
  id: number;
  message: Renderable | ((arg: Toast) => Renderable);
  createdAt: number;
  duration?: number;
  updatedAt?: number;
  className?: string;
  visible: boolean;
};

const [store, setStore] = createStore<Toast[]>([]);

const BASE_STYLES = "absolute top-0 left-0 w-full h-screen pointer-events-none flex px-4 py-5";

const POS_TO_STYLE = {
  "top-left": "flex-col-reverse justify-start items-start",
  "top-center": "flex-col-reverse justify-start items-center",
  "top-right": "flex-col-reverse justify-start items-end",
  "bottom-left": "flex-col justify-end items-start",
  "bottom-center": "flex-col justify-end items-center",
  "bottom-right": "flex-col justify-end items-end",
};

type Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

const getToastStyles = (position: Position, gutter: number): string => {
  return `${POS_TO_STYLE[position]} gap-[8px]`;
};

type Props = {
  position?: Position;
  gutter?: number;
};

export const toast = (id: number) => {
    setStore((t) => [...t, {
        id,
        message: "Hello, world!",
        createdAt: Date.now(),
        visible: true,
    }]);
    console.log(id);
};

// TODO: Animate in and out
// TODO: Use store for active toasts
// TODO: Promise API
// TODO: Easy to customize what is in toast
// TODO: Duration or Static
// TODO: Loading state toasts
export function Toaster({ position = "bottom-left", gutter = 8 }: Props) {
  return (
    <div className={`${BASE_STYLES} ${getToastStyles(position, gutter)}`}>
      <For each={[...store]} fallback={<p>No Toasts!</p>}>{
        (toast, idx) => <ToastWrapper toast={toast}/>}
      </For>
    </div>
  );
};
