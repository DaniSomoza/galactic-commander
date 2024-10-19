import { Tooltip } from '@mui/material'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'

import { PlayerType } from 'game-api-microservice/src/types/Player'
import { BonusType } from 'game-api-microservice/src/types/Research'

type BonusCardProps = {
  bonus: PlayerType['bonus'][0]
}

// TODO: Create 2 types of components:
// TODO: Computed Player Bonus => compute and reduce all bonus from different sources into one bonus component
// TODO: PlayerBonusCard => show all player bonus and their sources

// TODO: rename this to PlayerBonusCard
function BonusCard({ bonus }: BonusCardProps) {
  // transform bonus into a label

  // TODO: BOOLEAN BONUS! (isFleetEnergyResearch && isTroopsPopulationResearch)
  return (
    <Tooltip
      title={`${Object.keys(bonus.bonus).map((bono) => `${bono}: ${bonus.bonus[bono as keyof BonusType]}%`)}`}
      arrow
    >
      <Paper variant="outlined">
        <Skeleton variant="rectangular" height={'40px'} width={'40px'} />
      </Paper>
    </Tooltip>
  )
}

export default BonusCard
