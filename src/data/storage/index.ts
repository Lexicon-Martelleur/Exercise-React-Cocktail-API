import { AdvancedSearchFormQueryType } from "../../features";
import { IDrinkData } from "../types";

export const NULL_DRINK_ID = "NULL_DRINK";

/**
 * @TODO Get from web storage
 */

export function getCurrentCocktailData (): IDrinkData {
    return {
        id: NULL_DRINK_ID,
        name: "",
        thumbNail: "",
        category:  "",
        alcoholic:  "",
        ingredients: [],
        tags: "",
        glass: "string"
    }
}

export function getCocktailSearchResult (): IDrinkData[] {
    return [];
}

export function getCocktailAdvancedSearchResult (): IDrinkData[] {
    return [];
}

export function getCocktailSearchQuery (): string {
    return "";
}

export function getAdvancedCocktailSearchQuery (): AdvancedSearchFormQueryType {
    return {
        category: "",
        ingredient: "",
        glassType: ""
    };
}
