import { Document } from 'mongoose'
import { IPlayerResearch } from '../../models/PlayerModel'
import { IBonus, IResearchDocument } from '../../models/ResearchModel'
import { ITaskTypeDocument, FinishResearchTaskType } from '../../models/TaskModel'
import playerRepository from '../../repositories/playerRepository'
import GameEngineError from '../errors/GameEngineError'
import addPoints from '../points/addPoints'

async function processFinishResearchTask(
  task: ITaskTypeDocument<FinishResearchTaskType>,
  second: number
) {
  // get all the required data from DB
  const player = await playerRepository.findPlayerById(task.data.player)

  if (!player) {
    throw new GameEngineError('invalid player')
  }

  const raceResearches = player.race.researches as IResearchDocument[]
  const research = raceResearches.find((research) => research._id.equals(task.data.research))

  if (!research) {
    throw new GameEngineError('invalid research')
  }

  const playerResearches = player.researches as IPlayerResearch[]
  const playerResearch = playerResearches.find(
    (playerResearch) => playerResearch.research.name === research.name
  )

  if (playerResearch!.level === 0) {
    player.bonus.push({
      bonus: playerResearch!.research.bonus,
      origin: task.data.research,
      type: 'Research'
    })
  } else {
    const PlayerBonus = player.bonus.find((bonus) => bonus.origin.equals(task.data.research))
    PlayerBonus!.bonus = upgradeResearchBonus(research.bonus, playerResearch!.level)
  }

  playerResearch!.level = playerResearch!.level + 1

  player.activeResearch = undefined

  const points = task.data.researchResourceCost
  player.points = addPoints(player.points, points, task.data.research, 'Research', second)

  return Promise.all([player.save()])
}

export default processFinishResearchTask

function upgradeResearchBonus(bonus: IBonus, level: number): IBonus {
  const updatedBonus: Partial<IBonus> = {}
  const newLevel = level + 1

  Object.keys((bonus as Document).toObject<IBonus>())
    .filter((key) => key !== '_id')
    .forEach((key) => {
      const value = bonus[key as keyof IBonus]

      if (typeof value === 'number') {
        ;(updatedBonus[key as keyof IBonus] as number) = value * newLevel
      }
    })

  return updatedBonus
}
