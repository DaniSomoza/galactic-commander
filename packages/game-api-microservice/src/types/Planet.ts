import { SpecialType } from './Special'
import { BuildUnitsQueueType, BuildUnitsType, UnitType } from './Unit'

export type PlanetCoordinatesType = {
  galaxy: number
  sector: number
  system: number
  planet: number
}

export type PlanetType = {
  name: string

  universeId: string

  ownerId: string | null
  colonizedAt: number

  imgUrl: string

  resources: number
  resourceQuality: number
  lastResourceProductionTime: number

  coordinates: PlanetCoordinatesType

  isSpecial: boolean
  isPrincipal: boolean
  isUnderConquer: boolean
  isExplored: boolean

  specials: SpecialType[]

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

  units: UnitType[]
}
