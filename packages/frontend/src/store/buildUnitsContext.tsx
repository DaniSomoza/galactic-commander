import { createContext, useCallback, useContext, useState, useMemo } from 'react'

import { PlanetType } from 'game-api-microservice/src/types/Planet'
import { UnitTypes } from 'game-api-microservice/src/types/Unit'
import getSecond from 'game-engine/src/helpers/getSecond'

import { usePlayer } from './PlayerContext'
import {
  startBuildUnits as startBuildUnitsEndpoint,
  updateBuildUnitsQueue as updateBuildUnitsQueueEndpoint
} from '../endpoints/game/buildUnitsEndpoint'
import usePolling from '../hooks/usePolling'
import { useGameInfo } from './GameInfoContext'
import waitTaskToStart from '../utils/waitTaskToStart'
import waitTaskToFinish from '../utils/waitTaskToFinish'

const initialContext = {
  activeBuildTroops: undefined,
  activeBuildSpaceships: undefined,
  activeBuildDefenses: undefined,

  activeBuildTroopsCountdown: 0,
  activeBuildSpaceshipsCountdown: 0,
  activeBuildDefensesCountdown: 0,

  buildTroopsQueue: [],
  buildSpaceshipsQueue: [],
  buildDefensesQueue: [],

  isBuildUnitsLoading: true,

  starBuildUnits: () => Promise.resolve(),
  updateBuildUnitsQueue: () => Promise.resolve(),
  removeBuildUnitsFromQueue: () => Promise.resolve()
}

type buildUnitsContextValue = {
  activeBuildTroops?: PlanetType['unitBuild']['troops']['activeBuild']
  activeBuildSpaceships?: PlanetType['unitBuild']['spaceships']['activeBuild']
  activeBuildDefenses?: PlanetType['unitBuild']['defenses']['activeBuild']

  activeBuildTroopsCountdown: number
  activeBuildSpaceshipsCountdown: number
  activeBuildDefensesCountdown: number

  buildTroopsQueue: PlanetType['unitBuild']['troops']['queue']
  buildSpaceshipsQueue: PlanetType['unitBuild']['spaceships']['queue']
  buildDefensesQueue: PlanetType['unitBuild']['defenses']['queue']

  isBuildUnitsLoading: boolean

  starBuildUnits: (unitName: string, amount: number, unitType: UnitTypes) => Promise<void>
  updateBuildUnitsQueue: (unitName: string, amount: number, unitType: UnitTypes) => Promise<void>
  removeBuildUnitsFromQueue: (index: number, unitType: UnitTypes) => Promise<void>
}

const buildUnitsContext = createContext<buildUnitsContextValue>(initialContext)

function useBuildUnits() {
  const context = useContext(buildUnitsContext)

  if (!context) {
    throw new Error('useBuildUnits should be within BuildUnitsContext Provider')
  }

  return context
}

type BuildUnitsProviderProps = {
  children: JSX.Element | JSX.Element[]
}

