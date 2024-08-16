import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

import { SelectButton } from "../../../../components";
import { IDrinkData } from "../../../../data";
import { path } from "../../../../constants";
import { useCocktailContext } from "../../context";
import * as state from "../../state";
import { CocktailForm } from "../CocktailForm";
import { AdvancedCocktailForm } from "../AdvancedCocktailForm";

import styles from "./CocktailSearch.module.css";

export const CocktailSearch = (): ReactElement => {
    const searchTitle = "Search by name";
    const advancedSearchTitle = "Advanced Search";
    const navigate = useNavigate();
    const [dispatchCoctailAction, cocktailState] = useCocktailContext();
    
    const navigateToSelectedDrink = (cocktail: IDrinkData) =>  {
        dispatchCoctailAction(state.uppdateCurrentCocktailAction(
            cocktail
        ));
        navigate(`/${path.INFO}`);
    }

    const handleSearchResult = (cocktails: IDrinkData[]) => {
        dispatchCoctailAction(state.addCocktailSearchToCacheAction(cocktails))
    }

    const handleAdvancedSearchResult = (cocktails: IDrinkData[]) => {
        dispatchCoctailAction(state.addAdvancedCocktailSearchToCacheAction(cocktails))
    }
    
    const isAdvancedSearch = () => cocktailState.searchType === state.searchType.ADVANCED;
    
    const toggleAdvancedSearch = () => {
        const search = isAdvancedSearch()
            ? state.searchType.DEFAULT
            : state.searchType.ADVANCED
        dispatchCoctailAction(state.updateCocktailSearchTypeAction(search));
    }

    return (
        <article className={styles.searchArticle}>
            {isAdvancedSearch()
            ?
                <>
                    <h3>{advancedSearchTitle}</h3>
                    <SelectButton
                        onSelect={toggleAdvancedSearch}>
                        Select {`'${searchTitle}'`}
                    </SelectButton>
                    <AdvancedCocktailForm
                        lastResult={cocktailState.cachedAdvancedCocktailSearch}
                        onSelectDrink={navigateToSelectedDrink}
                        onSearchResult={handleAdvancedSearchResult} />
                </>
            :
                <>
                    <h3>{searchTitle}</h3>
                    <SelectButton
                        onSelect={toggleAdvancedSearch}>
                        Select {`'${advancedSearchTitle}'`}
                    </SelectButton>                
                    <CocktailForm
                        lastResult={cocktailState.cachedCocktailSearch}
                        onSelectDrink={navigateToSelectedDrink}
                        onSearchResult={handleSearchResult} />
                </>
            }
        </article>
    );
}
