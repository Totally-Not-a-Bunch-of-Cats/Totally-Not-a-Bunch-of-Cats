import { HeaderLink } from "./HeaderLink";
import { createSignal } from "solid-js";
import { Toaster } from "solid-toast";
import { menu } from "@script/constants.ts";
import { uri } from "@script/utils";

type Props = { url: URL };

export const Header = (props: Props) => {
  let openButton: HTMLElement | undefined = undefined;
  let closeButton: HTMLElement | undefined = undefined;
  const [open, setOpen] = createSignal(false);
  

  const closeMenu = () => {
    setOpen(false);
    openButton?.focus();
    // document.body.classList.remove('overflow-y-hidden');
  };
  const openMenu = () => {
    setOpen(true);
    closeButton?.focus();
    // document.body.classList.add('overflow-y-hidden');
  };
  const toggleMenu = () => {
    if (open()) {
        closeMenu();
    } else {
        openMenu()
    }
  };

  document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' && open()) {
        closeMenu();
    }
  });

  return (
    <>
        <header class="w-full z-40 block md:hidden">
            <div class="w-full max-w-[120ch] mx-auto flex justify-end">
                <div class="my-2 mr-3 w-12 h-12 bg-zinc-100 rounded-full shadow-md pointer-events-auto">
                <button
                    type="button"
                    ref={openButton}
                    class="toggle-menu w-full h-full flex justify-center items-center"
                    onClick={toggleMenu}
                    title="Open menu"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="-5 -7 24 24"
                    >
                    <path
                        fill="currentColor"
                        class="w-8 h-8"
                        d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2zm7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2zM1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2z"
                    />
                    </svg>
                </button>
                </div>
            </div>

            <div
                class={`absolute top-0 left-0 w-full h-screen flex justify-end z-40 ${
                open() ? "bg-zinc-700/20 backdrop-blur-2xl pointer-events-auto" : "pointer-events-none"
                }`}
                onClick={toggleMenu}
            >
                <nav
                id="header-nav"
                class={`transition-transform linear duration-200 w-screen md:w-[20rem] h-screen bg-zinc-100 md:rounded-l-lg shadow-lg shadow-zinc-800 overflow-hidden flex flex-col items-end backdrop-blur-md backdrop-brightness-150 ${open() ? "" : "translate-x-[100vw] border-transparent scale-x-0"}`}
                onClick={e => e.stopPropagation()}
                >
                    <div class="w-full h-fit flex items-center justify-between px-1 py-4 pl-6">
                        <h2 class="text-2xl font-bold text-zinc-800">Totally Not a Bunch of Cats</h2>
                        <div class="w-12 h-12">
                            <button
                                type="button"
                                ref={closeButton}
                                class="toggle-menu w-full h-full flex justify-center items-center hover:text-rose-500 text-zinc-900"
                                onClick={toggleMenu}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="-6 -6 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        fill="currentColor"
                                        class="w-8 h-8"
                                        d="m7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485L2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535l3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="w-full h-full flex flex-col justify-center items-center">
                        <em class="text-zinc-700/40 text-3xl font-bold">Menu</em>
                        <ul class="mt-2 text-lg list-disc list-inside">
                            { menu &&
                                Object.entries(menu).map(([name, info]) => (
                                    <li>
                                        <HeaderLink href={info.uri} pathname={props.url.pathname} class="h-fit">
                                            {name}
                                        </HeaderLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
        <header class="w-full z-40 hidden md:block sticky top-0">
            <div class="flex items-center justify-between w-[100%] max-w-[115ch] bg-zinc-100 h-fit mx-auto rounded-full mt-2 px-8 py-3 shadow-md shadow-zinc-800/40 pointer-events-auto">
                <a href={uri("/")} class="text-xl font-bold">
                    Totally Not a Bunch of Cats
                </a>
                <ul class="text-lg flex gap-4 items-center">
                    { menu &&
                        Object.entries(menu).map(([name, info]) => (name !== 'Home' &&
                            <li>
                                <HeaderLink href={info.uri} pathname={props.url.pathname} class="h-fit">
                                    {name}
                                </HeaderLink>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </header>
        {/* <Toaster position="bottom-left" gutter={8} /> */}
    </>
  );
};
