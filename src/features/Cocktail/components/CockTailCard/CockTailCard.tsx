import { ReactElement, ReactNode } from "react";

import { IDrinkData } from "../../../../data";
import { Image } from "../../../../components";

import styles from "./CockTailCard.module.css";

interface Props {
    drink: IDrinkData
    children?: ReactNode
}

export const CocktailCard: React.FC<Props> = ({
    drink,
    children
}): ReactElement => {
    return (
        <article className={styles.cocktailCardArticle}>
            <h3>{drink.name}</h3>
            <div className={styles.imageContainer}>
            <Image image={{ src: drink.thumbNail, alt: `Image of ${drink.name}` }}/>
            </div>
            <p>{drink.alcoholic}</p>
            <p>{drink.category}</p>
            {children}
        </article>
    );
}