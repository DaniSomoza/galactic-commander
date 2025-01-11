import { PlanetCoordinatesType, PlanetType } from './Planet'
import { StartFleetTaskType, TaskType } from './Task'
import { UnitType } from './Unit'

export interface FleetUnitsType {
  unit: UnitType
  amount: number
}

export type ExploreFleetType = 'EXPLORE_FLEET_TYPE'

export type FleetTypes = ExploreFleetType

export interface FleetType {
  playerId: string

  units: FleetUnitsType[]

  isReturning: boolean
  isFinished: boolean

  fromPlanet: PlanetType
  toPlanet: PlanetType

  arriveAt: number
  startedAt: number
  duration: number
  fleetType: FleetTypes
  resources: number
  taskId?: string
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
