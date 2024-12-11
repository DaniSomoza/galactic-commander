import Skeleton from '@mui/material/Skeleton'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'
import AlarmIcon from '@mui/icons-material/Alarm'
import GroupIcon from '@mui/icons-material/Group'

import getUnitImage from '../../utils/getUnitImage'
import { useTranslations } from '../../store/TranslationContext'
import { useBuildUnits } from '../../store/buildUnitsContext'
import { usePlayer } from '../../store/PlayerContext'
import Image from '../image/Image'
import formatNumber from '../../utils/formatNumber'
import formatTimestamp from '../../utils/formatTimestamp'
import formatTimer from '../../utils/formatTimer'

function ActiveBuildTroopsSection() {
  const { player, isPlayerLoading, selectedPlanet } = usePlayer()

  const { translate } = useTranslations()

  const { activeBuildTroopsCountdown, activeBuildTroops } = useBuildUnits()

  console.log('activeBuildTroopsCountdown: ', activeBuildTroopsCountdown)
  console.log('activeBuildTroops: ', activeBuildTroops)

  if (!selectedPlanet || !player || isPlayerLoading) {
    return <Skeleton variant="rounded" height={'200px'} width={'200px'} />
  }

  if (!activeBuildTroops) {
    return <Skeleton variant="rounded" height={'200px'} width={'200px'} />
  }

  const units = [...selectedPlanet.units, ...player.race.units]

  const unit = units.find((unit) => unit.name === activeBuildTroops.unitName)

  if (!unit) {
    return <Skeleton variant="rounded" height={'200px'} width={'200px'} />
  }

  console.log('>>> unit: ', unit)

  return (
    <Paper variant="outlined">
      <Box sx={{ position: 'relative' }}>
        <Stack justifyContent="center" alignItems="center">
          <Image
            src={getUnitImage(unit.name)}
            alt={translate(unit.name)}
            height={'200px'}
            width={'200px'}
            border
          />

          {/* Unit name */}
          <Box
            position={'absolute'}
            top={20}
            maxWidth={'200px'}
            sx={{ transform: 'translate(0, -50%)' }}
          >
            <Paper variant="outlined">
              <Stack
                direction={'row'}
                gap={0.5}
                padding={0.4}
                paddingLeft={0.6}
                paddingRight={0.8}
                alignItems={'center'}
              >
                {unit.isHero && <MilitaryTechIcon fontSize="small" />}
                <Typography variant="body1" fontSize={13}>
                  {translate(unit.name)}
                </Typography>
              </Stack>
            </Paper>
          </Box>

          <Box position={'absolute'} left={0} bottom={0} padding={1}>
            <Paper variant="outlined">
              <Tooltip
                title={translate(
                  'GAME_PLAYER_ACTIVE_BUILD_UNITS_END_DATE',
                  formatTimestamp(activeBuildTroops.executeTaskAt || 0)
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
                  <Typography fontSize={12}>{formatTimer(activeBuildTroopsCountdown)}</Typography>
                </Stack>
              </Tooltip>
            </Paper>
          </Box>

          {/* Amount of units in this planet */}
          <Box position={'absolute'} right={0} bottom={0} padding={1}>
            <Paper variant="outlined">
              <Tooltip
                title={translate(
                  'GAME_BUILD_UNITS_PAGE_AMOUNT_OF_UNITS_IN_PLANET_TOOLTIP',
                  formatNumber(activeBuildTroops.amount, true)
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
                  <GroupIcon fontSize="small" />
                  <Typography fontSize={12}>{formatNumber(activeBuildTroops.amount)}</Typography>
                </Stack>
              </Tooltip>
            </Paper>
          </Box>
        </Stack>
      </Box>
    </Paper>
  )
}

export default ActiveBuildTroopsSection
