import computedBonus from '../bonus/computedBonus'
import getSecond from '../../helpers/getSecond'
import getTaskModel, {
  FINISH_RESEARCH_TASK_TYPE,
  FinishResearchTaskType,
  ITask,
  ITaskTypeDocument,
  PENDING_TASK_STATUS,
  StartResearchTaskType
} from '../../models/TaskModel'
import playerRepository from '../../repositories/playerRepository'
import taskRepository from '../../repositories/taskRepository'
import GameEngineError from '../errors/GameEngineError'
import calculateResearchDuration from '../research/calculateResearchDuration'
import calculateResearchResourceCost from '../resources/calculateResearchResourceCost'
import createStartResearchTask from './utils/createStartResearchTask'

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

  if (player.researches.activeResearch) {
    throw new GameEngineError('player already researching')
  }

  const research = player.race.researches.find((research) =>
    research._id.equals(task.data.research)
  )

  if (!research) {
    throw new GameEngineError('invalid research')
  }

  const playerResearch = player.researches.researched.find(
    (playerResearch) => playerResearch.research.name === research.name
  )

  const level = playerResearch?.level || 0

  const researchResourceCost = calculateResearchResourceCost(research, level)

  const hasEnoughResources = player.planets.principal.resources >= researchResourceCost

  if (!hasEnoughResources) {
    // we try to execute next research present in the player research queue
    const nextResearchName = player.researches.queue.shift()
    const nextResearch = player.race.researches.find(
      (research) => research.name === nextResearchName
    )

    if (nextResearch) {
      const startResearchTask = createStartResearchTask(
        task.universe._id,
        player._id,
        nextResearch._id
      )

      await Promise.all([
        player.save(),
        await taskRepository.createStartResearchTask(startResearchTask)
      ])
    }

    throw new GameEngineError('no resources available')
  }

  const researchBonus = computedBonus(player.perks, 'RESEARCH_BONUS')
  const researchDuration = calculateResearchDuration(research.initialTime, level, researchBonus)

  const executeTaskAt = getSecond(second + researchDuration)

  const principalPlanet = player.planets.principal

  principalPlanet.resources -= researchResourceCost

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

  const activeResearch = {
    research: research._id,
    level: level + 1,
    executeTaskAt,
    taskId: newTask._id
  }

  player.researches.activeResearch = activeResearch

  return Promise.all([newTask.save(), principalPlanet.save(), player.save()])
}

export default processStartResearchTask
