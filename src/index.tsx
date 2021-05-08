import React, {
  createContext, useState, useContext,
  ReactType
} from 'react'

const themeContext = createContext(null)

interface Themes {
  [key: string]: object
}

interface ThemeProvider {
  theme?: object,
  themes?: Themes,
  default?: string
}

export default (props: ThemeProvider) => {
  const [ current, setCurrent ]: [ string, (key: string) => any ] = useState(props.default)

  return <themeContext.Provider value={props.theme ? {
    themes: null,
    currentTheme: props.theme,
    setTheme: () => console.log('Cannot set theme when in single-theme mode')
  } : {
    themes: props.themes,
    currentTheme: props.themes[current],
    setTheme: (key: string) => setCurrent(key)
  }} >
    {props.children}
  </themeContext.Provider>
}

export const withTheme = (WrappedComponent: ReactType) => (props?: object) => (
  <themeContext.Consumer>
    {(themeValue) => (
      <WrappedComponent
        {...props}
        setTheme={themeValue.setTheme}
        theme={themeValue.currentTheme}
      />
    )}
  </themeContext.Consumer>
)

export const useTheme = (): [ object, (key: string) => any ] => {
  const themeValue = useContext(themeContext)

  return [
    themeValue.currentTheme,
    themeValue.setTheme
  ]
}
