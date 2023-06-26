
import {createContext} from "react";


interface ITheme{
    dark:string
    light: string
}


export const themes:ITheme = {
    dark: 'darks',
    light: 'lights',
}

export const ThemeContext = createContext({})
