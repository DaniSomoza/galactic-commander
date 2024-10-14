import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'

import formatNumber from '../../utils/formatNumber'
import { usePlayer } from '../../store/PlayerContext'

function EnergyLabel() {
  const { player } = usePlayer()

  // TODO: Add current energy
  const currentEnergy = 0
  const tooltipLabel = `${currentEnergy} / ${formatNumber(player?.units.fleets.energy || 0, true)}`
  const energyLabel = `${currentEnergy} / ${formatNumber(player?.units.fleets.energy || 0)}`

  return (
    <Paper>
      <Tooltip title={tooltipLabel} arrow>
        <Stack direction={'row'} padding={0.5}>
          <BoltRoundedIcon />

          <Typography
            variant="body1"
            fontSize={12}
            padding={0.4}
            paddingLeft={0.8}
            paddingRight={0.8}
            overflow={'hidden'}
            textOverflow="ellipsis"
            textAlign="center"
          >
            {player ? energyLabel : <Skeleton variant="text" width={32} />}
          </Typography>
        </Stack>
      </Tooltip>
    </Paper>
  )
}

export default EnergyLabel
