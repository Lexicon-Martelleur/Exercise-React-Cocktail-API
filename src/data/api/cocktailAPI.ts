import {
    CocktailGroupType,
    CocktailGroupTypeWithValue,
    IDrinkData,
    isRandomDrinkData
} from "../types";
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

    getCocktailById = async (id: string): Promise<IDrinkData> => {
        try {
            const res = await fetch(`${this.API}/lookup.php?i=${id}`);
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

    getCocktailByName = async (searchQuery: string): Promise<IDrinkData[]> => {
        try {
            const res = await fetch(`${this.API}/search.php?s=${searchQuery}`);
            const result = await res.json();
            
            const drinkItems = result.drinks.map((item: any) => ({
                id: item.idDrink,
                name: item.strDrink,
                thumbNail: item.strDrinkThumb,
                category: item.strCategory,
                alcoholic: item.strAlcoholic,
                ingredients: extractIngredienstWithMeasurements(item),
                tags: item.strTags,
                glass: item.strGlass
            }))
            if (drinkItems.every(isRandomDrinkData)) { return drinkItems; }
            else { throw new APIError(); }
        } catch (err) {
            throw new APIError();
        }
    }

    getCocktailGroupeValues = async (groupType: CocktailGroupType):
    Promise<string[]> => {
        try {
            const res = await fetch(`${this.API}/list.php?${groupType}=list`);
            const result = await res.json();
            
            const groupTypes = result.drinks.map((item: any) => {
                switch (groupType) {
                    case "c": return item.strCategory;
                    case "g": return item.strGlass;
                    case "i": return item.strIngredient1;
                    default: [];
                }
            });
            if (groupTypes.every((item: any) => typeof item === "string")) {
                return groupTypes;
            }
            else { throw new APIError(); }
        } catch (err) {
            throw new APIError();
        }
    }

    getCocktailsByMultipleGroupsWithValue = async (
        groupsWithValue: CocktailGroupTypeWithValue[]
    ) => {
        try {
            let cocktails: IDrinkData[] = [];
            for (const item of groupsWithValue) {
                cocktails = cocktails.concat(await this.getCocktailsByGroupValue(item.group, item.value));
            }
            return cocktails;
        } catch (err) {
            throw new APIError();
        }
    }

    getCocktailsByGroupValue = async (groupType: CocktailGroupType, value: string):
    Promise<IDrinkData[]> => {
        try {
            const res = await fetch(`${this.API}/filter.php?${groupType}=${value}`);
            const result = await res.json();
            
            const drinkItems = result.drinks.map((item: any) => ({
                id: item.idDrink,
                name: item.strDrink,
                thumbNail: item.strDrinkThumb,
                ingredients: []
            }))
            if (drinkItems.every(isRandomDrinkData)) { return drinkItems; }
            else { throw new APIError(); }
        } catch (err) {
            throw new APIError();
        }
    }
}

export const cocktailAPI = new CocktailAPI();
