import { IPlayer } from '../../models/PlayerModel'

type IBasePlayer = Omit<Omit<Omit<IPlayer, 'universe'>, 'race'>, 'planets'>

export const PLAYER_TEST_1_PIRATE: IBasePlayer = {
  user: {
    username: 'username_test_1',
    email: 'username_1@test.com'
  },
  bonus: [],
  points: [],
  researches: {
    researched: [],
    queue: []
  },
  units: {
    troops: {
      population: 0
    },
    fleets: {
      energy: 0
    },
    defenses: {
      structures: 0
    }
  }
}

const ALL_PLAYERS_MOCK = [PLAYER_TEST_1_PIRATE]

export default ALL_PLAYERS_MOCK
