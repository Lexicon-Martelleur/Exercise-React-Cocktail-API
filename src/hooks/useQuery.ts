import { useCallback, useState } from "react";
import { APIError } from "../data";

export type UseQueryReturnType = ReturnType<typeof useQuery>;

export const useQuery = <Data extends {}, Args extends (unknown[])>(
    query: (...args: Args) => Promise<Data>,
    args: Args = [] as unknown as Args
) => {
    const [ pending, setPending ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState("");
    const [ data, setData ] = useState<Data | null>(null);
    
    const queryData = useCallback(async () => {
        setPending(true);
        try {
            const data = await query(...args)
            setData(data);
            setError(false);
        } catch (err) {
            setData(null);
            setError(true);
            err instanceof APIError
                ? setErrorMsg(err.message)
                : setErrorMsg("Unknown error")
        }
        setPending(false);
    }, [query, args])

    return {
        data,
        error,
        errorMsg,
        pending,
        queryData
    };
}
