import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { PlayerType } from 'game-api-microservice/src/types/Player'

import { useAuthorization } from './AuthorizationContext'
import { createPlayer, getPlayer } from '../endpoints/game/playerEndpoints'
import { useGameInfo } from './GameInfoContext'
import usePolling from '../hooks/usePolling'

const initialContext = {
  player: undefined,
  loadPlayer: () => Promise.resolve({ player: {} as PlayerType }),
  createNewPlayer: () => {},
  isPlayerLoading: true,
  createPlayerTaskId: ''
}

type playerContextValue = {
  player?: PlayerType
  loadPlayer: () => Promise<{ player: PlayerType } | undefined>
  createNewPlayer: (universeName: string, raceName: string) => void
  isPlayerLoading: boolean
  createPlayerTaskId?: string
}

const playerContext = createContext<playerContextValue>(initialContext)

function usePlayer() {
  const context = useContext(playerContext)

  if (!context) {
    throw new Error('usePlayer should be within PlayerContext Provider')
  }

  return context
}

type PlayerProviderProps = {
  children: JSX.Element | JSX.Element[]
}

function PlayerProvider({ children }: PlayerProviderProps) {
  const { sessionToken } = useAuthorization()
  const { selectedUniverse } = useGameInfo()

  const [player, setPlayer] = useState<PlayerType>()
  const [createPlayerTaskId, setCreatePlayerTaskId] = useState<string>()
  const [isPlayerLoading, setIsPlayerLoading] = useState(true)

  // logout
  useEffect(() => {
    if (!sessionToken) {
      setPlayer(undefined)
    }
  }, [sessionToken])

  const { name: universeName } = selectedUniverse || {}

  const loadPlayer = useCallback(async () => {
    if (sessionToken && universeName) {
      const response = await getPlayer(universeName)
      const { player } = response.data

      setPlayer(player)
      setIsPlayerLoading(false)

      return { player }
    }
  }, [sessionToken, universeName])

  const createNewPlayer = useCallback(async (universeName: string, raceName: string) => {
    const response = await createPlayer(universeName, raceName)

    const { taskId } = response.data.task

    setCreatePlayerTaskId(taskId)
  }, [])

  usePolling(loadPlayer, 6_000) // polling player each 6 seconds

  const value = {
    player,
    loadPlayer,
    createNewPlayer,
    isPlayerLoading,
    createPlayerTaskId
  }

  return <playerContext.Provider value={value}>{children}</playerContext.Provider>
}

export { usePlayer, PlayerProvider }
