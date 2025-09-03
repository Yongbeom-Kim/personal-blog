import { type ReactNode, useState, useEffect } from "react"
import { ThemeContext, type Theme } from "./theme-context"

export const ThemeProvider = ({children}: {children: ReactNode}) => {
    const [theme, setTheme] = useState<Theme>(document.documentElement.getAttribute('data-theme')! as Theme)

    useEffect(() => {
        console.log(theme)
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}