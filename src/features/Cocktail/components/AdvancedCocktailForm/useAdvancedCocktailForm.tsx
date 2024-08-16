import React, { useEffect, useState } from "react";

import { useQuery } from "../../../../hooks";
import {
    cocktailAPI as api,
    CocktailGroupTypeWithValue,
    IDrinkData
} from "../../../../data";

/**
 * @TODO Batch error state
 */
export const useAdvancedCocktailForm = (
    onSelectDrink: (cocktail: IDrinkData) => void
) => {
    const noneValue = "NO VALUE";
    const [category, setCategory] = useState(noneValue);
    const [glassType, setGlassType] = useState(noneValue);
    const [ingredient, setIngredient] = useState(noneValue);
    
    const searchQueryArgs = ((): CocktailGroupTypeWithValue[] => {
        const searchQueryArgs: CocktailGroupTypeWithValue[] = [];
        if (category.toLocaleLowerCase() !== noneValue.toLocaleLowerCase()) {
            searchQueryArgs.push({ group: "c", value: category })
        }
        if (ingredient.toLocaleLowerCase() !== noneValue.toLocaleLowerCase()) {
            searchQueryArgs.push({ group: "i", value: ingredient })
        }
        if (glassType.toLocaleLowerCase() !== noneValue.toLocaleLowerCase()) {
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

    const getOptions = (data: string[] | null) => {
        return data != null ? [noneValue, ...data] : [];
    }

    const getCategories = () => {
        return getOptions(categoryGroupQuery.data);
    }

    const getIngredients = () => {
        return getOptions(ingredientGroupQuery.data);
    }

    const getGlassTypes = () => {
        return getOptions(glassGroupQuery.data);
    }

    const updateCategory = (
        event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    }

    const updateIngredient = (
        event: React.ChangeEvent<HTMLSelectElement>) => {
        setIngredient(event.target.value);
    }

    const updateGlassType = (
        event: React.ChangeEvent<HTMLSelectElement>) => {
        setGlassType(event.target.value);
    }

    const getSearchResult = () => {
        if (searchDrinkQuery.data == null ||
            searchDrinkQuery.data.length === 0) {
            return []
        }
        return searchDrinkQuery.data; 
    }

    const handleSelectDrink = (drinkIndex: number) => {
        if (searchDrinkQuery.data == null ||
            drinkIndex >= searchDrinkQuery.data.length) {
            return;
        }
        api.getCocktailById(searchDrinkQuery.data[drinkIndex].id).then(cocktail => {
            onSelectDrink(cocktail);
        })
    }

    const isReultLoading = () => (
        getSearchResult().length != 0 && searchDrinkQuery.pending
    );

    const isInitialLoading = () => (
        categoryGroupQuery.pending ||
        ingredientGroupQuery.pending ||
        glassGroupQuery.pending
    );

    const isSubmitableForm = () => (
        (category.toLocaleLowerCase() !== noneValue.toLocaleLowerCase() ||
        glassType.toLocaleLowerCase() !== noneValue.toLocaleLowerCase() ||
        ingredient.toLocaleLowerCase() !== noneValue.toLocaleLowerCase()) &&
        !isInitialLoading()
    );

    return {
        category,
        ingredient,
        glassType,
        getSearchResult,
        getCategories,
        getIngredients,
        getGlassTypes,
        handleSubmit,
        updateCategory,
        updateIngredient,
        updateGlassType,
        handleSelectDrink,
        isSubmitableForm,
        isInitialLoading,
        isReultLoading
    }
}