import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'

import formatNumber from '../../utils/formatNumber'
import { usePlayer } from '../../store/PlayerContext'
import { useTranslations } from '../../store/TranslationContext'

function EnergyLabel() {
  const { translate } = useTranslations()
  const { player } = usePlayer()

  // TODO: Add current energy
  const currentEnergy = 0
  const energyLabel = `${currentEnergy} / ${formatNumber(player?.units.fleets.energy || 0)}`

  return (
    <Paper>
      <Tooltip
        title={translate(
          'GAME_PLAYER_STATS_ENERGY_TOOLTIP',
          currentEnergy,
          formatNumber(player?.units.fleets.energy || 0, true)
        )}
        arrow
      >
        <Stack direction={'row'} padding={0.5} alignItems={'center'}>
          <BoltRoundedIcon fontSize="small" />

          <Typography
            variant="body1"
            fontSize={12}
            padding={0.4}
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
