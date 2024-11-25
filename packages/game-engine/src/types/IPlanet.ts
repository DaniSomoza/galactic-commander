import { IPlayer } from './IPlayer'
import { ISpecial } from './ISpecial'
import { IUniverse } from './IUniverse'

export const GALAXIES = 3
export const SECTORS_PER_GALAXIES = 8
export const SYSTEM_PER_SECTORS = 10
export const PLANETS_PER_SYSTEM = 12

// TODO: implement deep space ?

export type IPlanetCoordinates = {
  galaxy: number
  sector: number
  system: number
  planet: number
}

// TODO: implement moons ??

export interface IPlanet {
  name: string
  universe: IUniverse

  imgUrl: string

  owner: IPlayer | null
  colonizedAt: number

  resources: number
  resourceQuality: number
  lastResourceProductionTime: number

  coordinates: IPlanetCoordinates

  isSpecial: boolean
  isPrincipal: boolean
  isUnderConquer: boolean
  isExplored: boolean

  specials: ISpecial[]

  isBuildingFleets: boolean
  isTrainingTroops: boolean
  isBuildingDefenses: boolean

  // TODO: units in the planet
  // TODO: fleets traveling to the planet
  // TODO: fleets traveling from the planet
  // TODO: fleets landed in the planet
  // TODO: troops landed in the planet
  // TODO: defenses landed in the planet
}
