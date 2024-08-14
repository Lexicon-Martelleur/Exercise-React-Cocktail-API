import { ReactElement } from "react";
import { v4 as uuidv } from 'uuid';

import { useCocktailContext } from "../../context";

import styles from "./CocktailDetails.module.css";

export const CocktailDetails = (): ReactElement => {
    const [_, cocktailState] = useCocktailContext();
    const derivedTags = cocktailState.currentDrink.tags?.split(",") ?? [];

    const updateCocktailSection = (element: HTMLElement | null) => {
        if (element == null) { return; }
        element.style.backgroundImage = `url(${cocktailState.currentDrink.thumbNail})`
    }
    
    return (    
        <section ref={updateCocktailSection}
            className={styles.cocktailSection}>
            <div className={styles.transparentCtr}>
                <h1 className={styles.drinkDetailText}>
                    {cocktailState.currentDrink.name}
                </h1>
                <p className={styles.drinkDetailText}>
                    Proper glass: {cocktailState.currentDrink.glass}
                </p>
                {derivedTags.map((item, index) => (
                    <p key={uuidv()} className={styles.drinkDetailText}>
                        Tag {index + 1}: {item}
                    </p>
                ))}
                {cocktailState.currentDrink.ingredients.map(item => (
                    <p key={uuidv()} className={styles.drinkDetailText}>
                        {item.measurement} {item.ingredient}
                    </p>
                ))}
                <p className={styles.drinkDetailText}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero eaque placeat iusto minima, ipsum, ea adipisci reprehenderit quasi iure voluptate earum omnis fugit aliquam. Facere itaque quam iste, porro libero officiis maiores dicta vel non asperiores corrupti! Deleniti facere, harum alias iusto reiciendis ad laborum atque repellat nostrum libero odio nam sint iste ratione debitis inventore est. Commodi, alias rem totam voluptatum laboriosam ullam obcaecati blanditiis quasi! Ea unde quia placeat iusto natus delectus illo quae, laboriosam perferendis voluptas eius dicta expedita, nesciunt accusantium, harum iste quibusdam nisi suscipit! Labore praesentium commodi mollitia repellendus sequi vel maxime, illum non rem!
                </p>
            </div>
        </section>
    )
}