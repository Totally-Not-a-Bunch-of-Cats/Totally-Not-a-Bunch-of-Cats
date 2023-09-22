import { HeaderLink } from "./HeaderLink";
import { Toaster } from "../toaster/Toaster";
import { createSignal } from "solid-js";

type Props = { pathname: string };

export const Header = ({ pathname }: Props) => {
  const [menu, setMenu] = createSignal(false);

  const toggleMenu = () => {
    setMenu(!menu());
    document.body.classList.toggle('overflow-y-hidden');
  };

  return (
    <header className="w-full z-40">
      <div className="w-full max-w-[120ch] mx-auto flex justify-end">
        <div className="mt-2 mr-3 w-12 h-12 bg-slate-100 rounded-full shadow-md border-2 border-dashed border-slate-300">
          <button
            type="button"
            className="toggle-menu w-full h-full flex justify-center items-center"
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
                className="w-8 h-8"
                d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2zm7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2zM1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`absolute top-0 left-0 w-full h-screen flex justify-end z-40 ${
          menu() ? "bg-slate-700/20 backdrop-blur-2xl pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <nav
          id="header-nav"
          className={`transition-transform linear duration-200 w-screen md:w-[20rem] h-screen h-[100dvh] bg-slate-100 md:rounded-l-lg shadow-lg shadow-slate-800 border-y-2 border-l-2 border-dashed border-slate-400 overflow-hidden flex flex-col items-end backdrop-blur-md backdrop-brightness-150 ${menu() ? "" : "translate-x-[100vw] border-transparent scale-x-0"}`}
        >
          <div className="w-12 h-12 mt-4 mr-1">
            <button
              className="toggle-menu w-full h-full flex justify-center items-center"
              onClick={toggleMenu}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="-6 -6 24 24"
              >
                <path
                  fill="currentColor"
                  className="w-8 h-8 text-slate-900"
                  d="m7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485L2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535l3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z"
                />
              </svg>
            </button>
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <em className="text-slate-700/40 text-3xl font-bold">Menu</em>
            <ul className="mt-2 text-lg list-disc list-inside">
              <li>
                <HeaderLink href="/" pathname={pathname} class="h-fit">
                  Home
                </HeaderLink>
              </li>
              <li>
                <HeaderLink href="/blog" pathname={pathname} class="h-fit">
                  Blog
                </HeaderLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <Toaster />
    </header>
  );
};
