import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import PublicIcon from '@mui/icons-material/Public'

import { usePlayer } from '../../store/PlayerContext'

function PlanetsLabel() {
  const { player } = usePlayer()

  const tooltipLabel = `${player?.planets.colonies.length} / ${player?.race.maxPlanetsAllowed} planets`
  const planetsLabel = `${player?.planets.colonies.length} / ${player?.race.maxPlanetsAllowed}`

  return (
    <Paper>
      <Tooltip title={tooltipLabel} arrow>
        <Stack direction={'row'} padding={0.5} alignItems={'center'}>
          <PublicIcon fontSize="small" />

          <Typography
            variant="body1"
            fontSize={12}
            padding={0.4}
            overflow={'hidden'}
            textOverflow="ellipsis"
            textAlign="center"
          >
            {player ? planetsLabel : <Skeleton variant="text" width={32} />}
          </Typography>
        </Stack>
      </Tooltip>
    </Paper>
  )
}

export default PlanetsLabel
