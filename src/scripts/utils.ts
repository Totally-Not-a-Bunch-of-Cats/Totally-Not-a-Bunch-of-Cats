// import astroConfig from "../../astro.config.mjs";
class Error {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

export function uri(path: string): string {
  return `/Totally-Not-a-Bunch-of-Cats/${
    path ? path?.replace(/^\//, "") : path
  }`;
}

/**
 * Fetch a json endpoint resulting in the json promise
 * @param {URL} url URL object to generate the url with 
 * @param {string} pathname Path to the endpoint 
 * @returns {Promise<any>} Promise of the parsed JSON
 */
export const fetchJson = async (url: URL, pathname: string): Promise<any> => {
    return (await fetch(`${pathname}`, {mode: 'no-cors'})).json();
}

/**
 * Title case each word in a string.
 * @param value The string to convert to title case
 * @returns {string}
 */
export const toTitleCase = (value: string): string => {
  return value
    .split(" ")
    .map((value) => value.charAt(0).toUpperCase() + value.slice(1))
    .join(" ");
};
