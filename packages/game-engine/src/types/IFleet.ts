import { IPlanet } from './IPlanet'
import { IUnit } from './IUnit'

interface IFleetUnits {
  unit: IUnit
  amount: number
}

interface ITravelFleet {
  destination: IPlanet
  arriveAt: number
  fleetType: string // TODO: create a fleetType
  isReturning: boolean
  resources: number
}

export interface IFleet {
  playerId: string

  planet: IPlanet

  units: IFleetUnits[]

  travel?: ITravelFleet
}
