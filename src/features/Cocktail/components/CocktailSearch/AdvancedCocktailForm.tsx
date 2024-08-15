import React, { useEffect, useState } from "react";
import { ReactElement } from "react";
import { v4 as uuid } from "uuid";

import { searchFormFieldNames } from "./constants";
import { useQuery } from "../../../../hooks";
import { cocktailAPI as api, CocktailGroupTypeWithValue, IDrinkData } from "../../../../data";
import { SelectButton } from "../../../../components";
import { SearchResult } from "./SearchResult";

import styles from "./AdvancedCocktailForm.module.css";

interface Props {
    onSelectDrink: (cocktail: IDrinkData) => void;
}

/**
 * @TODO
 * - Create reusable select component
 * - Cleanup
 * - Simplify
 * - Seperate (mayby can use utility functions or custom hooks)
 * - Implement error and pending state
 */
export const AdvancedCocktailForm: React.FC<Props> = ({
    onSelectDrink
}): ReactElement => {
    const noneValue = "NONE";
    const [category, setCategory] = useState(noneValue);
    const [glassType, setGlassType] = useState(noneValue);
    const [ingredient, setIngredient] = useState(noneValue);
    const isSubmitableForm = (
        category !== noneValue ||
        glassType !== noneValue ||
        ingredient !== noneValue
    );
    const searchQueryArgs = ((): CocktailGroupTypeWithValue[] => {
        const searchQueryArgs: CocktailGroupTypeWithValue[] = [];
        if (category !== noneValue) {
            searchQueryArgs.push({ group: "c", value: category })
        }
        if (ingredient !== noneValue) {
            searchQueryArgs.push({ group: "i", value: ingredient })
        }
        if (glassType !== noneValue) {
            searchQueryArgs.push({ group: "g", value: glassType })
        }
        return searchQueryArgs
    })();
    const categoryGroupQuery = useQuery(api.getCocktailGroupeValues, ["c"]);
    const glassGroupQuery = useQuery(api.getCocktailGroupeValues, ["g"]);
    const ingredientGroupQuery = useQuery(api.getCocktailGroupeValues, ["i"]);
    const searchDrinkQuery = useQuery(api.getCocktailsByMultipleGroupsWithValue, [searchQueryArgs]);

    useEffect(() => {
        categoryGroupQuery.data == null && categoryGroupQuery.queryData();
        glassGroupQuery.data == null && glassGroupQuery.queryData();
        ingredientGroupQuery.data == null && ingredientGroupQuery.queryData();
    }, [categoryGroupQuery, glassGroupQuery, ingredientGroupQuery]);

    const handleSubmit:
    React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        searchDrinkQuery.queryData();
    }

    /**
     * @TODO Error handling here
     */
    const handleSelectDrink = (drinkIndex: number) => {
        if (searchDrinkQuery.data == null ||
            drinkIndex >= searchDrinkQuery.data.length) {
            return;
        }
        api.getCocktailById(searchDrinkQuery.data[drinkIndex].id).then(cocktail => {
            onSelectDrink(cocktail);
        })
    }

    const getOptions = (data: string[] | null) => {
        return data != null ? [noneValue, ...data] : [];
    }

    const handleChange = (
        changeCallback: (value: string) => void,
        event: React.ChangeEvent<HTMLSelectElement>) => {
        changeCallback(event.target.value);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <fieldset className={styles.searchFieldSet}>
                <label htmlFor={searchFormFieldNames.CATEGORY}>Category</label>
                <select className={styles.searchField}
                    id={searchFormFieldNames.CATEGORY}
                    name={searchFormFieldNames.CATEGORY}
                    value={category}
                    onChange={event => { handleChange(setCategory, event) }}>
                    {getOptions(categoryGroupQuery.data).map(value => (
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
                    value={ingredient}
                    onChange={event => { handleChange(setIngredient, event) }}>
                    {getOptions(ingredientGroupQuery.data).map(value => (
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
                    value={glassType}
                    onChange={event => { handleChange(setGlassType, event) }}>
                    {getOptions(glassGroupQuery.data).map(value => (
                    <option 
                        key={uuid()}
                        value={value.toLowerCase()}>
                        {value}
                    </option>
                    ))}
                </select>
                <SelectButton disabled={!isSubmitableForm} type="submit">
                    Search
                </SelectButton>
            </fieldset>
            {searchDrinkQuery.data != null &&
            searchDrinkQuery.data.length > 0 &&
            <SearchResult
                cocktails={searchDrinkQuery.data}
                onSelectDrink={handleSelectDrink}/>
            }
        </form>
    );
}
