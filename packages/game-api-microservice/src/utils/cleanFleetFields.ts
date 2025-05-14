import { IFleetDocument } from 'game-engine/models/FleetModel'
import { IPlayerDocument } from 'game-engine/models/PlayerModel'

import { FleetType } from '../types/Fleets'
import cleanUnitFields from './cleanUnitFields'
import cleanPlanetFields from './cleanPlanetFields'

function cleanFleetFields(fleet: IFleetDocument, player: IPlayerDocument): FleetType {
  const {
    units,
    isReturning,
    isFinished,
    fromPlanet,
    toPlanet,
    arriveAt,
    startedAt,
    duration,
    fleetType,
    resources,
    taskId
  } = fleet

  return {
    playerId: fleet.playerId,

    units: units.map((fleetUnits) => ({
      amount: fleetUnits.amount,
      unit: cleanUnitFields(fleetUnits.unit)
    })),

    isReturning,
    isFinished,

    fromPlanet: cleanPlanetFields(fromPlanet, player),
    toPlanet: cleanPlanetFields(toPlanet, player),

    arriveAt,
    startedAt,
    duration,
    fleetType,
    resources,
    taskId
  }
}

export default cleanFleetFields
