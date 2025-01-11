import { IPlanet } from './IPlanet'
import { IPlayer } from './IPlayer'
import { IUnit } from './IUnit'

export interface IFleetUnits {
  unit: IUnit
  amount: number
}

export type ExploreFleetType = 'EXPLORE_FLEET_TYPE'

export type FleetTypes = ExploreFleetType

export interface IFleet {
  player: IPlayer
  units: IFleetUnits[]
  isReturning: boolean
  isFinished: boolean
  fromPlanet: IPlanet
  toPlanet: IPlanet
  arriveAt: number
  startAt: number
  duration: number
  fleetType: FleetTypes
  resources: number
  taskId?: string
}
