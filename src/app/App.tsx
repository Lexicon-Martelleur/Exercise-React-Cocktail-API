import { ReactElement, useReducer } from "react";
import { Outlet } from "react-router-dom";

import { BaseLayout } from "../layouts";
import { cocktailReducer, searchType } from "../features";
import {
	getCocktailSearchResult,
	getCocktailAdvancedSearchResult,
	getCurrentCocktailData
} from "../data"

export const App = (): ReactElement => {
	const [
		cocktailState,
		dispatchCocktailAction
	] = useReducer(
		cocktailReducer, {
		currentDrink: getCurrentCocktailData(),
		cachedCocktailSearch: getCocktailSearchResult(),
		cachedAdvancedCocktailSearch: getCocktailAdvancedSearchResult(),
		searchType: searchType.DEFAULT
	});

    return (
		<BaseLayout>
		  	<Outlet context={[dispatchCocktailAction, cocktailState]}/>  
		</BaseLayout>
    );
}

