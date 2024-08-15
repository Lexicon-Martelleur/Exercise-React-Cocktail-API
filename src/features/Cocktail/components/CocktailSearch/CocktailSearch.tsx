import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

import { icons } from "../../../../assets";
import { Icon } from "../../../../components";
import { cocktailAPI as api } from "../../../../data";
import { useQuery } from "../../../../hooks";
import { path } from "../../../../constants";
import { useCocktailContext } from "../../context";
import { uppdateCurrentCocktailAction } from "../../state";
import { SearchResult } from "./SearchResult";

import styles from "./CocktailSearch.module.css";

/**
 * @TODO Cleanup
 */
export const CocktailSearch = (): ReactElement => {
    const navigate = useNavigate();
    const [dispatchCoctailAction] = useCocktailContext();
    const [searchString, setSearchString] = useState("");
    const getCocktailByName = async () => await api.getCocktailByName(searchString);
    const searchDrinkQuery = useQuery(getCocktailByName, false);
 
    const handleSubmit:
    React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        searchDrinkQuery.queryData();
    }

    const handleSelectDrink = (
        drinkIndex: number
    ) =>  {
        if (searchDrinkQuery.data == null ||
            drinkIndex >= searchDrinkQuery.data.length) {
            return;
        }
        dispatchCoctailAction(uppdateCurrentCocktailAction(
            searchDrinkQuery.data[drinkIndex]
        ));
        navigate(`/${path.INFO}`);
    }
    
    return (
        <section className={styles.searchSection}>
            <h3>Search drink by name</h3>
            <form onSubmit={handleSubmit}>
                <div className={styles.searchCtr}>
                    <input className={styles.searchField}
                        name="jdlkasjdkl"  
                        autoFocus
                        required
                        placeholder="E.g., margarita..."
                        minLength={2}
                        type="text"
                        onChange={event => { setSearchString(event.target.value) }}/>         
                    <button
                        className={styles.submitBtn} 
                        type="submit">
                        <Icon icon={icons.search} size="medium"/>
                    </button>
                </div>
            </form>
            {searchDrinkQuery.data != null &&
            searchDrinkQuery.data.length > 0 &&
            <SearchResult
                cocktails={searchDrinkQuery.data}
                onSelectDrink={handleSelectDrink}/>
            }
        </section>
    )
}