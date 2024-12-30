import { createContext, useCallback, useContext, useMemo } from 'react'

import { FleetType, FleetUnitsType } from 'game-api-microservice/src/types/Fleets'
import { PlanetCoordinatesType } from 'game-api-microservice/src/types/Planet'
import isPlanetCoordinates from 'game-engine/src/engine/planets/isPlanetCoordinates'

import * as fleetsEndpoints from '../endpoints/game/fleetsEndpoints'
import { usePlayer } from './PlayerContext'
import { useGameInfo } from './GameInfoContext'
import waitTaskToStart from '../utils/waitTaskToStart'

const initialContext = {
  fleets: [],
  unitsInThePlanet: [],
  fleetsInThePlanet: [],
  explorePlanetFleet: () => {}
}

type fleetContextValue = {
  fleets: FleetType[]
  unitsInThePlanet: FleetUnitsType[]
  fleetsInThePlanet: FleetType[]
  explorePlanetFleet: (
    fleetUnits: {
      unitName: string
      amount: number
    }[],
    fromPlanetCoordinates: PlanetCoordinatesType,
    toPlanetCoordinates: PlanetCoordinatesType
  ) => void
}

const fleetContext = createContext<fleetContextValue>(initialContext)

function useFleet() {
  const context = useContext(fleetContext)

  if (!context) {
    throw new Error('useFleet should be within GameInfoContext Provider')
  }

  return context
}

type FleetProviderProps = {
  children: JSX.Element | JSX.Element[]
}

function FleetProvider({ children }: FleetProviderProps) {
  const { selectedUniverse } = useGameInfo()
  const { player, selectedPlanet, loadPlayer } = usePlayer()

  const fleets = useMemo(() => player?.fleets || [], [player])

  const fleetsInThePlanet = useMemo(
    () =>
      !!selectedPlanet && !!player
        ? player.fleets.filter(
            (playerFleet) =>
              isPlanetCoordinates(playerFleet.planet, selectedPlanet?.coordinates) &&
              !!playerFleet.travel
          )
        : [],
    [player, selectedPlanet]
  )

  const unitsInThePlanet = useMemo(() => {
    if (!selectedPlanet || !player) {
      return []
    }

    const planetFleet = player.fleets.find(
      (fleet) => isPlanetCoordinates(fleet.planet, selectedPlanet.coordinates) && !fleet.travel
    )

    if (!planetFleet) {
      return []
    }

    return planetFleet.units
  }, [player, selectedPlanet])

  const universeName = selectedUniverse?.name || ''

  const explorePlanetFleet = useCallback(
    async (
      fleetUnits: {
        unitName: string
        amount: number
      }[],
      fromPlanetCoordinates: PlanetCoordinatesType,
      toPlanetCoordinates: PlanetCoordinatesType
    ) => {
      const response = await fleetsEndpoints.explorePlanetFleet(
        fleetUnits,
        fromPlanetCoordinates,
        toPlanetCoordinates,
        universeName
        // executeTaskAt
      )

      const { task } = response.data
      await waitTaskToStart(task.taskId)
      await loadPlayer()
    },
    [universeName, loadPlayer]
  )

  const value = {
    fleets,
    unitsInThePlanet,
    fleetsInThePlanet,

    explorePlanetFleet
  }

  return <fleetContext.Provider value={value}>{children}</fleetContext.Provider>
}

export { useFleet, FleetProvider }
