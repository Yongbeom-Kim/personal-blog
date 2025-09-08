import React, { useContext } from "react";
import type { SsrStateData } from "../utils/types";

const SsrStateContext = React.createContext<SsrStateData>({})

type SsrStateProviderProps = {
    children: React.ReactNode,
    value: SsrStateData,
}

export const SsrStateProvider = ({ children, value }: SsrStateProviderProps) => {
    return (<SsrStateContext value={value}>
        {children}
    </SsrStateContext>)
}

export const useSsrState = () => useContext(SsrStateContext);