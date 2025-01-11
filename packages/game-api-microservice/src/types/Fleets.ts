import { PlanetCoordinatesType, PlanetType } from './Planet'
import { PlayerType } from './Player'
import { StartFleetTaskType, TaskType } from './Task'
import { UnitType } from './Unit'

export interface FleetUnitsType {
  unit: UnitType
  amount: number
}

export type ExploreFleetType = 'EXPLORE_FLEET_TYPE'

export type FleetTypes = ExploreFleetType

export interface FleetType {
  player: PlayerType

  units: FleetUnitsType[]

  isReturning: boolean
  isFinished: boolean

  fromPlanet: PlanetType
  toPlanet: PlanetType

  arriveAt: number
  startAt: number
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
