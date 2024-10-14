import { Route } from '../configuration/Server'
import playerController from '../controllers/playerController'
import { PLAYER_PATH } from './constants'

const createPlayerRoute: Route = {
  url: PLAYER_PATH,
  method: 'POST',
  handler: playerController.createPlayer
}

const getPlayerRoute: Route = {
  url: PLAYER_PATH,
  method: 'GET',
  handler: playerController.getPlayer
}

const playerRoutes = [createPlayerRoute, getPlayerRoute]

export default playerRoutes
