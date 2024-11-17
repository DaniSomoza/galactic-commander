import { createContext, useContext, useCallback, useState } from 'react'

import computedBonus from 'game-engine/src/engine/bonus/computedBonus'
import calculateResourceProduction from 'game-engine/src/engine/resources/calculateResourceProduction'
import getSecond from 'game-engine/src/helpers/getSecond'

import { usePlayer } from './PlayerContext'
import usePolling from '../hooks/usePolling'
import formatCoordinatesLabel, { CoordinatesLabelType } from '../utils/formatPlanetCoordinates'

const initialContext = {
  resources: {}
}

type playerResourcesContextValue = {
  resources: Record<CoordinatesLabelType, number>
}

const playerResourcesContext = createContext<playerResourcesContextValue>(initialContext)

function usePlayerResources() {
  const context = useContext(playerResourcesContext)

  if (!context) {
    throw new Error('usePlayerResources should be within playerResourcesContext Provider')
  }

  return context
}

type PlayerResourcesProviderProps = {
  children: JSX.Element | JSX.Element[]
}

function PlayerResourcesProvider({ children }: PlayerResourcesProviderProps) {
  const { player } = usePlayer()

  const [resources, setResources] = useState({})

  const updatePlanetResources = useCallback(() => {
    const resources: playerResourcesContextValue['resources'] = {}

    if (player) {
      const actualSecond = getSecond(Date.now())

      player.planets.colonies.forEach((planet) => {
        const planetLabel = formatCoordinatesLabel(planet.coordinates)

        const { resources: planetResources, lastResourceProductionTime, resourceQuality } = planet

        const productionBonus = computedBonus(player.perks, 'RESOURCE_PRODUCTION_BONUS')

        const predictedResources = calculateResourceProduction(
          actualSecond,
          planetResources,
          lastResourceProductionTime,
          resourceQuality,
          productionBonus
        )

        resources[planetLabel] = Math.floor(predictedResources)
      })

      setResources(resources)
    }
  }, [player])

  usePolling(updatePlanetResources)

  const value = {
    resources
  }

  return <playerResourcesContext.Provider value={value}>{children}</playerResourcesContext.Provider>
}

export { usePlayerResources, PlayerResourcesProvider }
