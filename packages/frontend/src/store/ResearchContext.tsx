import { createContext, useCallback, useContext, useState } from 'react'

import { PlayerType } from 'game-api-microservice/src/types/Player'
import getSecond from 'game-engine/src/helpers/getSecond'

import { usePlayer } from './PlayerContext'
import usePolling from '../hooks/usePolling'

const initialContext = {
  activeResearch: undefined,
  activeResearchCountdown: 0,
  researchQueue: [],
  researched: [],
  isResearchLoading: true
}

type researchContextValue = {
  activeResearch: PlayerType['researches']['activeResearch']
  activeResearchCountdown: number
  researchQueue: PlayerType['researches']['queue']
  researched: PlayerType['researches']['researched']
  isResearchLoading: boolean
}

const researchContext = createContext<researchContextValue>(initialContext)

function useResearch() {
  const context = useContext(researchContext)

  if (!context) {
    throw new Error('useResearch should be within ResearchContext Provider')
  }

  return context
}

type ResearchProviderProps = {
  children: JSX.Element | JSX.Element[]
}

function ResearchProvider({ children }: ResearchProviderProps) {
  const [activeResearchCountdown, setActiveResearchCountdown] = useState(0)

  const { player, loadPlayer } = usePlayer()

  const activeResearch = player?.researches.activeResearch
  const executeTaskAt = activeResearch?.executeTaskAt || 0
  // TODO: useMemo here!!
  const researchQueue = player?.researches.queue || []
  const researched = player?.researches.researched || []
  // TODO: isResearchLoading = activeResearch && activeResearchCountdown === 0 && researchQueue.length > 0
  const isResearchLoading = !activeResearch && researchQueue.length > 0

  const updateResearchCountdown = useCallback(() => {
    if (executeTaskAt) {
      const researchCountDown = (executeTaskAt - getSecond(Date.now())) / 1_000
      setActiveResearchCountdown(researchCountDown)
    }
  }, [executeTaskAt])

  usePolling(updateResearchCountdown)

  const checkNextResearchTask = useCallback(() => {
    const isResearchFinished = activeResearchCountdown === 0
    if (activeResearch && isResearchFinished && researchQueue.length > 0) {
      // setTimeout(loadPlayer, 1_000)
      // llama al de player
      // llama al endpoint de checktask, cuando este finish
    }
  }, [activeResearchCountdown, activeResearch, researchQueue])

  console.log('activeResearchCountdown: ', activeResearchCountdown)

  const value = {
    activeResearch,
    activeResearchCountdown,
    researchQueue,
    researched,
    isResearchLoading
  }

  return <researchContext.Provider value={value}>{children}</researchContext.Provider>
}

export { useResearch, ResearchProvider }
