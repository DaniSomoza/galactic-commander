import { Types } from 'mongoose'

import { ISpecial } from './ISpecial'
import { IUniverse } from './IUniverse'
import { BuildUnitsType, IUnit } from './IUnit'

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

  // TODO: review this!!!
  owner: Types.ObjectId | null
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

  unitBuild: {
    troops: {
      activeBuild?: BuildUnitsType
      queue: BuildUnitsType[]
    }
    spaceships: {
      activeBuild?: BuildUnitsType
      queue: BuildUnitsType[]
    }
    defenses: {
      activeBuild?: BuildUnitsType
      queue: BuildUnitsType[]
    }
  }

  units: IUnit[]
}