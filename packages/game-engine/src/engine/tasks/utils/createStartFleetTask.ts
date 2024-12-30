import { FleetTypes, IFleetUnits } from 'packages/game-engine/src/types/IFleet'

import {
  ITask,
  PENDING_TASK_STATUS,
  START_FLEET_TASK_TYPE,
  StartFleetTaskType
} from '../../../types/ITask'
import getSecond from '../../../helpers/getSecond'

type FleetDataType = {
  playerId: string
  fromPlanetId: string
  toPlanetId: string
  units: IFleetUnits[]
  resources: number
  fleetType: FleetTypes
  allUnitsInThePlanet?: boolean
  allResourcesInThePlanet?: boolean
}

// TODO: add create BASE task
function createStartFleetTask(
  universeId: string,
  fleetData: FleetDataType,
  executeTaskAt?: number
): ITask<StartFleetTaskType> {
  const {
    playerId,
    fromPlanetId,
    toPlanetId,
    units,
    resources,
    fleetType,
    allUnitsInThePlanet,
    allResourcesInThePlanet
  } = fleetData

  const startResearchTask: ITask<StartFleetTaskType> = {
    type: START_FLEET_TASK_TYPE,

    universeId,

    data: {
      playerId,
      fromPlanetId,
      toPlanetId,
      units,
      resources,
      fleetType,
      allUnitsInThePlanet,
      allResourcesInThePlanet
    },

    status: PENDING_TASK_STATUS,
    isCancellable: false,

    executeTaskAt: executeTaskAt ? getSecond(executeTaskAt) : null,
    processedAt: null,
    processingDuration: null,

    history: [
      {
        taskStatus: PENDING_TASK_STATUS,
        updatedAt: new Date().getTime()
      }
    ],

    errorDetails: null
  }

  return startResearchTask
}

export default createStartFleetTask
