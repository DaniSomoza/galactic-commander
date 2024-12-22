import Skeleton from '@mui/material/Skeleton'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import AlarmIcon from '@mui/icons-material/Alarm'

import { PlanetType } from 'game-api-microservice/src/types/Planet'

import { usePlayer } from '../../store/PlayerContext'
import { useTranslations } from '../../store/TranslationContext'
import UnitCard from '../unit-card/UnitCard'
import formatTimestamp from '../../utils/formatTimestamp'
import formatTimer from '../../utils/formatTimer'

type ActiveUnitsBuildProps = {
  activeBuildCountdown: number
  activeBuild?:
    | PlanetType['unitBuild']['troops']['activeBuild']
    | PlanetType['unitBuild']['spaceships']['activeBuild']
    | PlanetType['unitBuild']['defenses']['activeBuild']
}

function ActiveUnitsBuild({ activeBuild, activeBuildCountdown }: ActiveUnitsBuildProps) {
  const { player, isPlayerLoading, selectedPlanet, units } = usePlayer()
  const { translate } = useTranslations()

  if (!selectedPlanet || !player || isPlayerLoading) {
    return (
      <Paper variant="outlined">
        <Skeleton variant="rounded" height={'200px'} width={'200px'} />
      </Paper>
    )
  }

  if (!activeBuild || !activeBuildCountdown) {
    return (
      <Paper variant="outlined">
        <Skeleton variant="rounded" height={'200px'} width={'200px'} />
      </Paper>
    )
  }

  const unit = units.find((unit) => unit.name === activeBuild.unitName)

  if (!unit) {
    return (
      <Paper variant="outlined">
        <Skeleton variant="rounded" height={'200px'} width={'200px'} />
      </Paper>
    )
  }

  return (
    <Paper variant="outlined">
      <UnitCard disableBorder unit={unit} amount={activeBuild.amount}>
        {/* unit build countdown */}
        <Box position={'absolute'} left={0} bottom={0} padding={1}>
          <Paper variant="outlined">
            <Tooltip
              title={translate(
                'GAME_PLAYER_ACTIVE_BUILD_UNITS_END_DATE',
                formatTimestamp(activeBuild.executeTaskAt || 0)
              )}
              arrow
            >
              <Stack
                direction={'row'}
                gap={0.5}
                padding={0.4}
                paddingLeft={0.6}
                paddingRight={0.8}
                alignItems={'center'}
              >
                <AlarmIcon fontSize="small" />
                <Typography fontSize={12}>{formatTimer(activeBuildCountdown)}</Typography>
              </Stack>
            </Tooltip>
          </Paper>
        </Box>
      </UnitCard>
    </Paper>
  )
}

export default ActiveUnitsBuild
