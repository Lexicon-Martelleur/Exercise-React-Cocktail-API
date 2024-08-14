import { IDrinkIngredient } from "../types";

const FIRST_INGREDIENT_INDEX = 1;
const LAST_INGREDIENT_INDEX = 15;

export function extractIngredienstWithMeasurements (obj: unknown):
IDrinkIngredient[] {
    const ingredients: IDrinkIngredient[] = [];
    if (typeof obj !== "object" || obj == null) {
        return ingredients;
    }

    for (let i = FIRST_INGREDIENT_INDEX; i <= LAST_INGREDIENT_INDEX; i++) {
        const ingredient = (obj as any)[`strIngredient${i}`];
        const measurement = (obj as any)[`strMeasure${i}`];
        if ( ingredient == null || measurement == null) {
            break;
        }
        ingredients.push({ ingredient, measurement })
    }
    return ingredients
}
