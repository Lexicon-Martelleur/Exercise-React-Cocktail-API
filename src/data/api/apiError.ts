export class APIError extends Error {
    readonly name = "APIError";

    constructor (message?: string) {
        super(message ?? "API error")
    }
}
