import searchLight from "./search-light.svg";
import homeLight from "./home-light.svg";
import searchDark from "./search-dark.svg";
import homeDark from "./home-dark.svg";
import refreshDark from "./refresh-dark.svg";
import refreshLight from "./refresh-light.svg";
import ingredientsDark from "./ingredients-dark.svg";
import ingredientsLight from "./ingredients-light.svg";


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
    },
    refresh: {
        dark: {
            src: refreshDark,
            alt: "Home",
            title: "Home"
        },
        light: {
            src: refreshLight,
            alt: "Home",
            title: "Home"
        }
    },
    ingredients: {
        dark: {
            src: ingredientsDark,
            alt: "Drink ingredients",
            title: "Drink ingredients"
        },
        light: {
            src: ingredientsLight,
            alt: "Drink ingredients",
            title: "Drink ingredients"
        }
    }
} as const;
