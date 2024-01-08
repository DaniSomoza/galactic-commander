import pirates from '../../assets/races/pirates'
import { IPlayer } from '../../models/PlayerModel'
import { PRINCIPAL_PLANET_TEST_1 } from './planetMocks'
import UNIVERSE_TEST_MOCK from './universeMocks'

export const PLAYER_TEST_1_PIRATE: IPlayer = {
  username: 'username_test_1',
  email: 'username_1@test.com',
  universe: UNIVERSE_TEST_MOCK,

  race: pirates,

  principalPlanet: PRINCIPAL_PLANET_TEST_1,

  planets: [PRINCIPAL_PLANET_TEST_1],

  planetsExplored: [PRINCIPAL_PLANET_TEST_1],

  bonus: [],
  points: [],
  researches: [],

  fleetEnergy: pirates.baseFleetEnergy,
  troopsPopulation: pirates.baseTroopsPopulation
}

const ALL_PLAYERS_MOCK = [PLAYER_TEST_1_PIRATE]

export default ALL_PLAYERS_MOCK
