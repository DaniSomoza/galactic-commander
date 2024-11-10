import Tooltip from '@mui/material/Tooltip'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'

import { IBonus } from 'game-engine/dist/types/bonus'
import { PlayerPerkType } from 'game-api-microservice/src/types/Player'
import computedBonus, {
  bonusTypes,
  percentageBonusType
} from 'game-engine/src/engine/bonus/computedBonus'

import { useTranslations } from '../../store/TranslationContext'

type PlayerPerksSectionProps = {
  playerPerks?: PlayerPerkType[]
  isLoading?: boolean
}

function PlayerPerksSection({ playerPerks, isLoading }: PlayerPerksSectionProps) {
  const { translate } = useTranslations()

  if (isLoading || !playerPerks) {
    return (
      <Paper variant="outlined">
        <Stack flexWrap={'wrap'} direction={'row'} gap={1} padding={1} justifyContent={'center'}>
          {Object.keys(bonusTypes).map((bono) => (
            <Skeleton key={bono} variant="rectangular" height={'40px'} width={'40px'} />
          ))}

          <Skeleton variant="rectangular" height={'40px'} width={'40px'} />
        </Stack>
      </Paper>
    )
  }

  // TODO: create an util for this
  // TODO: create different components for percentageBonusType, activatableBonusType & numericBonusType
  const playerBonus = Object.keys(bonusTypes).reduce((payerBonus: IBonus, bonusName) => {
    ;(payerBonus[bonusName as keyof IBonus] as number) = computedBonus(
      playerPerks,
      bonusName as keyof typeof percentageBonusType
    )

    return payerBonus
  }, {})

  console.log('playerBonus: ', playerBonus)
  console.log(
    '>>> SOURCE OF TROOPS_ATTACK_BONUS: ',
    playerPerks.filter((playerPerk) => !!playerPerk.bonus['TROOPS_ATTACK_BONUS'])
  )

  // TODO: ADD sourceName instead of source

  // IMPORTANT
  // TODO: create different components for percentageBonusType, activatableBonusType & numericBonusType
  // SHOW Active component (green) if:
  // percentageBonusType is > 100%
  // activatableBonusType is true
  // numericBonusType is > 0

  return (
    <Paper variant="outlined">
      <Stack flexWrap={'wrap'} direction={'row'} gap={1} padding={1} justifyContent={'center'}>
        {Object.keys(playerBonus).map((bono) => (
          <Tooltip
            key={bono}
            title={translate(bono, String(playerBonus[bono as keyof IBonus]))}
            arrow
          >
            <Skeleton
              // TODO: DELETE THIS STYLE
              sx={{ backgroundColor: playerBonus[bono as keyof IBonus] > 100 ? 'green' : '' }}
              variant="rectangular"
              height={'40px'}
              width={'40px'}
            />
          </Tooltip>
        ))}

        <Skeleton variant="rectangular" height={'40px'} width={'40px'} />
      </Stack>
    </Paper>
  )
}

export default PlayerPerksSection
