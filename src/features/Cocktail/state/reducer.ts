import { cocktailActions } from "./constants";
import {
    AddCocktailSearchToCacheAction,
    AddAdvancedCocktailSearchToCacheAction,
    ICocktailAction,
    ICocktailState,
    UpdateCocktailSearchTypeAction,
    UppdateCurrentCocktailAction
} from "./types";

export function cocktailReducer (
    state: ICocktailState,
    action: ICocktailAction
): ICocktailState {
    switch (action.type) {
        case cocktailActions.UPDATE_CURRENT_DRINK:
            return handleUpdateCurrentDrinkAction(action, state);
        case cocktailActions.ADD_COCKTAIL_SEARCH_TO_CACHE:
            return handleAddCocktailSearchToCacheAction(action, state);
        case cocktailActions.ADD_ADVANCED_COCKTAIL_SEARCH_TO_CACHE:
            return handleAddAdvancedCocktailSearchToCacheAction(action, state);
        case cocktailActions.UPDATE_DRINK_SEARCH:
                return handleUpdateDrinkSearchAction(action, state);
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

function handleAddCocktailSearchToCacheAction (
    action: AddCocktailSearchToCacheAction,
    state: ICocktailState
) {
    return {
        ...state,
        cachedCocktailSearch: action.payload
    };
}

function handleAddAdvancedCocktailSearchToCacheAction (
    action: AddAdvancedCocktailSearchToCacheAction,
    state: ICocktailState
) {
    return {
        ...state,
        cachedAdvancedCocktailSearch: action.payload
    };
}

function handleUpdateDrinkSearchAction (
    action: UpdateCocktailSearchTypeAction,
    state: ICocktailState
) {
    return {
        ...state,
        searchType: action.payload
    };
}
