import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid';

import { icons } from "../../../../assets";
import { Icon } from "../../../../components";
import { cocktailAPI as api } from "../../../../data";
import { useQuery } from "../../../../hooks";
import { path } from "../../../../constants";
import { useCocktailContext } from "../../context";

import styles from "./CocktailSearch.module.css";
import { uppdateCurrentCocktailAction } from "../../state";

/**
 * @TODO Cleanup
 */
export const CocktailSearch = (): ReactElement => {
    const navigate = useNavigate();
    const [dispatchCoctailAction] = useCocktailContext();
    const [searchWord, setSearchword] = useState("");
    const getCocktailByName = async () => await api.getCocktailByName(searchWord);
    const searchDrinkQuery = useQuery(getCocktailByName, false);
    const pageSize = 10;
    const [pageNr, setPageNr] = useState(0);
    const [pages, setPages] = useState(0);
 
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

    useEffect(() => {
        if (searchDrinkQuery.data == null) { return; }
        const pages = Math.ceil(searchDrinkQuery.data.length / 10);
        setPages(pages);
        console.log(pages);

    }, [searchDrinkQuery.data])

    useEffect(() => {
        console.log(pageNr);

    }, [pageNr])

    const updatePageNr = (offset: number) => {
        setPageNr(prevValue => prevValue + offset)
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
                        onChange={event => { setSearchword(event.target.value) }}/>         
                    <button
                        className={styles.submitBtn} 
                        type="submit">
                        <Icon icon={icons.search} size="medium"/>
                    </button>
                </div>
            </form>
            <div className={styles.searchResult}>
            {searchDrinkQuery.data?.slice(pageNr * pageSize, (pageNr + 1) * pageSize)
                .map((item, index) => (
                <button key={uuid()}
                    onClick={_ => { handleSelectDrink(index + (pageNr * pageSize)) }}>
                    {index + (pageNr * pageSize) + 1}. {item.name}
                </button>               
            ))}
            </div>
            {searchDrinkQuery.data != null &&
            searchDrinkQuery.data.length > 0 &&
            <>  
                <p>Page ({pageNr + 1}/{pages})</p>
                <div className={styles.pageNavigation}>
                    <button disabled={pageNr === 0} 
                        onClick={_ => { updatePageNr(-1) }}>
                        Prev
                    </button>
                    <button disabled={pageNr === (pages - 1)} 
                        onClick={_ => { updatePageNr(1) }}>
                        Next
                    </button>
                </div>
            </>}
        </section>
    )
}