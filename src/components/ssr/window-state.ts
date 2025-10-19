import type { SsrStateData } from "../../ssr/utils/types"

const SSR_STATE_DIV_ID = "ssr_state_id"

export const injectSsrState = (html: string, state: SsrStateData): string => {
    const div = `<div id=${SSR_STATE_DIV_ID}>${JSON.stringify(state)}</div>`
    return html.replace('</head>', `${div}</head>`)
}

export const retrieveSsrState = (): SsrStateData => {
    const divElement = document.getElementById(SSR_STATE_DIV_ID)
    if (!divElement)
        throw new Error("SSR state div not found in the DOM")
    const state = JSON.parse(divElement.textContent || "{}")
    divElement?.remove()
    return state as SsrStateData
}