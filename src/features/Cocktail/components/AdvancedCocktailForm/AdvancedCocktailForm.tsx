import { ReactElement } from "react";

import { IDrinkData } from "../../../../data";
import { ErrorModal, Loader, Select, SelectButton } from "../../../../components";
import { SearchResult } from "../SearchResult";

import { searchFormFieldNames } from "./constants";
import { useAdvancedCocktailForm } from "./useAdvancedCocktailForm";
import styles from "./AdvancedCocktailForm.module.css";

interface Props {
    onSelectDrink: (cocktail: IDrinkData) => void;
}

/**
 * @TODO
 * - Cache result
 * - Dynamic routing
 */
export const AdvancedCocktailForm: React.FC<Props> = ({
    onSelectDrink
}): ReactElement => {
    const hook = useAdvancedCocktailForm(onSelectDrink)

    if (hook.isInitialLoading()) { return <Loader /> }

    return (
        <form className={styles.form} onSubmit={hook.handleSubmit}>
            {hook.isError() && <ErrorModal message={hook.errorMsg} onClose={hook.unsetError}/>}
            <label htmlFor={searchFormFieldNames.CATEGORY}>Category</label>
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
            {hook.getSearchResult().length != 0 &&
                <SearchResult
                    cocktails={hook.getSearchResult()}
                    onSelectDrink={hook.handleSelectDrink}/>
            }
        </form>
    );
}
