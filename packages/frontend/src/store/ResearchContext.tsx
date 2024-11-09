import { createContext, useCallback, useContext, useMemo, useState } from 'react'

import { PlayerType } from 'game-api-microservice/src/types/Player'
import getSecond from 'game-engine/src/helpers/getSecond'

import { usePlayer } from './PlayerContext'
import {
  startResearch as startResearchEndpoint,
  updateResearchQueue as updateResearchQueueEndpoint
} from '../endpoints/game/researchEndpoint'
import usePolling from '../hooks/usePolling'
import { useGameInfo } from './GameInfoContext'
import waitTaskToStart from '../utils/waitTaskToStart'
import waitTaskToFinish from '../utils/waitTaskToFinish'

const initialContext = {
  activeResearch: undefined,
  activeResearchCountdown: 0,
  researchQueue: [],
  researched: [],
  isResearchLoading: true,
  startResearch: () => Promise.resolve(),
  updateResearchQueue: () => Promise.resolve(),
  removeResearchFromQueue: () => Promise.resolve()
}

type researchContextValue = {
  activeResearch: PlayerType['researches']['activeResearch']
  activeResearchCountdown: number
  researchQueue: PlayerType['researches']['queue']
  researched: PlayerType['researches']['researched']
  isResearchLoading: boolean
  startResearch: (researchName: string) => Promise<void>
  updateResearchQueue: (researchName: string) => Promise<void>
  removeResearchFromQueue: (index: number) => Promise<void>
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

  const { selectedUniverse } = useGameInfo()
  const { player, loadPlayer } = usePlayer()

  const activeResearch = player?.researches.activeResearch
  const executeTaskAt = activeResearch?.executeTaskAt || 0

  const researchQueue = useMemo(() => player?.researches.queue || [], [player])
  const researched = useMemo(() => player?.researches.researched || [], [player])

  const isResearchLoading = activeResearch
    ? activeResearchCountdown === 0 && researchQueue.length > 0
    : researchQueue.length > 0

  const updateResearchCountdown = useCallback(async () => {
    if (executeTaskAt) {
      const countdown = (executeTaskAt - getSecond(Date.now())) / 1_000
      const activeResearchCountdown = countdown < 0 ? 0 : countdown
      setActiveResearchCountdown(activeResearchCountdown)

      const isResearchFinished = activeResearchCountdown === 0
      if (isResearchFinished && activeResearch) {
        await waitTaskToFinish(activeResearch.taskId)
        await loadPlayer()
      }
    }
  }, [executeTaskAt, loadPlayer, activeResearch])

  usePolling(updateResearchCountdown)

  const startResearch = useCallback(
    async (researchName: string) => {
      const {
        data: { task }
      } = await startResearchEndpoint(researchName, selectedUniverse!.name)

      await waitTaskToStart(task.taskId)

      await loadPlayer()
    },
    [selectedUniverse, loadPlayer]
  )

  const updateResearchQueue = useCallback(
    async (researchName: string) => {
      const newPlayerQueue = [...researchQueue, researchName]
      await updateResearchQueueEndpoint(newPlayerQueue, selectedUniverse!.name)
      await loadPlayer()
    },
    [researchQueue, selectedUniverse, loadPlayer]
  )

  const removeResearchFromQueue = useCallback(
    async (index: number) => {
      const newPlayerQueue = [...researchQueue.slice(0, index), ...researchQueue.slice(index + 1)]
      await updateResearchQueueEndpoint(newPlayerQueue, selectedUniverse!.name)
      await loadPlayer()
    },
    [researchQueue, selectedUniverse, loadPlayer]
  )

  // TODO: create scheduleResearch
  // TODO: create cancelResearch

  const value = {
    activeResearch,
    activeResearchCountdown,
    researchQueue,
    researched,
    isResearchLoading,
    startResearch,
    updateResearchQueue,
    removeResearchFromQueue
  }

  return <researchContext.Provider value={value}>{children}</researchContext.Provider>
}

export { useResearch, ResearchProvider }
