import { useCallback, useEffect, useState } from "react";

export type UseQueryReturnType = ReturnType<typeof useQuery>;

export const useQuery = <Data extends {}>(query: () => Promise<Data>) => {
    const [ pending, setPending ] = useState<boolean>(true);
    const [ error, setError ] = useState<boolean>(false);
    const [ data, setData ] = useState<Data | null>(null);
    
    const fetchData = useCallback(async () => {
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
    }, [])
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        error,
        pending,
        update: fetchData
    };
}