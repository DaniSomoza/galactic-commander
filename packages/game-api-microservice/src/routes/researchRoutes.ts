import { Route } from '../configuration/Server'
import researchController from '../controllers/researchController'

export const RESEARCH_PATH = '/research'

const startResearchRoute: Route = {
  url: RESEARCH_PATH,
  method: 'POST',
  handler: researchController.startResearch
}

// TODO: implement cancel research task

// TODO: implement update research task

const researchRoutes = [startResearchRoute]

export default researchRoutes
