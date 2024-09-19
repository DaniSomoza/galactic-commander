import applyBonus from '../../helpers/applyBonus'
import getSecond from '../../helpers/getSecond'
import { IResearch } from '../../models/ResearchModel'
import getTaskModel, {
  FINISH_RESEARCH_TASK_TYPE,
  FinishResearchTaskType,
  ITask,
  ITaskTypeDocument,
  PENDING_TASK_STATUS,
  StartResearchTaskType
} from '../../models/TaskModel'
import playerRepository from '../../repositories/playerRepository'
import GameEngineError from '../errors/GameEngineError'
import calculateResearchResourceCost from '../resources/calculateResearchResourceCost'

// TODO: only taskData required
async function processStartResearchTask(
  task: ITaskTypeDocument<StartResearchTaskType>,
  second: number
) {
  // get all the required data from DB
  const player = await playerRepository.findPlayerById(task.data.player)

  if (!player) {
    throw new GameEngineError('invalid player')
  }

  if (player.activeResearch) {
    throw new GameEngineError('player already researching')
  }

  const research = player.race.researches.find((research) =>
    research._id.equals(task.data.research)
  )

  if (!research) {
    throw new GameEngineError('invalid research')
  }

  const playerResearch = player.researches.find(
    (playerResearch) => playerResearch.research.name === research.name
  )

  const level = playerResearch?.level || 0

  const researchResourceCost = calculateResearchResourceCost(research, level)

  const hasEnoughResources = player.planets.principal.resources >= researchResourceCost

  if (!hasEnoughResources) {
    throw new GameEngineError('no resources available')
  }

  const researchBonus = applyBonus(player.bonus, 'researchBonus', true)
  const baseResearchDuration = calculateResearchDuration(research, level)

  const researchDuration = baseResearchDuration * (100 / researchBonus)
  const executeTaskAt = getSecond(second + researchDuration)

  const principalPlanet = player.planets.principal

  principalPlanet.resources -= researchResourceCost

  const activeResearch = {
    research: research._id,
    level: level + 1,
    executeTaskAt
  }

  player.activeResearch = activeResearch

  // TODO: implement createBaseTask helper function
  const finishResearchTask: ITask<FinishResearchTaskType> = {
    type: FINISH_RESEARCH_TASK_TYPE,
    universe: player.universe._id,

    data: {
      player: player._id,
      research: task.data.research,
      researchDuration,
      researchResourceCost
    },

    status: PENDING_TASK_STATUS,
    isCancellable: true,

    executeTaskAt,

    processedAt: null,
    processingDuration: null,

    history: [
      {
        taskStatus: PENDING_TASK_STATUS,
        updatedAt: new Date().getTime()
      }
    ],

    errorDetails: null
  }

  const taskModel = getTaskModel<FinishResearchTaskType>()
  const newTask = new taskModel(finishResearchTask)

  return Promise.all([newTask.save(), principalPlanet.save(), player.save()])
}

export default processStartResearchTask

const RESEARCH_FACTOR = 4.5

// TODO: move this to another file ???
function calculateResearchDuration(research: IResearch, level: number): number {
  const isFirstLevel = level === 0

  if (isFirstLevel) {
    return research.initialTime
  }

  const previousLevel = level - 1
  const previousTime = calculateResearchDuration(research, previousLevel)

  return previousTime + (previousTime * RESEARCH_FACTOR) / 2
}
