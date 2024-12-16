import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import FortIcon from '@mui/icons-material/Fort'

import isPlanetCoordinates from 'game-engine/src/engine/planets/isPlanetCoordinates'

import { usePlayer } from '../../store/PlayerContext'
import { useTranslations } from '../../store/TranslationContext'
import formatNumber from '../../utils/formatNumber'
import { PlayerType } from 'game-api-microservice/src/types/Player'
import { PlanetType } from 'game-api-microservice/src/types/Planet'

function DefensesLabel() {
  const { translate } = useTranslations()
  const { player, selectedPlanet } = usePlayer()

  const defensesInThisPlanet = getDefensesInThePlanet(player, selectedPlanet)
  return (
    <Paper variant="outlined">
      <Tooltip
        title={translate(
          'GAME_PLAYER_STATS_DEFENSES_TOOLTIP',
          formatNumber(defensesInThisPlanet, true)
        )}
        arrow
      >
        <Stack direction={'row'} padding={0.5} paddingLeft={1} alignItems={'center'}>
          <FortIcon fontSize="small" />

          <Typography
            variant="body1"
            fontSize={12}
            padding={0.4}
            overflow={'hidden'}
            textOverflow="ellipsis"
            textAlign="center"
          >
            {player ? (
              formatNumber(defensesInThisPlanet, true)
            ) : (
              <Skeleton variant="text" width={32} />
            )}
          </Typography>
        </Stack>
      </Tooltip>
    </Paper>
  )
}

export default DefensesLabel

function getDefensesInThePlanet(player?: PlayerType, selectedPlanet?: PlanetType): number {
  if (!player || !selectedPlanet) {
    return 0
  }

  const planetFleets = player.fleets.find(
    (fleet) => isPlanetCoordinates(fleet.planet, selectedPlanet.coordinates) && !fleet.travel
  )

  if (!planetFleets) {
    return 0
  }

  return planetFleets.units.reduce((defenses, { unit, amount }) => {
    if (unit.type === 'DEFENSE') {
      return defenses + amount
    }

    return defenses
  }, 0)
}
