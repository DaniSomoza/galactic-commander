import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import PublicIcon from '@mui/icons-material/Public'

import computedBonus from 'game-engine/src/engine/bonus/computedBonus'

import { usePlayer } from '../../store/PlayerContext'
import { useTranslations } from '../../store/TranslationContext'

function PlanetsLabel() {
  const { translate } = useTranslations()
  const { player } = usePlayer()

  const raceMaxPlanetsAllowed = player?.race.maxPlanetsAllowed || 0
  const bonusMaxPlanetsAllowed = computedBonus(player?.perks || [], 'EXTRA_PLANETS_BONUS')
  const maxPlanetsAllowed = raceMaxPlanetsAllowed + bonusMaxPlanetsAllowed

  const planetsLabel = `${player?.planets.colonies.length || 0} / ${maxPlanetsAllowed}`

  return (
    <Paper variant="outlined">
      <Tooltip
        title={translate(
          'GAME_PLAYER_STATS_PLANETS_TOOLTIP',
          player?.planets.colonies.length || 0,
          player?.race.maxPlanetsAllowed || 0
        )}
        arrow
      >
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
