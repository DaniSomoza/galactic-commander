import { IPlanet } from './IPlanet'
import { IUnit } from './IUnit'

export interface IFleetUnits {
  unit: IUnit
  amount: number
}

export type ExploreFleetType = 'EXPLORE_FLEET_TYPE'

export type FleetTypes = ExploreFleetType

interface ITravelFleet {
  destination: IPlanet
  arriveAt: number
  fleetType: FleetTypes
  isReturning: boolean
  resources: number
  taskId?: string
}

export interface IFleet {
  playerId: string

  planet: IPlanet

  units: IFleetUnits[]

  travel?: ITravelFleet
}
