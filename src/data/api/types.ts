export interface IDrinkData {
    id: string;
    name: string;
    thumbNail: string;
    category: string;
    alcoholic: string;
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
        typeof castedObj.alcoholic === "string"
    );
}
