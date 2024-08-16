import { ReactElement, useEffect, useState } from "react";

import { icons } from "../../../../assets";
import { Icon } from "../../../../components";
import { cocktailAPI as api, IDrinkData } from "../../../../data";
import { useQuery } from "../../../../hooks";
import { SearchResult } from "../SearchResult";

import styles from "./CocktailForm.module.css";

interface Props {
    lastResult: IDrinkData[];
    onSelectDrink: (cocktail: IDrinkData) => void;
    onSearchResult: (cocktails: IDrinkData[]) => void;
}

export const CocktailForm: React.FC<Props> = ({
    lastResult,
    onSelectDrink,
    onSearchResult
}): ReactElement => {
    const [pageIndex, setPageIndex] = useState(0);
    const [nameSearchString, setNameSearchString] = useState("");
    const searchDrinkQuery = useQuery(api.getCocktailByName, [nameSearchString]);

    useEffect(() => {
        if (searchDrinkQuery.data === null) {
            return;
        }
        onSearchResult(searchDrinkQuery.data);
    }, [searchDrinkQuery.data]);

    const handleSubmit:
    React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setPageIndex(0);
        searchDrinkQuery.queryData();
    }

    const handleSelectDrink = (drinkIndex: number) => {
        if (searchDrinkQuery.data != null &&
            drinkIndex < searchDrinkQuery.data.length) {
            onSelectDrink(searchDrinkQuery?.data[drinkIndex])
        } else if (drinkIndex < lastResult.length) {
            onSelectDrink(lastResult[drinkIndex])
        }
    }

    const updatePageIndex = (offset: number) => {
        setPageIndex(prevValue => prevValue + offset);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
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
            <SearchResult
                pageIndex={pageIndex}
                cocktails={searchDrinkQuery.data ?? lastResult}
                onSelectDrink={handleSelectDrink}
                onBrowsePage={updatePageIndex}/>
        </form>
    )
}