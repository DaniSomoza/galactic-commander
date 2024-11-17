import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'

import { IBonus } from 'game-engine/dist/types/bonus'
import { PlayerPerkType } from 'game-api-microservice/src/types/Player'
import computedBonus, {
  bonusTypes,
  percentageBonusType
} from 'game-engine/src/engine/bonus/computedBonus'

import Bonus from '../bonus/Bonus'

type PlayerPerksSectionProps = {
  playerPerks?: PlayerPerkType[]
  isLoading?: boolean
}

function PlayerPerksSection({ playerPerks, isLoading }: PlayerPerksSectionProps) {
  const playerBonus = Object.keys(bonusTypes).reduce((playerBonus: IBonus, bonusName) => {
    ;(playerBonus[bonusName as keyof IBonus] as number) = computedBonus(
      playerPerks || [],
      bonusName as keyof typeof percentageBonusType
    )

    const isPercentageBonus = !!percentageBonusType[bonusName as keyof typeof percentageBonusType]

    // adjust % label for player perks
    if (isPercentageBonus) {
      ;(playerBonus[bonusName as keyof IBonus] as number) -= 100
    }

    return playerBonus
  }, {})

  return (
    <Paper variant="outlined">
      <Stack
        flexWrap={'wrap'}
        direction={'row'}
        gap={1}
        paddingTop={1}
        paddingBottom={1}
        justifyContent={'center'}
      >
        {Object.keys(bonusTypes).map((bono) => (
          <Bonus
            key={bono}
            size="large"
            bono={bono}
            bonusValue={playerBonus[bono as keyof IBonus] as number}
            isLoading={isLoading || !playerPerks}
            sources={playerPerks?.filter((playerPerk) => playerPerk.bonus[bono as keyof IBonus])}
          />
        ))}

        <Paper variant="outlined">
          <Box>
            <Skeleton variant="rounded" height={'68px'} width={'68px'} />
          </Box>
        </Paper>

        {/* <Paper variant="outlined">
          <Box>
            <Skeleton variant="rounded" height={'68'} width={'68'} />
          </Box>
        </Paper>

        <Paper variant="outlined">
          <Box>
            <Skeleton variant="rounded" height={'68'} width={'68'} />
          </Box>
        </Paper> */}

        {/* <Paper variant="outlined">
          <Box>
            <Skeleton variant="rounded" height={"68"} width={"68"} />
          </Box>
        </Paper> */}
      </Stack>
    </Paper>
  )
}

export default PlayerPerksSection
