import { Route } from '../configuration/Server'
import researchController from '../controllers/researchController'

export const RESEARCH_PATH = '/research'

const startResearchRoute: Route = {
  url: RESEARCH_PATH,
  method: 'POST',
  handler: researchController.startResearch
}

// TODO: implement cancel research task

// TODO: implement update research task / reschedule task?

// TODO: implement a queue system

// could be a prop in the player

// resarch = {
//   research
//   ...
//   queue: ["researchName1", "researchName1", "researchName2", "researchName3", ...]
// }

const researchRoutes = [startResearchRoute]

export default researchRoutes
