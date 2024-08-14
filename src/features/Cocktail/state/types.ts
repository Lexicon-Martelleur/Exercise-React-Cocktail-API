import { IDrinkData } from "../../../data/types"
import { cocktailActions } from "./constants";

export type ICocktailState = Readonly<{
    currentDrink: IDrinkData,
    cachedDrinks: Readonly<IDrinkData>[],
}>;

export interface UppdateCurrentCocktailAction {
    type: typeof cocktailActions.UPDATE_CURRENT_DRINK;
    payload: IDrinkData;
}

export interface AddDrinkToCacheAction {
    type: typeof cocktailActions.ADD_DRINK_TO_CACHE;
    payload: IDrinkData;
}

export type ICocktailAction = (
    UppdateCurrentCocktailAction |
    AddDrinkToCacheAction
);
