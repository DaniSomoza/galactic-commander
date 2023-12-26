import pirates from '../../assets/races/pirates'
import { IPlayer } from '../../models/PlayerModel'
import { PRINCIPAL_PLANET_TEST_1 } from './planetMocks'

export const PLAYER_TEST_1_PIRATE: IPlayer = {
  username: 'username_test_1',
  email: 'username_1@test.com',

  race: pirates,

  principalPlanet: PRINCIPAL_PLANET_TEST_1,

  planets: [PRINCIPAL_PLANET_TEST_1],

  planetsExplored: [PRINCIPAL_PLANET_TEST_1],

  bonus: [pirates.bonus],

  fleetEnergy: pirates.baseFleetEnergy,
  troopsPopulation: pirates.baseTroopsPopulation,
  resourceProduction: 1
}

const ALL_PLAYERS_MOCK = [PLAYER_TEST_1_PIRATE]

export default ALL_PLAYERS_MOCK
