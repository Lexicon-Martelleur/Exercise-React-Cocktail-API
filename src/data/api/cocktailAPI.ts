import { IDrinkData, isRandomDrinkData } from "../types";
import { APIError } from "./apiError";
import { extractIngredienstWithMeasurements } from "../utility";

export class CocktailAPI {
    private readonly API = "https://www.thecocktaildb.com/api/json/v1/1";
    
    getRandomCocktail = async (): Promise<IDrinkData> => {
        try {
            const res = await fetch(`${this.API}/random.php`);
            const result = await res.json();
            
            const data = {
                id: result.drinks[0].idDrink,
                name: result.drinks[0].strDrink,
                thumbNail: result.drinks[0].strDrinkThumb,
                category: result.drinks[0].strCategory,
                alcoholic: result.drinks[0].strAlcoholic,
                ingredients: extractIngredienstWithMeasurements(result.drinks[0]),
                tags: result.drinks[0].strTags,
                glass: result.drinks[0].strGlass
            }
            if (isRandomDrinkData(data)) { return data; }
            else { throw new APIError(); }
        } catch (err) {
            throw new APIError();
        }
    }
}

export const cocktailAPI = new CocktailAPI();
