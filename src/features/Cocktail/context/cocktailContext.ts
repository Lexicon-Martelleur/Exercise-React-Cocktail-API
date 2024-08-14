import { useOutletContext } from "react-router-dom";

import {ICocktailState, ICocktailAction } from "../state";

export const useCocktailContext = () => {
    return useOutletContext<[
        React.Dispatch<ICocktailAction>,
        ICocktailState
    ]>();
}
