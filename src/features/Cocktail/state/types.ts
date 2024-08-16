import { IDrinkData } from "../../../data/types"
import { cocktailActions, searchType } from "./constants";

export type SearchType = typeof searchType[
    keyof typeof searchType
];

export type ICocktailState = Readonly<{
    currentDrink: IDrinkData,
    cachedDrinks: Readonly<IDrinkData>[],
    searchType: SearchType
}>;

export interface UppdateCurrentCocktailAction {
    type: typeof cocktailActions.UPDATE_CURRENT_DRINK;
    payload: IDrinkData;
}

export interface AddDrinkToCacheAction {
    type: typeof cocktailActions.ADD_DRINK_TO_CACHE;
    payload: IDrinkData;
}

export interface UpdateDrinkSearchTypeAction {
    type: typeof cocktailActions.UPDATE_DRINK_SEARCH;
    payload: SearchType;
}

export type ICocktailAction = (
    UppdateCurrentCocktailAction |
    AddDrinkToCacheAction |
    UpdateDrinkSearchTypeAction
);
