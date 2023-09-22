import type { HTMLAttributes } from "astro/types";

type Props = HTMLAttributes<"a"> & { pathname: string };

export const HeaderLink = ({
  href,
  pathname,
  class: className,
  children,
  ...props
}: Props) => {
  const isActive = href === pathname || href === pathname.replace(/\/$/, "");

  return (
    <a
      href={href as string}
      className={`${className} inline-block hover:text-blue-300 ${
        isActive ? "underline font-bold" : ""
      }`}
      {...props}
    >
      {children && children}
    </a>
  );
};
