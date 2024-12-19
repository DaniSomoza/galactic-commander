import { PlanetType } from './Planet'
import { UnitType } from './Unit'

interface FleetUnitsType {
  unit: UnitType
  amount: number
}

interface TravelFleetType {
  destination: PlanetType
  arriveAt: number
  fleetType: string // TODO: create a fleetType
  isReturning: boolean
  resources: number
}

export interface FleetType {
  units: FleetUnitsType[]

  playerId: string

  planet: PlanetType

  travel?: TravelFleetType
}
