import { ReactElement, useState } from "react";

import { icons } from "../../../../assets";
import { Icon } from "../../../../components";
import { cocktailAPI as api, IDrinkData } from "../../../../data";
import { useQuery } from "../../../../hooks";
import { SearchResult } from "./SearchResult";

import styles from "./CocktailForm.module.css";

interface Props {
    onSelectDrink: (cocktail: IDrinkData) => void;
}

export const CocktailForm: React.FC<Props> = ({
    onSelectDrink
}): ReactElement => {
    const [nameSearchString, setNameSearchString] = useState("");
    const searchDrinkQuery = useQuery(api.getCocktailByName, [nameSearchString]);

    const handleSubmit:
    React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        searchDrinkQuery.queryData();
    }

    const handleSelectDrink = (drinkIndex: number) => {
        if (searchDrinkQuery.data == null ||
            drinkIndex >= searchDrinkQuery.data.length) {
            return;
        }
        onSelectDrink(searchDrinkQuery.data[drinkIndex])
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
            {searchDrinkQuery.data != null &&
            searchDrinkQuery.data.length > 0 &&
            <SearchResult
                cocktails={searchDrinkQuery.data}
                onSelectDrink={handleSelectDrink}/>
            }
        </form>
    )
}