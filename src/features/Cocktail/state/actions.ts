import { IDrinkData } from "../../../data/types";
import { cocktailActions } from "./constants";
import {
    AddAdvancedCocktailSearchToCacheAction,
    AddCocktailSearchToCacheAction,
    SearchType,
    UpdateCocktailSearchTypeAction,
    UppdateCurrentCocktailAction
} from "./types";

export function uppdateCurrentCocktailAction (payload: IDrinkData):
UppdateCurrentCocktailAction {
    return {
        type: cocktailActions.UPDATE_CURRENT_DRINK,
        payload
    };
}

export function addCocktailSearchToCacheAction (payload: IDrinkData[]):
AddCocktailSearchToCacheAction {
    return {
        type: cocktailActions.ADD_COCKTAIL_SEARCH_TO_CACHE,
        payload
    };
}

export function addAdvancedCocktailSearchToCacheAction (payload: IDrinkData[]):
AddAdvancedCocktailSearchToCacheAction {
    return {
        type: cocktailActions.ADD_ADVANCED_COCKTAIL_SEARCH_TO_CACHE,
        payload
    };
}

export function updateCocktailSearchTypeAction (payload: SearchType):
UpdateCocktailSearchTypeAction {
    return {
        type: cocktailActions.UPDATE_DRINK_SEARCH,
        payload
    };
}
