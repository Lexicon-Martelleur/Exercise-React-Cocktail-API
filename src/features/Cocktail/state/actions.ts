import { IDrinkData } from "../../../data/types";
import { cocktailActions } from "./constants";
import {
    AddDrinkToCacheAction,
    SearchType,
    UpdateDrinkSearchTypeAction,
    UppdateCurrentCocktailAction
} from "./types";

export function uppdateCurrentCocktailAction (payload: IDrinkData):
UppdateCurrentCocktailAction {
    return {
        type: cocktailActions.UPDATE_CURRENT_DRINK,
        payload
    };
}

export function addDrinkToCacheAction (payload: IDrinkData):
AddDrinkToCacheAction {
    return {
        type: cocktailActions.ADD_DRINK_TO_CACHE,
        payload
    };
}

export function updateDrinkSearchTypeAction (payload: SearchType):
UpdateDrinkSearchTypeAction {
    return {
        type: cocktailActions.UPDATE_DRINK_SEARCH,
        payload
    };
}
