import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded'

import computedBonus from 'game-engine/src/engine/bonus/computedBonus'

import { usePlayer } from '../../store/PlayerContext'
import { useTranslations } from '../../store/TranslationContext'
import { useFleet } from '../../store/FleetContext'

function FleetsLabel() {
  const { translate } = useTranslations()
  const { player } = usePlayer()
  const { fleets } = useFleet()

  // TODO: move this to useFleet
  const maxFleets = player ? computedBonus(player.perks, 'MAX_FLEETS_ALLOWED_BONUS') + 1 : 1
  const fleetsLabel = `${fleets.length} / ${maxFleets}`

  return (
    <Paper variant="outlined">
      <Tooltip
        title={translate('GAME_PLAYER_STATS_FLEETS_TOOLTIP', fleets.length, maxFleets)}
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
