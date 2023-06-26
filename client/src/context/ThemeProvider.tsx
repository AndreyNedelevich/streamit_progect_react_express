import React, {FC} from 'react'
import {ReactElement} from "react";


import { ThemeContext, themes } from './ThemeContext'

const getTheme = () => {
    const theme = `${window?.localStorage?.getItem('theme')}`
    if (Object.values(themes).includes(theme)) return theme

    const userMedia = window.matchMedia('(prefers-color-scheme: light)')
    if (userMedia.matches) return themes.light

    return themes.dark
}



interface IProps {
    children: ReactElement
}


const ThemeProvider:FC<IProps> = ({ children }) => {
    const [ theme, setTheme ] = React.useState(getTheme)

    React.useEffect(() => {
        document.documentElement.dataset.theme = theme
        localStorage.setItem('theme', theme)
    }, [ theme ])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export  {ThemeProvider}