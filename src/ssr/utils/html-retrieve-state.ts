import type { SsrStateData } from "./types"
import { SSR_STATE_ELEMENT_ID } from "./constants"

if (__SSR__) {
    throw new Error("retrieveSsrState can only be called on the client")
}

let ssrState: SsrStateData | null = null

export const retrieveSsrState = (): SsrStateData => {
    if (ssrState) return ssrState
    const divElement = document.getElementById(SSR_STATE_ELEMENT_ID)
    if (!divElement)
        throw new Error("SSR state element not found in the DOM")
    ssrState = JSON.parse(divElement.textContent || "{}")
    divElement?.remove()
    return ssrState!
}