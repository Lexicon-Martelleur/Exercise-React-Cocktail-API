import { cocktailActions } from "./constants";
import {
    AddDrinkToCacheAction,
    ICocktailAction,
    ICocktailState,
    UppdateCurrentCocktailAction
} from "./types";

export function cocktailReducer (
    state: ICocktailState,
    action: ICocktailAction
): ICocktailState {
    switch (action.type) {
        case cocktailActions.UPDATE_CURRENT_DRINK:
            return handleUpdateCurrentDrinkAction(action, state);
        case cocktailActions.ADD_DRINK_TO_CACHE:
            return handleAddDrinkToCacheAction(action, state);
        default:
            return state;
    }
}

function handleUpdateCurrentDrinkAction (
    action: UppdateCurrentCocktailAction,
    state: ICocktailState
) {
    return {
        ...state,
        currentDrink: action.payload
    };
}

function handleAddDrinkToCacheAction (
    action: AddDrinkToCacheAction,
    state: ICocktailState
) {
    return {
        ...state,
        cachedDrinks: [
            ...state.cachedDrinks,
            action.payload
        ]
    };
}
