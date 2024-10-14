import { Route } from '../configuration/Server'
import gameInfoController from '../controllers/gameInfoController'
import { GAME_INFO_PATH } from './constants'

const getGameInfoRoute: Route = {
  url: GAME_INFO_PATH,
  method: 'GET',
  handler: gameInfoController.getGameInfo
}

const gameInfoRoutes = [getGameInfoRoute]

export default gameInfoRoutes
