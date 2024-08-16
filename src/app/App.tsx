import { ReactElement, useReducer } from "react";
import { Outlet } from "react-router-dom";

import { BaseLayout } from "../layouts";
import { cocktailReducer, searchType } from "../features";
import * as data from "../data";

export const App = (): ReactElement => {
	const [
		cocktailState,
		dispatchCocktailAction
	] = useReducer(
		cocktailReducer, {
		currentDrink: data.getCurrentCocktailData(),
		cachedCocktailSearch: data.getCocktailSearchResult(),
		cachedCocktailSearchQuery: data.getCocktailSearchQuery(),
		cachedAdvancedCocktailSearch: data.getCocktailAdvancedSearchResult(),
		cachedAdvancedCocktailSearchQuery: data.getAdvancedCocktailSearchQuery(),
		searchType: searchType.DEFAULT
	});

    return (
		<BaseLayout>
		  	<Outlet context={[dispatchCocktailAction, cocktailState]}/>  
		</BaseLayout>
    );
}

