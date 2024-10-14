import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { UserType, LoginResponseType } from 'auth-microservice/src/types/User'

import { SESSION_TOKEN_STORAGE_KEY } from '../constants'
import useLocalStorageState from '../hooks/useLocalStorageState'
import * as authEndpoints from '../endpoints/auth/authEndpoints'
import Api from '../endpoints/Api'

const initialContext = {
  sessionToken: '',
  user: undefined,
  login: () => Promise.resolve({} as LoginResponseType),
  logout: () => {}
}

type authorizationContextValue = {
  sessionToken: string
  user?: UserType
  login: (email: string, password: string) => Promise<LoginResponseType>
  logout: () => void
}

const authorizationContext = createContext<authorizationContextValue>(initialContext)

function useAuthorization() {
  const context = useContext(authorizationContext)

  if (!context) {
    throw new Error('useAuthorization should be within AuthorizationContext Provider')
  }

  return context
}

type AuthorizationProviderProps = {
  children: JSX.Element | JSX.Element[]
}

function AuthorizationProvider({ children }: AuthorizationProviderProps) {
  const [sessionToken, setSessionToken] = useLocalStorageState(SESSION_TOKEN_STORAGE_KEY, '')
  const [user, setUser] = useState<UserType>()

  useEffect(() => {
    Api.setSessionToken(sessionToken)
  }, [sessionToken])

  useEffect(() => {
    async function loadUser() {
      if (sessionToken && !user) {
        const response = await authEndpoints.getUser()
        const { user } = response.data

        setUser(user)
      }
    }

    loadUser()
  }, [sessionToken, user])

  const login = useCallback(async (email: string, password: string) => {
    const response = await authEndpoints.login(email, password)

    const { sessionToken, user } = response.data

    setSessionToken(sessionToken)
    setUser(user)

    return { sessionToken, user }
  }, [])

  const logout = useCallback(() => {
    setSessionToken('')
    setUser(undefined)
  }, [])

  const value = {
    user,
    login,
    logout,
    sessionToken
  }

  return <authorizationContext.Provider value={value}>{children}</authorizationContext.Provider>
}

export { useAuthorization, AuthorizationProvider }
