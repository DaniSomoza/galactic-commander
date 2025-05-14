import { IPlanet } from './IPlanet'
import { IPlayer } from './IPlayer'
import { IUnit } from './IUnit'

export interface IPlanetUnits {
  unit: IUnit
  amount: number
}

export type IPlayerUnits = {
  player: IPlayer
  units: IPlanetUnits[]
  planet: IPlanet
}
