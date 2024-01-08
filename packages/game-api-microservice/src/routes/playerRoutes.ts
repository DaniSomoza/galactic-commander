import { Route } from '../configuration/Server'
import playerController from '../controllers/playerController'

export const PLAYER_PATH = '/player'

const createPlayerRoute: Route = {
  url: PLAYER_PATH,
  method: 'POST',
  handler: playerController.createPlayer
}

// const getPlayerRoute: Route = {
//   url: PLAYER_PATH,
//   method: 'GET',
//   handler: playerController.getPlayer
// }

const playerRoutes = [createPlayerRoute]

export default playerRoutes
