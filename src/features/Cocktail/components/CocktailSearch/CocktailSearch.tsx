import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SelectButton } from "../../../../components";
import { IDrinkData } from "../../../../data";
import { path } from "../../../../constants";
import { useCocktailContext } from "../../context";
import { uppdateCurrentCocktailAction } from "../../state";
import { CocktailForm } from "./CocktailForm";
import { AdvancedCocktailForm } from "./AdvancedCocktailForm";

import styles from "./CocktailSearch.module.css";

export const CocktailSearch = (): ReactElement => {
    const navigate = useNavigate();
    const [dispatchCoctailAction] = useCocktailContext();
    const [advancedSearch, setAdvancedSearch] = useState(false);
    
    const navigateToSelectedDrink = (cocktail: IDrinkData) =>  {
        dispatchCoctailAction(uppdateCurrentCocktailAction(
            cocktail
        ));
        navigate(`/${path.INFO}`);
    }

    const toggleAdvancedSearch = () => {
        setAdvancedSearch(prevValue => !prevValue);
    }
    
    return (
        <section className={styles.searchSection}>
            <h3>{advancedSearch ? "Search by filter" : "Search by name"}</h3>
            <SelectButton onSelect={toggleAdvancedSearch}>
                Select {advancedSearch ? "'Search by name'" : "'Search by filter'"}
            </SelectButton>
            {advancedSearch
                ? <AdvancedCocktailForm onSelectDrink={navigateToSelectedDrink}/>
                : <CocktailForm onSelectDrink={navigateToSelectedDrink}/>
            }
        </section>
    )
}
