const defaultMsg = `Error when fetching data from 
    https://www.thecocktaildb.com/api/json/v1/1,
    try to reload borser.`;

export class APIError extends Error {
    readonly name = "APIError";

    constructor (message?: string) {
        super(message ?? defaultMsg);
    }
}
