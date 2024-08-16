import React, { useEffect, useState } from "react";

import { useQuery } from "../../../../hooks";
import {
    cocktailAPI as api,
    APIError,
    CocktailGroupTypeWithValue,
    IDrinkData
} from "../../../../data";

export const useAdvancedCocktailForm = (
    lastResult: IDrinkData[],
    resultSection: React.MutableRefObject<HTMLDivElement | null>,
    onSelectDrink: (cocktail: IDrinkData) => void,
    onSearchResult: (cocktails: IDrinkData[]) => void
) => {
    const emptyErrorMsg = "";
    const noneValue = "NO VALUE";
    const [category, setCategory] = useState(noneValue);
    const [glassType, setGlassType] = useState(noneValue);
    const [ingredient, setIngredient] = useState(noneValue);
    const [errorMsg, setErrorMsg] = useState(emptyErrorMsg);
    const [pageIndex, setPageIndex] = useState(0);
    
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
        categoryGroupQuery.queryData();
        glassGroupQuery.queryData();
        ingredientGroupQuery.queryData();
    }, []);

    useEffect(() => {
        let msg
        if (categoryGroupQuery.error) { msg = categoryGroupQuery.errorMsg; }
        else if (ingredientGroupQuery.error) { msg = ingredientGroupQuery.errorMsg; }
        else if (glassGroupQuery.error) { msg = glassGroupQuery.errorMsg }
        else if (searchDrinkQuery.error) { msg = searchDrinkQuery.errorMsg; }
        else { msg = emptyErrorMsg; }
        setErrorMsg(msg)
    }, [
        categoryGroupQuery.error,
        ingredientGroupQuery.error,
        glassGroupQuery.error,
        searchDrinkQuery.error
    ]);
    
    useEffect(() => {
        if (searchDrinkQuery.data === null) {
            return;
        }
        resultSection.current?.scrollIntoView({ 
            behavior: "smooth",
            block: "start"
        });
        onSearchResult(searchDrinkQuery.data);
    }, [searchDrinkQuery.data]);

    const handleSubmit:
    React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setPageIndex(0);
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
        return searchDrinkQuery.data;
    }

    const isResultLoading = () => (
        searchDrinkQuery.pending && !searchDrinkQuery.idle
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

    const handleSelectDrink = (drinkIndex: number) => {
        if (searchDrinkQuery.data != null &&
            drinkIndex < searchDrinkQuery.data.length) {
                api.getCocktailById(searchDrinkQuery.data[drinkIndex].id).then(cocktail => {
                    onSelectDrink(cocktail);
                }).catch(err => {
                    err instanceof APIError
                        ? setErrorMsg(err.message)
                        : setErrorMsg("Unknown error")
                })
        } else if (drinkIndex < lastResult.length) {
            onSelectDrink(lastResult[drinkIndex])
        }
    }

    const updatePageIndex = (offset: number) => {
        setPageIndex(prevValue => prevValue + offset)
    }

    const isError = () => errorMsg !== emptyErrorMsg;

    const unsetError = () => { setErrorMsg(emptyErrorMsg); }

    return {
        category,
        ingredient,
        glassType,
        errorMsg,
        pageIndex,
        handleSubmit,
        getSearchResult,
        getCategories,
        getIngredients,
        getGlassTypes,
        updateCategory,
        updateIngredient,
        updateGlassType,
        isSubmitableForm,
        isInitialLoading,
        isResultLoading,
        handleSelectDrink,
        updatePageIndex,
        isError,
        unsetError
    }
}