import { ReactElement } from "react";
import { v4 as uuid } from 'uuid';

import { IDrinkData } from "../../../../data";
import { PageNavigation } from "../../../../components";

import styles from "./SearchResult.module.css";

interface Props {
    pageIndex: number;
    cocktails: IDrinkData[];
    onSelectDrink: (drinkIndex: number) => void
    onBrowsePage: (offset: number) => void
}

export const SearchResult: React.FC<Props> = ({
    pageIndex,
    cocktails,
    onSelectDrink,
    onBrowsePage
}): ReactElement => {
    const pageSize = 10;
    const pages = Math.ceil(cocktails.length / pageSize);
    const startIndex = pageIndex * pageSize;
    const endIndex = (pageIndex + 1) * pageSize;

    const drinkIndex = (index: number) => {
        return index + (pageIndex * pageSize)
    }

    if (cocktails.length === 0) {
        return <></>
    }
    
    return (
        <article className={styles.searchResultArticle}>
            <PageNavigation pageIndex={pageIndex}
                pages={pages}
                onBrowsePage={onBrowsePage} />
            <div className={styles.searchResult}>
            {cocktails.slice(startIndex, endIndex).map((item, index) => (
                <button key={uuid()}
                    className={styles.searchResultItem}
                    type="button"
                    onClick={_ => { onSelectDrink(drinkIndex(index)) }}>
                    {index + (pageIndex * pageSize) + 1}. {item.name}
                </button>               
            ))}
            </div>
            <PageNavigation pageIndex={pageIndex}
                pages={pages}
                onBrowsePage={onBrowsePage} />
        </article>
    )
}