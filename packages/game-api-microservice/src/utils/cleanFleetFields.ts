import { IFleetDocument } from 'game-engine/models/FleetModel'
import { IPlayerDocument } from 'game-engine/models/PlayerModel'

import { FleetType } from '../types/Fleets'
import cleanUnitFields from './cleanUnitFields'
import cleanPlanetFields from './cleanPlanetFields'

function cleanFleetFields(fleet: IFleetDocument, player: IPlayerDocument): FleetType {
  const { units, playerId, planet, travel } = fleet

  return {
    units: units.map((fleetUnits) => ({
      amount: fleetUnits.amount,
      unit: cleanUnitFields(fleetUnits.unit)
    })),
    playerId: playerId.toString(),
    planet: cleanPlanetFields(planet, player),
    travel: travel
      ? {
          destination: cleanPlanetFields(travel.destination, player),
          arriveAt: travel.arriveAt,
          fleetType: travel.fleetType,
          isReturning: travel.isReturning,
          resources: travel.resources,
          taskId: travel.taskId
        }
      : undefined
  }
}

export default cleanFleetFields
