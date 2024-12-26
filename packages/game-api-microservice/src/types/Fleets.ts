import { PlanetType } from './Planet'
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
