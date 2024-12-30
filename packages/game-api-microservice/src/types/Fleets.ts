import { PlanetCoordinatesType, PlanetType } from './Planet'
import { StartFleetTaskType, TaskType } from './Task'
import { UnitType } from './Unit'

export interface FleetUnitsType {
  unit: UnitType
  amount: number
}

export type ExploreFleetType = 'EXPLORE_FLEET_TYPE'

export type FleetTypes = ExploreFleetType

export interface TravelFleetType {
  destination: PlanetType
  arriveAt: number
  fleetType: FleetTypes
  isReturning: boolean
  resources: number
}

export interface FleetType {
  playerId: string

  planet: PlanetType

  units: FleetUnitsType[]

  travel?: TravelFleetType
}

export type ExplorePlanetData = {
  universeName: string
  fromPlanetCoordinates: PlanetCoordinatesType
  toPlanetCoordinates: PlanetCoordinatesType
  fleetUnits: {
    unitName: string
    amount: number
  }[]
  executeTaskAt?: number
}

export type explorePlanetFleetResponseType = { task: TaskType<StartFleetTaskType> }
