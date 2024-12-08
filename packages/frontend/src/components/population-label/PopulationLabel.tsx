import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import GroupIcon from '@mui/icons-material/Group'

import calculateCurrentPlayerPopulation from 'game-engine/src/engine/units/calculateCurrentPlayerPopulation'
import calculateMaxPlayerPopulation from 'game-engine/src/engine/units/calculateMaxPlayerPopulation'

import formatNumber from '../../utils/formatNumber'
import { usePlayer } from '../../store/PlayerContext'
import { useTranslations } from '../../store/TranslationContext'

function PopulationLabel() {
  const { translate } = useTranslations()
  const { player } = usePlayer()

  return (
    <Paper>
      <Tooltip
        title={
          player
            ? translate(
                'GAME_PLAYER_STATS_POPULATION_TOOLTIP',
                calculateCurrentPlayerPopulation(player),
                formatNumber(calculateMaxPlayerPopulation(player), true)
              )
            : undefined
        }
        arrow
      >
        <Stack direction={'row'} padding={0.5} alignItems={'center'}>
          <GroupIcon fontSize="small" />

          <Typography
            variant="body1"
            fontSize={12}
            padding={0.4}
            overflow={'hidden'}
            textOverflow="ellipsis"
            textAlign="center"
          >
            {player ? (
              `${calculateCurrentPlayerPopulation(player)} / ${formatNumber(
                calculateMaxPlayerPopulation(player)
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

export default PopulationLabel
