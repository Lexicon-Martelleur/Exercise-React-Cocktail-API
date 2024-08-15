import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid"

import { icons } from "../../../../assets";
import { Icon, SelectButton } from "../../../../components";
import { cocktailAPI as api } from "../../../../data";
import { useQuery } from "../../../../hooks";
import { path } from "../../../../constants";
import { useCocktailContext } from "../../context";
import { uppdateCurrentCocktailAction } from "../../state";
import { SearchResult } from "./SearchResult";

import styles from "./CocktailSearch.module.css";

const searchFormFieldNames = {
    NAME: "name",
    CATEGORY: "category",
    INGREDIENT: "ingredient",
    GLASS_TYPE: "glassType",
} as const

/**
 * @TODO Clean up
 * - Create one form for default/name search
 * - Create one from component for advanced serach
 * - Submit logic
 */
export const CocktailSearch = (): ReactElement => {
    const navigate = useNavigate();
    const [dispatchCoctailAction] = useCocktailContext();
    const [nameSearchString, setNameSearchString] = useState("");
    const [advancedSearch, setAdvancedSearch] = useState(false);
    const searchDrinkQueryByName = useQuery(
        async () => await api.getCocktailByName(nameSearchString), false);
    const categoryListsQuery = useQuery(
        async () => await api.getCocktailListTypes("c"), false);
    const glassListsQuery = useQuery(
        async () => await api.getCocktailListTypes("g"), false);
    const ingredientListsQuery = useQuery(
        async () => await api.getCocktailListTypes("i"), false);

    const handleSubmit:
    React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        searchDrinkQueryByName.queryData();
    }

    const handleSelectDrink = (
        drinkIndex: number
    ) =>  {
        if (searchDrinkQueryByName.data == null ||
            drinkIndex >= searchDrinkQueryByName.data.length) {
            return;
        }
        dispatchCoctailAction(uppdateCurrentCocktailAction(
            searchDrinkQueryByName.data[drinkIndex]
        ));
        navigate(`/${path.INFO}`);
    }

    const toggleAdvancedSearch = () => {
        categoryListsQuery.queryData();
        glassListsQuery.queryData();
        ingredientListsQuery.queryData();
        setAdvancedSearch(prevValue => !prevValue)
    }
    
    return (
        <section className={styles.searchSection}>
            <h3>{advancedSearch ? "Advanced search" : "Search by name"}</h3>
            <SelectButton onSelect={toggleAdvancedSearch}>
                Select {advancedSearch ? "'Search by name'" : "'Advanced Search'"}
            </SelectButton>
            <form onSubmit={handleSubmit}>
                {advancedSearch 
                    ? (
                    <fieldset className={styles.searchFieldSet}>
                        <legend>Advanced search</legend>
                        <label htmlFor={searchFormFieldNames.CATEGORY}>Category</label>
                        <select className={styles.searchField}
                            id={searchFormFieldNames.CATEGORY}
                            name={searchFormFieldNames.CATEGORY}
                            value={"NONE"}
                            onChange={event => { setNameSearchString(event.target.value) }}>
                            {categoryListsQuery.data != null && categoryListsQuery.data.map(value => (
                            <option 
                                key={uuid()}
                                value={value.toLowerCase()}>
                                {value}
                            </option>
                            ))}
                        </select>
                        <label htmlFor={searchFormFieldNames.CATEGORY}>Ingredient</label>
                        <select className={styles.searchField}
                            id={searchFormFieldNames.INGREDIENT}
                            name={searchFormFieldNames.INGREDIENT}
                            value={"NONE"}
                            onChange={event => { setNameSearchString(event.target.value) }}>
                            {ingredientListsQuery.data != null && ingredientListsQuery.data.map(value => (
                            <option 
                                key={uuid()}
                                value={value.toLowerCase()}>
                                {value}
                            </option>
                            ))}
                        </select>
                        <label htmlFor={searchFormFieldNames.CATEGORY}>Glass type</label> 
                        <select className={styles.searchField}
                            id={searchFormFieldNames.GLASS_TYPE}
                            name={searchFormFieldNames.GLASS_TYPE}
                            value={"NONE"}
                            onChange={event => { setNameSearchString(event.target.value) }}>
                            {glassListsQuery.data != null && glassListsQuery.data.map(value => (
                            <option 
                                key={uuid()}
                                value={value.toLowerCase()}>
                                {value}
                            </option>
                            ))}
                        </select>
                            <SelectButton type="submit">
                                Search
                            </SelectButton>
                    </fieldset>
                    )
                    : (
                    <div className={styles.searchCtr}>
                        <input className={styles.searchField}
                            id="name"
                            name="name"
                            autoFocus
                            required
                            placeholder="E.g., margarita..."
                            minLength={2}
                            type="text"
                            onChange={event => { setNameSearchString(event.target.value) }}/>
                        <button
                            className={styles.submitBtn} 
                            type="submit">
                            <Icon icon={icons.search} size="medium"/>
                        </button>
                    </div>
                    )
                }
            </form>
            {searchDrinkQueryByName.data != null &&
            searchDrinkQueryByName.data.length > 0 &&
            <SearchResult
                cocktails={searchDrinkQueryByName.data}
                onSelectDrink={handleSelectDrink}/>
            }
        </section>
    )
}