import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import GroupIcon from '@mui/icons-material/Group'

import formatNumber from '../../utils/formatNumber'
import { usePlayer } from '../../store/PlayerContext'

function PopulationLabel() {
  const { player } = usePlayer()

  // TODO: Add current population
  const currentPopulation = 0
  const tooltipLabel = `${currentPopulation} / ${formatNumber(player?.units.troops.population || 0, true)}`
  const populationLabel = `${currentPopulation} / ${formatNumber(player?.units.troops.population || 0)}`

  return (
    <Paper>
      <Tooltip title={tooltipLabel} arrow>
        <Stack direction={'row'} padding={0.5}>
          <GroupIcon />

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
            {player ? populationLabel : <Skeleton variant="text" width={32} />}
          </Typography>
        </Stack>
      </Tooltip>
    </Paper>
  )
}

export default PopulationLabel
