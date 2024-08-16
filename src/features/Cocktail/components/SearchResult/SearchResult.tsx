import React, { useState } from "react";
import { ReactElement } from "react";
import { v4 as uuid } from 'uuid';

import { IDrinkData } from "../../../../data";
import { PageNavigation } from "../../../../components";

import styles from "./SearchResult.module.css";

interface Props {
    cocktails: IDrinkData[];
    onSelectDrink: (drinkIndex: number) => void
}

export const SearchResult: React.FC<Props> = ({
    cocktails,
    onSelectDrink
}): ReactElement => {
    const [pageIndex, setPageIndex] = useState(0);
    const pageSize = 10;
    const pages = Math.ceil(cocktails.length / pageSize);
    const startIndex = pageIndex * pageSize;
    const endIndex = (pageIndex + 1) * pageSize;

    const updatePageIndex = (offset: number) => {
        setPageIndex(prevValue => prevValue + offset)
    }

    const drinkIndex = (index: number) => {
        return index + (pageIndex * pageSize)
    }
    
    return (
        <article className={styles.searchResultArticle}>
            <PageNavigation pageIndex={pageIndex}
                pages={pages}
                onBrowsePage={updatePageIndex} />
            <div className={styles.searchResult}>
            {cocktails.slice(startIndex, endIndex).map((item, index) => (
                <button key={uuid()}
                    onClick={_ => { onSelectDrink(drinkIndex(index)) }}>
                    {index + (pageIndex * pageSize) + 1}. {item.name}
                </button>               
            ))}
            </div>
            <PageNavigation pageIndex={pageIndex}
                pages={pages}
                onBrowsePage={updatePageIndex} />
        </article>
    )
}