import searchLight from "./search-light.svg";
import homeLight from "./home-light.svg";
import searchDark from "./search-dark.svg";
import homeDark from "./home-dark.svg";

export const icons = {
    search: { 
        dark: {
            src: searchDark,
            alt: "Search",
            title: "Search"
        },
        light: {
            src: searchLight,
            alt: "Search",
            title: "Search"
        },
    },
    home: {
        dark: {
            src: homeDark,
            alt: "Home",
            title: "Home"
        },
        light: {
            src: homeLight,
            alt: "Home",
            title: "Home"
        }
    }
} as const;
