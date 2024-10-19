import { createContext, useContext, useEffect, useState } from 'react'

import { RaceType } from 'game-api-microservice/src/types/Race'
import { UniverseType } from 'game-api-microservice/src/types/Universe'

import { getGameInfo } from '../endpoints/game/gameEndpoints'

const initialContext = {
  races: [],
  universes: [],
  selectedUniverse: undefined,
  setSelectedUniverse: () => {}
}

type gameInfoContextValue = {
  races: RaceType[]
  universes: UniverseType[]
  selectedUniverse?: UniverseType
  setSelectedUniverse: React.Dispatch<React.SetStateAction<UniverseType | undefined>>
}

const gameInfoContext = createContext<gameInfoContextValue>(initialContext)

function useGameInfo() {
  const context = useContext(gameInfoContext)

  if (!context) {
    throw new Error('useGameInfo should be within GameInfoContext Provider')
  }

  return context
}

type GameInfoProviderProps = {
  children: JSX.Element | JSX.Element[]
}

function GameInfoProvider({ children }: GameInfoProviderProps) {
  const [races, setRaces] = useState<RaceType[]>([])
  const [universes, setUniverses] = useState<UniverseType[]>([])

  const [selectedUniverse, setSelectedUniverse] = useState<UniverseType>()

  useEffect(() => {
    async function loadGameInfo() {
      const { data: gameInfo } = await getGameInfo()

      const { races, universes } = gameInfo

      setRaces(races)
      setUniverses(universes)
      setSelectedUniverse(universes[0])
    }

    loadGameInfo()
  }, [])

  const value = {
    races,
    universes,
    selectedUniverse,
    setSelectedUniverse
  }

  return <gameInfoContext.Provider value={value}>{children}</gameInfoContext.Provider>
}

export { useGameInfo, GameInfoProvider }
