import { useEffect, useState } from 'react'

type useLocalStorageStateReturnType<T> = [
  value: T,
  setValue: React.Dispatch<React.SetStateAction<T>>
]

function loadValueFromLocalStorage<T>(key: string): T {
  return localStorage.getItem(key) as T
}

function useLocalStorageState<T>(key: string, initialValue: T): useLocalStorageStateReturnType<T> {
  // TODO: this hook only works with strings

  const [state, setState] = useState<T>(loadValueFromLocalStorage<T>(key) || initialValue)

  useEffect(() => {
    localStorage.setItem(key, state as string)
  }, [state, key])

  return [state, setState]
}

export default useLocalStorageState
