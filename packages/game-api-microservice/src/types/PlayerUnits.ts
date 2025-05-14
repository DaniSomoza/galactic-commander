import { PlanetType } from './Planet'
import { PlayerType } from './Player'
import { UnitType } from './Unit'

export interface PlanetUnitsType {
  unit: UnitType
  amount: number
}

export type PlayerUnitsType = {
  player: PlayerType
  units: PlanetUnitsType[]
  planet: PlanetType
}
