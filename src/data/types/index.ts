export interface IDrinkData {
    id: string;
    name: string;
    thumbNail: string;
    ingredients: IDrinkIngredient[];
    category?: string;
    alcoholic?: string;
    tags?: string | null;
    glass?: string;
}

export function isRandomDrinkData (obj: unknown): obj is IDrinkData {
    if (typeof obj !== "object" || obj == null) {
        return false;
    }
    
    const castedObj = obj as IDrinkData;

    return (
        typeof castedObj.id === "string" &&
        typeof castedObj.name === "string" &&
        typeof castedObj.thumbNail === "string" &&
        (typeof castedObj.category === "string" || castedObj.category == null) &&
        (typeof castedObj.alcoholic === "string" || castedObj.alcoholic == null) &&
        castedObj.ingredients.every(isDrinkIngredient) &&
        (typeof castedObj.tags === "string" || castedObj.tags == null) &&
        (typeof castedObj.glass === "string" || castedObj.glass == null)
    );
}

export interface IDrinkIngredient {
    ingredient: string;
    measurement: string;
}

export function isDrinkIngredient (obj: unknown): obj is IDrinkData {
    if (typeof obj !== "object" || obj == null) {
        return false;
    }
    
    const castedObj = obj as IDrinkIngredient;

    return (
        typeof castedObj.ingredient === "string" &&
        typeof castedObj.measurement === "string"
    );
}

export type CocktailGroupType = "c" | "g" | "i";

export interface CocktailGroupTypeWithValue {
    group: CocktailGroupType;
    value: string;
}