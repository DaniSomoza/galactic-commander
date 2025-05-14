import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded'

import { usePlayer } from '../../store/PlayerContext'
import { useTranslations } from '../../store/TranslationContext'
import { useFleet } from '../../store/FleetContext'

function FleetsLabel() {
  const { translate } = useTranslations()
  const { player } = usePlayer()
  const { maxPlayerFleets, currentPlayerFleets } = useFleet()

  const fleetsLabel = `${currentPlayerFleets} / ${maxPlayerFleets}`

  const color = currentPlayerFleets < maxPlayerFleets ? 'inherit' : 'error'

  return (
    <Paper variant="outlined">
      <Tooltip
        title={translate('GAME_PLAYER_STATS_FLEETS_TOOLTIP', currentPlayerFleets, maxPlayerFleets)}
        arrow
      >
        <Stack direction={'row'} padding={0.5} alignItems={'center'}>
          <FlightTakeoffRoundedIcon fontSize="small" color={color} />

          <Typography
            variant="body1"
            fontSize={12}
            padding={0.4}
            overflow={'hidden'}
            textOverflow="ellipsis"
            textAlign="center"
            color={color}
          >
            {player ? fleetsLabel : <Skeleton variant="text" width={32} />}
          </Typography>
        </Stack>
      </Tooltip>
    </Paper>
  )
}

export default FleetsLabel
