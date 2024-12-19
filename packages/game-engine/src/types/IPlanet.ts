import { ISpecial } from './ISpecial'
import { BuildUnitsQueueType, BuildUnitsType, IUnit } from './IUnit'

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
  universeId: string

  imgUrl: string

  ownerId: string | null
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
      queue: BuildUnitsQueueType[]
    }
    spaceships: {
      activeBuild?: BuildUnitsType
      queue: BuildUnitsQueueType[]
    }
    defenses: {
      activeBuild?: BuildUnitsType
      queue: BuildUnitsQueueType[]
    }
  }

  units: IUnit[]
}
