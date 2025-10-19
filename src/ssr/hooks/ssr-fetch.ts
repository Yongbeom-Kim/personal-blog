import { useCallback, useEffect, useState } from "react";
import type { SsrStateData } from "../utils/types";
import { useSsrState } from "../context/ssr-state";

type SsrFetchOptions<K extends keyof SsrStateData, T> = {
    key: K;
    fetchFn: () => Promise<SsrStateData[K]>;
    select: (data: SsrStateData[K]) => T;
};

type SsrFetchResult<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
};

export const useSsrFetch = <K extends keyof SsrStateData, T>({
    key,
    fetchFn,
    select,
}: SsrFetchOptions<K, T>): SsrFetchResult<T> => {
    const ssrState = useSsrState() as SsrStateData;
    const [data, setData] = useState<SsrStateData[K] | null>(ssrState[key]);
    const [loading, setLoading] = useState(!ssrState[key]);
    const [error, setError] = useState<string | null>(null);

    const fetchCallback = useCallback(() => {
        setLoading(true);
        setError(null);
        fetchFn()
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err?.message || "Error fetching data");
                setLoading(false);
            });
    }, [fetchFn]);

    useEffect(() => {
        if (data) {
            setLoading(false);
            return;
        }
        fetchCallback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchCallback]);

    return {
        data: data ? select(data) : null,
        loading,
        error,
    };
};