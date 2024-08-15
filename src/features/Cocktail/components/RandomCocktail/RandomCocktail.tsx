import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { cocktailAPI } from "../../../../data";
import { CocktailCard } from "../CocktailCard";
import { useQuery } from "../../../../hooks";
import { icons } from "../../../../assets";
import { Icon, SelectButton } from "../../../../components";
import { useCocktailContext } from "../../context";
import { uppdateCurrentCocktailAction } from "../../state";
import { path } from "../../../../constants";

import styles from "./RandomCocktail.module.css";

export const RandomCocktail = (): ReactElement => {
    const [dispatchCoctailAction] = useCocktailContext();
    const randomDrinkQuery = useQuery(cocktailAPI.getRandomCocktail);
    const navigate = useNavigate();

    useEffect(() => {
        randomDrinkQuery.queryData();
    }, []);

    const handleNewRandomDrink = () =>  {
        randomDrinkQuery.queryData()
    }

    const handleSelectDrinkIngredients = () =>  {
        if (randomDrinkQuery.data == null) { return; }
        dispatchCoctailAction(uppdateCurrentCocktailAction(randomDrinkQuery.data));
        navigate(`/${path.INFO}?id=${randomDrinkQuery.data.id}`);
    }

    if (randomDrinkQuery.pending) {
        return (
            <div className={styles.loaderCtr}>
                <div className={styles.loader}></div>
            </div>
        )
    }
    
    return (
        <article className={styles.randomCocktailArticle}>
            {(randomDrinkQuery.data != null && !randomDrinkQuery.error)
            ? <CocktailCard drink={randomDrinkQuery.data}>
                <div className={styles.menuCtr}>
                    <SelectButton
                        onSelect={handleSelectDrinkIngredients}>
                        <Icon icon={icons.ingredients}/> 
                    </SelectButton>
                    <SelectButton
                        onSelect={handleNewRandomDrink}>
                        <Icon icon={icons.refresh}/> 
                    </SelectButton>
                </div>
            </CocktailCard>
            : <p>error</p>
        }
        </article>
    )
}