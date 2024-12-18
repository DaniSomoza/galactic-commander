import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded'

import computedBonus from 'game-engine/src/engine/bonus/computedBonus'

import { usePlayer } from '../../store/PlayerContext'
import { useTranslations } from '../../store/TranslationContext'

function FleetsLabel() {
  const { translate } = useTranslations()
  const { player } = usePlayer()

  // TODO: Add current fleets
  const currentFleets = 0
  const maxFleets = player ? computedBonus(player.perks, 'MAX_FLEETS_ALLOWED_BONUS') : 0
  const fleetsLabel = `${currentFleets} / ${maxFleets}`

  return (
    <Paper variant="outlined">
      <Tooltip
        title={translate('GAME_PLAYER_STATS_FLEETS_TOOLTIP', currentFleets, maxFleets)}
        arrow
      >
        <Stack direction={'row'} padding={0.5} alignItems={'center'}>
          <FlightTakeoffRoundedIcon fontSize="small" />

          <Typography
            variant="body1"
            fontSize={12}
            padding={0.4}
            overflow={'hidden'}
            textOverflow="ellipsis"
            textAlign="center"
          >
            {player ? fleetsLabel : <Skeleton variant="text" width={32} />}
          </Typography>
        </Stack>
      </Tooltip>
    </Paper>
  )
}

export default FleetsLabel
