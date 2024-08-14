import { ReactElement } from "react";

import { cocktailAPI } from "../../../../data";
import { CocktailCard } from "../CockTailCard";
import { useQuery } from "../../../../hooks";
import { icons } from "../../../../assets";
import { Icon } from "../../../../components";

import styles from "./RandomCocktail.module.css"

export const RandomCocktail = (): ReactElement => {
    const randomDrinkQuery = useQuery(cocktailAPI.getRandomCocktail);
    
    if (randomDrinkQuery.pending) {
        return <div className={styles.loader}></div>
    }

    const handleNewRandomDrink = () =>  {
        randomDrinkQuery.update()
    }
    
    return (
        <>{(randomDrinkQuery.data != null && !randomDrinkQuery.error)
            ? <CocktailCard drink={randomDrinkQuery.data}>
                <button className={styles.refreshBtn}
                    onClick={_ => { handleNewRandomDrink() }}>
                    <Icon icon={icons.refresh}/> 
                </button>
            </CocktailCard>
            : <p>error</p>
        }
        </>
    )
}