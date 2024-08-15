export interface IDrinkData {
    id: string;
    name: string;
    thumbNail: string;
    category: string;
    alcoholic: string;
    ingredients: IDrinkIngredient[];
    tags: string | null;
    glass: string;
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
        typeof castedObj.category === "string" &&
        typeof castedObj.alcoholic === "string" &&
        castedObj.ingredients.every(isDrinkIngredient) &&
        (typeof castedObj.tags === "string" || castedObj.tags == null) &&
        typeof castedObj.glass === "string"
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

