import { Route } from '../configuration/Server'
import researchController from '../controllers/researchController'
import { RESEARCH_PATH, RESEARCH_QUEUE_PATH } from './constants'

const startResearchRoute: Route = {
  url: RESEARCH_PATH,
  method: 'POST',
  handler: researchController.startResearch
}

const updateResearchQueue: Route = {
  url: RESEARCH_QUEUE_PATH,
  method: 'POST',
  handler: researchController.updateResearchQueue
}

// TODO: implement cancel research task
// TODO: implement update/re-schedule research task

const researchRoutes = [startResearchRoute, updateResearchQueue]

export default researchRoutes
