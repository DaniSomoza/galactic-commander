import { SpecialType } from './Special'
import { BuildUnitsType, UnitType } from './Unit'

export type PlanetCoordinatesType = {
  galaxy: number
  sector: number
  system: number
  planet: number
}

export type PlanetType = {
  name: string
  owner: string | null
  colonizedAt: number

  imgUrl: string

  resources: number
  resourceQuality: number
  lastResourceProductionTime: number

  universe: string

  coordinates: PlanetCoordinatesType

  isSpecial: boolean
  isPrincipal: boolean
  isUnderConquer: boolean
  isExplored: boolean

  specials: SpecialType[]

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

  units: UnitType[]
}
