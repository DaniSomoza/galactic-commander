import { IPoint } from '../../types/IPoint'
import { FinishResearchTaskType } from '../../types/ITask'
import GameEngineError from '../errors/GameEngineError'
import PointModel from '../../models/PointModel'
import { ITaskTypeDocument } from '../../models/TaskModel'
import taskRepository from '../../repositories/taskRepository'
import playerRepository from '../../repositories/playerRepository'
import upgradeBonus from '../bonus/upgradeBonus'
import createStartResearchTask from './utils/createStartResearchTask'
import hasBonus from '../../helpers/hasBonus'

async function processFinishResearchTask(
  task: ITaskTypeDocument<FinishResearchTaskType>,
  second: number
) {
  // get all the required data from DB
  const player = await playerRepository.findPlayerById(task.data.playerId)

  if (!player) {
    throw new GameEngineError('invalid player')
  }

  const research = player.race.researches.find(
    (research) => research._id.toString() === task.data.researchId
  )

  if (!research) {
    throw new GameEngineError('invalid research')
  }

  const playerResearch = player.researches.researched.find(
    (playerResearch) => playerResearch.research.name === research.name
  )

  const isFirstLevel = !playerResearch

  const newLevel = isFirstLevel ? 1 : playerResearch.level + 1

  // upgrade player researches
  if (isFirstLevel) {
    player.researches.researched.push({
      research,
      level: 1
    })
  } else {
    playerResearch.level = newLevel
  }

  // upgrade player bonus if present in the research
  const hasBonusToUpdate = hasBonus(research.bonus)

  if (hasBonusToUpdate) {
    const PlayerBonus = player.perks.find((perk) => perk.sourceId === task.data.researchId)

    if (PlayerBonus) {
      PlayerBonus.bonus = upgradeBonus(research.bonus, newLevel)
    } else {
      player.perks.push({
        bonus: research.bonus,
        sourceId: task.data.researchId,
        sourceName: research.name,
        type: 'Research'
      })
    }
  }

  // TODO: intergalacticTravel check?
  const point: IPoint = {
    playerId: player._id.toString(),
    taskId: task._id.toString(),
    points: task.data.researchResourceCost,
    sourceId: task.data.researchId,
    sourceName: research.name,
    type: 'Research',
    second
  }

  const points = new PointModel(point)

  player.researches.activeResearch = undefined

  // check player research queue
  const nextResearchName = player.researches.queue.shift()
  const nextResearch = player.race.researches.find((research) => research.name === nextResearchName)

  if (nextResearch) {
    const startResearchTask = createStartResearchTask(
      task.universeId,
      player._id.toString(),
      nextResearch._id.toString()
    )

    return Promise.all([
      player.save(),
      points.save(),
      taskRepository.createStartResearchTask(startResearchTask)
    ])
  }

  return Promise.all([player.save(), points.save()])
}

export default processFinishResearchTask
