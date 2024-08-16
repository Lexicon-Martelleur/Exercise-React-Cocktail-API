import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SelectButton } from "../../../../components";
import { IDrinkData } from "../../../../data";
import { path } from "../../../../constants";
import { useCocktailContext } from "../../context";
import { uppdateCurrentCocktailAction } from "../../state";
import { CocktailForm } from "../CocktailForm";
import { AdvancedCocktailForm } from "../AdvancedCocktailForm";

import styles from "./CocktailSearch.module.css";

export const CocktailSearch = (): ReactElement => {
    const searchTitle = "Search by name";
    const advancedSearchTitle = "Advanced Search";
    const navigate = useNavigate();
    const [dispatchCoctailAction] = useCocktailContext();
    const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
    
    const navigateToSelectedDrink = (cocktail: IDrinkData) =>  {
        dispatchCoctailAction(uppdateCurrentCocktailAction(
            cocktail
        ));
        navigate(`/${path.INFO}`);
    }

    const toggleAdvancedSearch = () => {
        setIsAdvancedSearch(prevValue => !prevValue);
    }
    
    return (
        <article className={styles.searchArticle}>
            {isAdvancedSearch
            ?
                <>
                    <h3>{advancedSearchTitle}</h3>
                    <SelectButton
                        onSelect={toggleAdvancedSearch}>
                        Select {`'${searchTitle}'`}
                    </SelectButton>
                    <AdvancedCocktailForm
                        onSelectDrink={navigateToSelectedDrink}/>
                </>
            :
                <>
                    <h3>{searchTitle}</h3>
                    <SelectButton
                        onSelect={toggleAdvancedSearch}>
                        Select {`'${advancedSearchTitle}'`}
                    </SelectButton>                
                    <CocktailForm
                        onSelectDrink={navigateToSelectedDrink}/>
                </>
            }
        </article>
    )
}
