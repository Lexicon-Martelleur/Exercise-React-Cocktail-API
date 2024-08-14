import { IDrinkData } from "../../../data/types";
import { cocktailActions } from "./constants";
import {
    AddDrinkToCacheAction,
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
