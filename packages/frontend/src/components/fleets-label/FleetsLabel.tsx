import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded'

import { usePlayer } from '../../store/PlayerContext'

function FleetsLabel() {
  const { player } = usePlayer()

  // TODO: Add current fleets
  const currentFleets = 0
  const tooltipLabel = `Current fleets ${currentFleets}`
  const fleetsLabel = `${currentFleets} / 2`

  return (
    <Paper>
      <Tooltip title={tooltipLabel} arrow>
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
