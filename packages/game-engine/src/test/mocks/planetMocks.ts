import pirates from '../../assets/races/pirates'
import { IPlanet } from '../../models/PlanetModel'

type IBasePlanet = Omit<IPlanet, 'universe'>

export const PRINCIPAL_PLANET_TEST_1: IBasePlanet = {
  name: 'principal_planet_test_1',
  imgUrl: '/planets/planet_80_1.jpg',

  owner: null,
  colonizedAt: 0,

  resources: pirates.baseResources,
  resourceQuality: 100,
  lastResourceProductionTime: 0,

  coordinates: {
    galaxy: 1,
    sector: 1,
    system: 1,
    planet: 1
  },

  isSpecial: false,
  isPrincipal: true,
  isUnderConquer: false,
  isExplored: true,

  specials: [],

  isBuildingFleets: false,
  isTrainingTroops: false,
  isBuildingDefenses: false
}

export const AVAILABLE_PLANET_TEST_1: IBasePlanet = {
  name: 'available_planet_test_1',
  imgUrl: '/planets/planet_80_1.jpg',

  owner: null,
  colonizedAt: 0,

  resources: 0,
  resourceQuality: 100,
  lastResourceProductionTime: 0,

  coordinates: {
    galaxy: 1,
    sector: 1,
    system: 1,
    planet: 2
  },

  isSpecial: false,
  isPrincipal: false,
  isUnderConquer: false,
  isExplored: false,

  specials: [],

  isBuildingFleets: false,
  isTrainingTroops: false,
  isBuildingDefenses: false
}

const ALL_PLANETS_MOCK = [PRINCIPAL_PLANET_TEST_1, AVAILABLE_PLANET_TEST_1]

export default ALL_PLANETS_MOCK
