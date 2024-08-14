import { ReactElement } from "react";

import { cocktailAPI } from "../../../../data";
import { CocktailCard } from "../CocktailCard";
import { useQuery } from "../../../../hooks";
import { icons } from "../../../../assets";
import { Icon } from "../../../../components";
import { useCocktailContext } from "../../context";
import { uppdateCurrentCocktailAction } from "../../state";
import { useNavigate } from "react-router-dom";
import { path } from "../../../../constants";

import styles from "./RandomCocktail.module.css";


export const RandomCocktail = (): ReactElement => {
    const [dispatchCoctailAction] = useCocktailContext();
    const randomDrinkQuery = useQuery(cocktailAPI.getRandomCocktail);
    const navigate = useNavigate()
    
    if (randomDrinkQuery.pending) {
        return <div className={styles.loader}></div>
    }

    const handleNewRandomDrink = () =>  {
        randomDrinkQuery.update()
    }

    const handleSelectIngredients = () =>  {
        if (randomDrinkQuery.data == null) { return; }
        dispatchCoctailAction(uppdateCurrentCocktailAction(randomDrinkQuery.data));
        navigate(path.INFO);
    }
    
    return (
        <>{(randomDrinkQuery.data != null && !randomDrinkQuery.error)
            ? <CocktailCard drink={randomDrinkQuery.data}>
                <div className={styles.menuCtr}>
                    <button className={styles.menuBtn}
                        onClick={_ => { handleSelectIngredients() }}>
                        <Icon icon={icons.ingredients}/> 
                    </button>
                    <button className={styles.menuBtn}
                        onClick={_ => { handleNewRandomDrink() }}>
                        <Icon icon={icons.refresh}/> 
                    </button>
                </div>
            </CocktailCard>
            : <p>error</p>
        }
        </>
    )
}