import React, { ReactElement, useRef } from "react";

import { IDrinkData } from "../../../../data";
import { ErrorModal, Loader, Select, SelectButton } from "../../../../components";
import { SearchResult } from "../SearchResult";

import { searchFormFieldNames } from "./constants";
import { useAdvancedCocktailForm } from "./useAdvancedCocktailForm";
import styles from "./AdvancedCocktailForm.module.css";

interface Props {
    lastResult: IDrinkData[];
    onSelectDrink: (cocktail: IDrinkData) => void;
    onSearchResult: (cocktails: IDrinkData[]) => void;
}

export const AdvancedCocktailForm: React.FC<Props> = ({
    lastResult,
    onSelectDrink,
    onSearchResult
}): ReactElement => {
    const resultSection: React.MutableRefObject<HTMLDivElement | null> = useRef(null)
    const hook = useAdvancedCocktailForm(
        lastResult,
        resultSection,
        onSelectDrink,
        onSearchResult
    )

    if (hook.isInitialLoading()) { return <Loader /> }

    return (
        <form className={styles.form} onSubmit={hook.handleSubmit}>
            {hook.isError() && <ErrorModal message={hook.errorMsg} onClose={hook.unsetError}/>}
            <label htmlFor={searchFormFieldNames.CATEGORY}>Drink Category</label>
            <Select name={searchFormFieldNames.CATEGORY}
                value={hook.category}
                options={hook.getCategories()}
                onChange={hook.updateCategory} />
            <label htmlFor={searchFormFieldNames.CATEGORY}>Ingredient</label>
            <Select name={searchFormFieldNames.INGREDIENT}
                value={hook.ingredient}
                options={hook.getIngredients()}
                onChange={hook.updateIngredient} />
            <label htmlFor={searchFormFieldNames.CATEGORY}>Glass type</label> 
            <Select name={searchFormFieldNames.GLASS_TYPE}
                value={hook.glassType}
                options={hook.getGlassTypes()}
                onChange={hook.updateGlassType} />
            {hook.isResultLoading() && <Loader />}
            <SelectButton disabled={!hook.isSubmitableForm()} type="submit">
                Search
            </SelectButton>
            <div className={styles.resultSection} ref={resultSection}></div>
            {<SearchResult
                pageIndex={hook.pageIndex}
                cocktails={hook.getSearchResult() ?? lastResult}
                onSelectDrink={hook.handleSelectDrink}
                onBrowsePage={hook.updatePageIndex} />
            }
        </form>
    );
}
