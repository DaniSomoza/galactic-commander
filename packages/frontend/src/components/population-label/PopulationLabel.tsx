import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import GroupIcon from '@mui/icons-material/Group'

import computedBonus from 'game-engine/src/engine/bonus/computedBonus'

import formatNumber from '../../utils/formatNumber'
import { usePlayer } from '../../store/PlayerContext'
import { useTranslations } from '../../store/TranslationContext'

function PopulationLabel() {
  const { translate } = useTranslations()
  const { player } = usePlayer()

  // TODO: Add current population
  const currentPopulation = 0
  const populationBonus = computedBonus(player?.perks || [], 'TROOPS_POPULATION_BONUS')
  const basePopulation = player ? player.units.troops.population * (populationBonus / 100) : 0
  const populationLabel = `${currentPopulation} / ${formatNumber(basePopulation)}`

  return (
    <Paper>
      <Tooltip
        title={translate(
          'GAME_PLAYER_STATS_POPULATION_TOOLTIP',
          currentPopulation,
          formatNumber(player?.units.troops.population || 0, true)
        )}
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
            {player ? populationLabel : <Skeleton variant="text" width={32} />}
          </Typography>
        </Stack>
      </Tooltip>
    </Paper>
  )
}

export default PopulationLabel
