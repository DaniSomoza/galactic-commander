import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'

import calculateCurrentPlayerEnergy from 'game-engine/src/engine/units/calculateCurrentPlayerEnergy'
import calculateMaxPlayerEnergy from 'game-engine/src/engine/units/calculateMaxPlayerEnergy'

import formatNumber from '../../utils/formatNumber'
import { usePlayer } from '../../store/PlayerContext'
import { useTranslations } from '../../store/TranslationContext'

function EnergyLabel() {
  const { translate } = useTranslations()
  const { player } = usePlayer()

  return (
    <Paper variant="outlined">
      <Tooltip
        title={
          player
            ? translate(
                'GAME_PLAYER_STATS_ENERGY_TOOLTIP',
                calculateCurrentPlayerEnergy(player),
                formatNumber(calculateMaxPlayerEnergy(player), true)
              )
            : ''
        }
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
            {player ? (
              `${formatNumber(calculateCurrentPlayerEnergy(player), true)} / ${formatNumber(
                calculateMaxPlayerEnergy(player),
                true
              )}`
            ) : (
              <Skeleton variant="text" width={32} />
            )}
          </Typography>
        </Stack>
      </Tooltip>
    </Paper>
  )
}

export default EnergyLabel
