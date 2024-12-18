import { IFleetDocument } from 'game-engine/models/FleetModel'

import { FleetType } from '../types/Fleets'
import cleanUnitFields from './cleanUnitFields'
import cleanPlanetFields from './cleanPlanetFields'

function cleanFleetFields(fleet: IFleetDocument): FleetType {
  const { units, playerId, planet, travel } = fleet

  return {
    units: units.map((fleetUnits) => ({
      amount: fleetUnits.amount,
      unit: cleanUnitFields(fleetUnits.unit)
    })),
    playerId: playerId.toString(),
    planet: cleanPlanetFields(planet),
    travel: travel
      ? {
          destination: cleanPlanetFields(travel.destination),
          arriveAt: travel.arriveAt,
          fleetType: travel.fleetType,
          isReturning: travel.isReturning,
          resources: travel.resources
        }
      : undefined
  }
}

export default cleanFleetFields