function BuildUnitsProvider({ children }: BuildUnitsProviderProps) {
  const [activeBuildTroopsCountdown, setActiveBuildTroopsCountdown] = useState(0)
  const [activeBuildSpaceshipsCountdown, setActiveBuildSpaceshipsCountdown] = useState(0)
  const [activeBuildDefensesCountdown, setActiveBuildDefensesCountdown] = useState(0)

  const { selectedUniverse } = useGameInfo()
  const { loadPlayer, isPlayerLoading, selectedPlanet } = usePlayer()

  const activeBuildTroops = selectedPlanet?.unitBuild.troops.activeBuild
  const activeBuildSpaceships = selectedPlanet?.unitBuild.spaceships.activeBuild
  const activeBuildDefenses = selectedPlanet?.unitBuild.defenses.activeBuild

  const buildTroopsQueue = useMemo(
    () => selectedPlanet?.unitBuild.troops.queue || [],
    [selectedPlanet]
  )
  const buildSpaceshipsQueue = useMemo(
    () => selectedPlanet?.unitBuild.spaceships.queue || [],
    [selectedPlanet]
  )
  const buildDefensesQueue = useMemo(
    () => selectedPlanet?.unitBuild.defenses.queue || [],
    [selectedPlanet]
  )

  const executeBuildTroopsTaskAt = activeBuildTroops?.executeTaskAt || 0
  const executeBuildSpaceshipsTaskAt = activeBuildSpaceships?.executeTaskAt || 0
  const executeBuildDefensesTaskAt = activeBuildDefenses?.executeTaskAt || 0

  const updateBuildTroopsCountdown = useCallback(async () => {
    if (executeBuildTroopsTaskAt) {
      const countdown = (executeBuildTroopsTaskAt - getSecond(Date.now())) / 1_000
      const activeBuildTroopsCountdown = countdown < 0 ? 0 : countdown
      setActiveBuildTroopsCountdown(activeBuildTroopsCountdown)

      const isBuildTroopsFinished = activeBuildTroopsCountdown === 0
      if (isBuildTroopsFinished && activeBuildTroops) {
        await waitTaskToFinish(activeBuildTroops.taskId)
        await loadPlayer()
      }
    }
  }, [executeBuildTroopsTaskAt, loadPlayer, activeBuildTroops])

  usePolling(updateBuildTroopsCountdown)

  const updateBuildSpaceshipsCountdown = useCallback(async () => {
    if (executeBuildSpaceshipsTaskAt) {
      const countdown = (executeBuildSpaceshipsTaskAt - getSecond(Date.now())) / 1_000
      const activeBuildSpaceshipsCountdown = countdown < 0 ? 0 : countdown
      setActiveBuildSpaceshipsCountdown(activeBuildSpaceshipsCountdown)

      const isBuildSpaceshipsFinished = activeBuildSpaceshipsCountdown === 0
      if (isBuildSpaceshipsFinished && activeBuildSpaceships) {
        await waitTaskToFinish(activeBuildSpaceships.taskId)
        await loadPlayer()
      }
    }
  }, [executeBuildSpaceshipsTaskAt, loadPlayer, activeBuildSpaceships])

  usePolling(updateBuildSpaceshipsCountdown)

  const updateBuildDefensesCountdown = useCallback(async () => {
    if (executeBuildDefensesTaskAt) {
      const countdown = (executeBuildDefensesTaskAt - getSecond(Date.now())) / 1_000
      const activeBuildDefensesCountdown = countdown < 0 ? 0 : countdown
      setActiveBuildDefensesCountdown(activeBuildDefensesCountdown)

      const isBuildDefensesFinished = activeBuildDefensesCountdown === 0
      if (isBuildDefensesFinished && activeBuildDefenses) {
        await waitTaskToFinish(activeBuildDefenses.taskId)
        await loadPlayer()
      }
    }
  }, [executeBuildDefensesTaskAt, loadPlayer, activeBuildDefenses])

  usePolling(updateBuildDefensesCountdown)

  const isBuildUnitsLoading =
    isPlayerLoading ||
    (activeBuildTroops
      ? activeBuildTroopsCountdown === 0 && buildTroopsQueue.length > 0
      : buildTroopsQueue.length > 0) ||
    (activeBuildSpaceships
      ? activeBuildSpaceshipsCountdown === 0 && buildSpaceshipsQueue.length > 0
      : buildSpaceshipsQueue.length > 0) ||
    (activeBuildDefenses
      ? activeBuildDefensesCountdown === 0 && buildDefensesQueue.length > 0
      : buildDefensesQueue.length > 0)

  const starBuildUnits = useCallback(
    async (unitName: string, amount: number, unitType: UnitTypes) => {
      const {
        data: { task }
      } = await startBuildUnitsEndpoint(
        unitName,
        unitType,
        amount,
        selectedPlanet!.coordinates,
        selectedUniverse!.name
      )
      await waitTaskToStart(task.taskId)
      await loadPlayer()
    },
    [selectedUniverse, loadPlayer, selectedPlanet]
  )

  const updateBuildUnitsQueue = useCallback(
    async (unitName: string, amount: number, unitType: UnitTypes) => {
      const queues = {
        TROOP: buildTroopsQueue,
        SPACESHIP: buildSpaceshipsQueue,
        DEFENSE: buildDefensesQueue
      }

      const newBuildUnitsQueue = [...queues[unitType], { unitName, amount }]
      await updateBuildUnitsQueueEndpoint(
        newBuildUnitsQueue,
        selectedPlanet!.coordinates,
        unitType,
        selectedUniverse!.name
      )
      await loadPlayer()
    },
    [
      buildTroopsQueue,
      buildDefensesQueue,
      buildSpaceshipsQueue,
      selectedUniverse,
      selectedPlanet,
      loadPlayer
    ]
  )

  const removeBuildUnitsFromQueue = useCallback(
    async (index: number, unitType: UnitTypes) => {
      const queues = {
        TROOP: buildTroopsQueue,
        SPACESHIP: buildSpaceshipsQueue,
        DEFENSE: buildDefensesQueue
      }

      const newPlayerQueue = [
        ...queues[unitType].slice(0, index),
        ...queues[unitType].slice(index + 1)
      ]
      await updateBuildUnitsQueueEndpoint(
        newPlayerQueue,
        selectedPlanet!.coordinates,
        unitType,
        selectedUniverse!.name
      )
      await loadPlayer()
    },
    [
      buildTroopsQueue,
      buildDefensesQueue,
      buildSpaceshipsQueue,
      selectedUniverse,
      selectedPlanet,
      loadPlayer
    ]
  )

  // TODO: create scheduleBuildUnits
  // TODO: create cancelBuildUnits

  // TODO: create reorderBuildUnits Queue

  // TODO: include HERE the BuildUnits QUEUE logic ?

  const value = {
    activeBuildTroopsCountdown,
    activeBuildSpaceshipsCountdown,
    activeBuildDefensesCountdown,

    activeBuildTroops,
    activeBuildSpaceships,
    activeBuildDefenses,

    buildTroopsQueue,
    buildSpaceshipsQueue,
    buildDefensesQueue,

    isBuildUnitsLoading,

    starBuildUnits,
    updateBuildUnitsQueue,
    removeBuildUnitsFromQueue
  }

  return <buildUnitsContext.Provider value={value}>{children}</buildUnitsContext.Provider>
}

export { useBuildUnits, BuildUnitsProvider }
