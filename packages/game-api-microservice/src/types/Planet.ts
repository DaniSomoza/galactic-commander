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

  resources: number
  resourceQuality: number
  lastResourceProductionTime: number

  universe: string

  coordinates: PlanetCoordinatesType

  isSpecial: boolean
  isPrincipal: boolean
  isUnderConquer: boolean
  isExplored: boolean

  specials: string[]

  isBuildingFleets: boolean
  isTrainingTroops: boolean
  isBuildingDefenses: boolean
}
