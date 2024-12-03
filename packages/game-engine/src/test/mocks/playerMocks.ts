import pirates from '../../assets/races/pirates'
import { IPlayer } from '../../types/IPlayer'
import { PRINCIPAL_PLANET_TEST_1 } from './planetMocks'
import universe from './universeMocks'

export const PLAYER_TEST_1_PIRATE: IPlayer = {
  user: {
    username: 'username_test_1',
    email: 'username_1@test.com'
  },
  perks: [],

  race: pirates,

  planets: {
    principal: PRINCIPAL_PLANET_TEST_1,
    colonies: [PRINCIPAL_PLANET_TEST_1]
  },

  universe,

  researches: {
    researched: [],
    queue: []
  },

  fleets: []
}

const ALL_PLAYERS_MOCK = [PLAYER_TEST_1_PIRATE]

export default ALL_PLAYERS_MOCK
