import { IDrinkData } from "../../../data/types"
import { cocktailActions, searchType } from "./constants";

export type SearchType = typeof searchType[
    keyof typeof searchType
];

export interface AdvancedSearchFormQueryType {
    category: string;
    ingredient: string;
    glassType: string;
};

export type ICocktailState = Readonly<{
    currentDrink: IDrinkData,
    cachedCocktailSearch: Readonly<IDrinkData>[],
    cachedCocktailSearchQuery: string,
    cachedAdvancedCocktailSearch: Readonly<IDrinkData>[],
    cachedAdvancedCocktailSearchQuery: AdvancedSearchFormQueryType,
    searchType: Readonly<SearchType>
}>;

export interface UppdateCurrentCocktailAction {
    type: typeof cocktailActions.UPDATE_CURRENT_DRINK;
    payload: IDrinkData;
}

export interface AddCocktailSearchToCacheAction {
    type: typeof cocktailActions.ADD_COCKTAIL_SEARCH_TO_CACHE;
    payload: IDrinkData[];
}

export interface AddCocktailSearchQueryToCacheAction {
    type: typeof cocktailActions.ADD_COCKTAIL_SEARCH_QUERY_TO_CACHE;
    payload: string;
}

export interface AddAdvancedCocktailSearchToCacheAction {
    type: typeof cocktailActions.ADD_ADVANCED_COCKTAIL_SEARCH_TO_CACHE;
    payload: IDrinkData[];
}

export interface AddAdvancedCocktailSearchQueryToCacheAction {
    type: typeof cocktailActions.ADD_ADVANCED_COCKTAIL_SEARCH_QUERY_TO_CACHE;
    payload: AdvancedSearchFormQueryType;
}

export interface UpdateCocktailSearchTypeAction {
    type: typeof cocktailActions.UPDATE_DRINK_SEARCH;
    payload: SearchType;
}

export type ICocktailAction = (
    UppdateCurrentCocktailAction |
    AddCocktailSearchToCacheAction |
    AddCocktailSearchQueryToCacheAction |
    AddAdvancedCocktailSearchToCacheAction |
    AddAdvancedCocktailSearchQueryToCacheAction |
    UpdateCocktailSearchTypeAction
);
