import { createContext, useCallback, useContext } from 'react'
import { PaletteMode, ThemeProvider as MUIThemeProvider, createTheme, Theme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

import { THEME_MODE_STORAGE_KEY } from '../constants'
import useLocalStorageState from '../hooks/useLocalStorageState'

export const DARK_THEME_MODE: PaletteMode = 'dark'
export const LIGHT_THEME_MODE: PaletteMode = 'light'

const initialContext = {
  theme: createTheme(),
  themeMode: DARK_THEME_MODE,
  switchTheme: () => {},
  isDarkThemeModeEnabled: true,
  isLightThemeModeEnabled: false
}

type themeContextValue = {
  themeMode: PaletteMode
  theme: Theme
  switchTheme: () => void
  isDarkThemeModeEnabled: boolean
  isLightThemeModeEnabled: boolean
}

const themeContext = createContext<themeContextValue>(initialContext)

function useTheme() {
  const context = useContext(themeContext)

  if (!context) {
    throw new Error('useTheme should be within ThemeContext Provider')
  }

  return context
}

type ThemeProviderProps = {
  children: JSX.Element[]
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeMode, setThemeMode] = useLocalStorageState(THEME_MODE_STORAGE_KEY, DARK_THEME_MODE)

  const isDarkThemeModeEnabled = themeMode === DARK_THEME_MODE
  const isLightThemeModeEnabled = themeMode === LIGHT_THEME_MODE

  const switchTheme = useCallback(() => {
    setThemeMode(isDarkThemeModeEnabled ? LIGHT_THEME_MODE : DARK_THEME_MODE)
  }, [isDarkThemeModeEnabled])

  const theme = createTheme({ palette: { mode: themeMode } })

  const value = {
    theme,
    themeMode,
    switchTheme,
    isDarkThemeModeEnabled,
    isLightThemeModeEnabled
  }

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />

      <themeContext.Provider value={value}>{children}</themeContext.Provider>
    </MUIThemeProvider>
  )
}

export { useTheme, ThemeProvider }
