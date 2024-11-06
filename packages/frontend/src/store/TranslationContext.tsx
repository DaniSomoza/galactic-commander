import { createContext, useCallback, useContext } from 'react'

import useLocalStorageState from '../hooks/useLocalStorageState'
import { LANGUAGE_SELECTED_STORAGE_KEY } from '../constants'
import spanish from '../translations/spanish.json'
import english from '../translations/english.json'

type spanishTagType = keyof typeof spanish
type englishTagType = keyof typeof english

type languages = 'spanish' | 'english'

type tagType = spanishTagType & englishTagType

const DEFAULT_LANGUAGE: languages = 'spanish'

const languages = {
  spanish,
  english
}

const initialContext = {
  language: DEFAULT_LANGUAGE,
  translate: (tag: string) => tag,
  setLanguage: () => {}
}

type translationsContextValue = {
  language: languages
  translate: (tag: string, ...args: (string | number)[]) => string
  setLanguage: React.Dispatch<React.SetStateAction<languages>>
}

const translationsContext = createContext<translationsContextValue>(initialContext)

function useTranslations() {
  const context = useContext(translationsContext)

  if (!context) {
    throw new Error('useTranslations should be within translationContext Provider')
  }

  return context
}

type TranslationsProviderProps = {
  children: JSX.Element | JSX.Element[]
}

function TranslationsProvider({ children }: TranslationsProviderProps) {
  const [language, setLanguage] = useLocalStorageState<languages>(
    LANGUAGE_SELECTED_STORAGE_KEY,
    DEFAULT_LANGUAGE
  )

  const translate = useCallback(
    (tag: string, ...args: (string | number)[]): string => {
      const selectedLanguage =
        languages[language || DEFAULT_LANGUAGE] || languages[DEFAULT_LANGUAGE]

      const translation = selectedLanguage[tag as tagType] || tag

      if (args.length > 0) {
        return translation.replace(/{(\d+)}/g, (match, number) => {
          const index = parseInt(number, 10)
          return String(args[index])
        })
      }

      return translation
    },
    [language]
  )

  const value = {
    language,
    translate,
    setLanguage
  }

  return <translationsContext.Provider value={value}>{children}</translationsContext.Provider>
}

export { useTranslations, TranslationsProvider }
