import { IFleetDocument } from 'game-engine/models/FleetModel'
import { IPlayerDocument } from 'game-engine/models/PlayerModel'

import { FleetType } from '../types/Fleets'
import cleanUnitFields from './cleanUnitFields'
import cleanPlanetFields from './cleanPlanetFields'
import cleanPlayerFields from './cleanPlayerFields'

function cleanFleetFields(fleet: IFleetDocument, player: IPlayerDocument): FleetType {
  const {
    units,
    isReturning,
    isFinished,
    fromPlanet,
    toPlanet,
    arriveAt,
    startAt,
    duration,
    fleetType,
    resources,
    taskId
  } = fleet

  return {
    player: cleanPlayerFields(fleet.player, [], []),

    units: units.map((fleetUnits) => ({
      amount: fleetUnits.amount,
      unit: cleanUnitFields(fleetUnits.unit)
    })),

    isReturning,
    isFinished,

    fromPlanet: cleanPlanetFields(fromPlanet, player),
    toPlanet: cleanPlanetFields(toPlanet, player),

    arriveAt,
    startAt,
    duration,
    fleetType,
    resources,
    taskId
  }
}

export default cleanFleetFields
