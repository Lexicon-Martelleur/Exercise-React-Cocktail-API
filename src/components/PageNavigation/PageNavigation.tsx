import React, { ReactElement } from "react";

import styles from "./PageNavigation.module.css";

interface Props {
    pageIndex: number;
    pages: number;
    onBrowsePage: (page: number) => void;
}

export const PageNavigation: React.FC<Props> = ({
    pageIndex,
    pages,
    onBrowsePage
}): ReactElement => {
    return (
        <article className={styles.pageNavigationArticle}>  
            <button
                type="button"
                disabled={pageIndex === 0} 
                onClick={_ => { onBrowsePage(-1) }}>
                {"<"}
            </button>
            <p>Page ({pageIndex + 1}/{pages})</p>
            <button
                type="button"
                disabled={pageIndex === (pages - 1)} 
                onClick={_ => { onBrowsePage(1) }}>
                {">"}
            </button>
        </article>
    );
}
