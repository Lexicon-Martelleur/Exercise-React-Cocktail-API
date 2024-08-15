import { ReactElement } from "react";
import { v4 as uuid } from 'uuid';

import { useCocktailContext } from "../../context";

import styles from "./CocktailDetails.module.css";

export const CocktailDetails = (): ReactElement => {
    const [_, cocktailState] = useCocktailContext();
    const drink = cocktailState.currentDrink;
 
    const updateCocktailSection = (element: HTMLElement | null) => {
        if (element == null) { return; }
        element.style.backgroundImage = `url(${cocktailState.currentDrink.thumbNail})`
    }
    
    return (    
        <div ref={updateCocktailSection}
            className={styles.backgroundCtr}>
            <section className={styles.cocktailDetailSection}>
                <h1 className={styles.drinkDetailText}>
                    {drink.name}
                </h1>
                {drink.tags != null && <p className={styles.drinkDetailText}>
                    # {drink.tags}
                </p>}
                <p className={styles.drinkDetailText}>
                    Category: {drink.category}
                </p>
                <p className={styles.drinkDetailText}>
                    Recommended glass: {drink.glass}
                </p>
                <h3 className={styles.drinkDetailText}>
                    Ingredients:
                </h3>
                {cocktailState.currentDrink.ingredients.map(item => (
                    <p key={uuid()}
                        className={styles.drinkDetailText}>
                        {item.measurement} {item.ingredient}
                    </p>
                ))}
            </section>
        </div>
    )
}