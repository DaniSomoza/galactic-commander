import { Route } from '../configuration/Server'
import researchController from '../controllers/researchController'

export const RESEARCH_PATH = '/research'
export const RESEARCH_QUEUE_PATH = `${RESEARCH_PATH}/queue`

const startResearchRoute: Route = {
  url: RESEARCH_PATH,
  method: 'POST',
  handler: researchController.startResearch
}

const addResearchToQueueRoute: Route = {
  url: RESEARCH_QUEUE_PATH,
  method: 'POST',
  handler: researchController.addResearchToQueue
}

// TODO: implement cancel research task

// TODO: implement update research task / reschedule existing research task?

const researchRoutes = [startResearchRoute, addResearchToQueueRoute]

export default researchRoutes
