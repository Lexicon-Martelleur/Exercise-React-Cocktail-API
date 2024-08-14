import { useCallback, useEffect, useState } from "react";

export type UseQueryReturnType = ReturnType<typeof useQuery>;

export const useQuery = <Data extends {}>(
    query: () => Promise<Data>,
    queryOnMount: boolean
) => {
    const [ pending, setPending ] = useState<boolean>(true);
    const [ error, setError ] = useState<boolean>(false);
    const [ data, setData ] = useState<Data | null>(null);
    
    const queryData = useCallback(async () => {
        setPending(true);
        try {
            const data = await query();
            setData(data);
            setError(false);
        } catch (err) {
            setData(null);
            setError(true);
        }
        setPending(false);
    }, [query])
    
    useEffect(() => {
        if (queryOnMount) {
            queryData();
        }
    }, [queryData]);

    return {
        data,
        error,
        pending,
        queryData
    };
}