import { useCallback, useState } from "react";

export type UseQueryReturnType = ReturnType<typeof useQuery>;

export const useQuery = <Data extends {}, Args extends (unknown[])>(
    query: (...args: Args) => Promise<Data>,
    args: Args = [] as unknown as Args
) => {
    const [ pending, setPending ] = useState<boolean>(true);
    const [ error, setError ] = useState<boolean>(false);
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
        }
        setPending(false);
    }, [query, args])

    return {
        data,
        error,
        pending,
        queryData
    };
}
