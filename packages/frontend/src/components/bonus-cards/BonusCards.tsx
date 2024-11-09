import { Tooltip } from '@mui/material'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'

import { IBonus } from 'game-engine/dist/types/bonus'

type BonusCardProps = {
  bonus?: IBonus
  isFleetEnergyResearch?: boolean
  isTroopsPopulationResearch?: boolean
  isLoading?: boolean
}

function BonusCards({
  bonus,
  isFleetEnergyResearch,
  isTroopsPopulationResearch,
  isLoading
}: BonusCardProps) {
  if (isLoading) {
    return <Skeleton variant="rectangular" height={'40px'} width={'40px'} />
  }

  return (
    <>
      {bonus &&
        Object.keys(bonus).map((bono) => (
          <Paper variant="outlined" key={bono}>
            <Tooltip
              // TODO: create tooltip
              title={`${Object.keys(bonus).map((bono) => `${bono}: ${bonus[bono as keyof IBonus]}%`)}`}
              arrow
            >
              <Skeleton variant="rectangular" height={'40px'} width={'40px'} />
            </Tooltip>
          </Paper>
        ))}

      {isFleetEnergyResearch && (
        <Paper variant="outlined">
          <Tooltip title={'TODO: +50% energy'} arrow>
            <Skeleton variant="rectangular" height={'40px'} width={'40px'} />
          </Tooltip>
        </Paper>
      )}

      {isTroopsPopulationResearch && (
        <Paper variant="outlined">
          <Tooltip title={'TODO: +50% population'} arrow>
            <Skeleton variant="rectangular" height={'40px'} width={'40px'} />
          </Tooltip>
        </Paper>
      )}
    </>
  )
}

export default BonusCards
