import { IPlanetDocument } from 'game-engine/models/PlanetModel'
import { IPlanet } from 'game-engine/types/IPlanet'

import { PlanetType } from '../types/Planet'

function cleanPlanetFields(planet: IPlanetDocument | IPlanet): PlanetType {
  const {
    name,
    imgUrl,
    owner,
    colonizedAt,
    resources,
    resourceQuality,
    lastResourceProductionTime,
    universe,
    coordinates,
    isSpecial,
    isPrincipal,
    isUnderConquer,
    isExplored,
    specials,
    unitBuild,
    units
  } = planet

  return {
    name,
    imgUrl,
    owner: owner?.toString() || null,
    colonizedAt,
    resources,
    resourceQuality,
    lastResourceProductionTime,
    universe: universe.toString(),
    coordinates,
    isSpecial,
    isPrincipal,
    isUnderConquer,
    isExplored,
    specials,
    unitBuild: {
      troops: {
        activeBuild: unitBuild.troops.activeBuild
          ? {
              unitId: unitBuild.troops.activeBuild.unitId.toString(),
              unitType: unitBuild.troops.activeBuild.unitType,
              amount: unitBuild.troops.activeBuild.amount,
              taskId: unitBuild.troops.activeBuild.taskId.toString()
            }
          : undefined,
        queue: unitBuild.troops.queue.map((buildUnit) => ({
          unitId: buildUnit.unitId.toString(),
          unitType: buildUnit.unitType,
          amount: buildUnit.amount,
          taskId: buildUnit.taskId.toString()
        }))
      },
      spaceships: {
        activeBuild: unitBuild.spaceships.activeBuild
          ? {
              unitId: unitBuild.spaceships.activeBuild.unitId.toString(),
              unitType: unitBuild.spaceships.activeBuild.unitType,
              amount: unitBuild.spaceships.activeBuild.amount,
              taskId: unitBuild.spaceships.activeBuild.taskId.toString()
            }
          : undefined,
        queue: unitBuild.spaceships.queue.map((buildUnit) => ({
          unitId: buildUnit.unitId.toString(),
          unitType: buildUnit.unitType,
          amount: buildUnit.amount,
          taskId: buildUnit.taskId.toString()
        }))
      },
      defenses: {
        activeBuild: unitBuild.defenses.activeBuild
          ? {
              unitId: unitBuild.defenses.activeBuild.unitId.toString(),
              unitType: unitBuild.defenses.activeBuild.unitType,
              amount: unitBuild.defenses.activeBuild.amount,
              taskId: unitBuild.defenses.activeBuild.taskId.toString()
            }
          : undefined,
        queue: unitBuild.defenses.queue.map((buildUnit) => ({
          unitId: buildUnit.unitId.toString(),
          unitType: buildUnit.unitType,
          amount: buildUnit.amount,
          taskId: buildUnit.taskId.toString()
        }))
      }
    },
    units
  }
}

export default cleanPlanetFields
