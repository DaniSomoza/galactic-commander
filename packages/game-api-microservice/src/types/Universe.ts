import { RaceType } from './Race'

export type UniverseType = {
  name: string
  isProcessingInProgress: boolean
  lastProcessedTime: number
}

export type getGameInfoResponseType = { universes: UniverseType[]; races: RaceType[] }
