import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Skeleton from '@mui/material/Skeleton'
import IconButton from '@mui/material/IconButton'
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import AlarmIcon from '@mui/icons-material/Alarm'

import { UnitType, UnitTypes } from 'game-api-microservice/src/types/Unit'
import { PlanetType } from 'game-api-microservice/src/types/Planet'
import { PlayerType } from 'game-api-microservice/src/types/Player'
import computedBonus from 'game-engine/src/engine/bonus/computedBonus'

import { usePlayer } from '../../store/PlayerContext'
import Loader from '../loader/Loader'
import { useTranslations } from '../../store/TranslationContext'
import UnitCard from '../unit-card/UnitCard'
import formatTimestamp from '../../utils/formatTimestamp'
import formatTimer from '../../utils/formatTimer'
import millisToSeconds from '../../utils/millisToSeconds'
import { useBuildUnits } from '../../store/buildUnitsContext'

type BuildUnitsQueueProps = {
  unitType: UnitTypes
}

const path: Record<UnitTypes, keyof PlanetType['unitBuild']> = {
  TROOP: 'troops',
  SPACESHIP: 'spaceships',
  DEFENSE: 'defenses'
}

function BuildUnitsQueue({ unitType }: BuildUnitsQueueProps) {
  const { translate } = useTranslations()
  const { player, isPlayerLoading, selectedPlanet, units } = usePlayer()

  if (!player || isPlayerLoading || !selectedPlanet) {
    return <Loader isLoading />
  }

  const queue = selectedPlanet.unitBuild[path[unitType]].queue
  const showQueue = queue.length > 0

  return (
    <Paper variant="outlined">
      {showQueue ? (
        <Stack direction={'row'} gap={1} padding={1} sx={{ overflowX: 'auto' }}>
          {queue.map(({ unitName, amount }, index) => {
            const unit = units.find((unit) => unit.name === unitName)

            const showNextArrow = index < queue.length - 1

            return (
              <Stack key={index} alignItems={'center'} direction={'row'} gap={1}>
                <QueueItem index={index} unit={unit!} amount={amount} player={player} />

                {showNextArrow && <ArrowRightAltRoundedIcon sx={{ transform: 'rotate(180deg)' }} />}
              </Stack>
            )
          })}
        </Stack>
      ) : (
        <Stack direction={'row'} justifyContent={'center'} gap={1} padding={4}>
          <Tooltip title={translate('BUILD_UNITS_QUEUE_EMPTY_TOOLTIP')} arrow>
            <Typography fontSize={12}>{translate('BUILD_UNITS_QUEUE_EMPTY')}</Typography>
          </Tooltip>
        </Stack>
      )}
    </Paper>
  )
}

export default BuildUnitsQueue

type QueueItemProps = {
  index: number
  unit: UnitType
  amount: number
  player: PlayerType
}

function QueueItem({ unit, amount, player, index }: QueueItemProps) {
  const { translate } = useTranslations()

  const { removeBuildUnitsFromQueue } = useBuildUnits()

  const [showRemoveButton, setShowRemoveButton] = useState(false)

  if (!unit) {
    return <Skeleton variant="rounded" height={'200px'} width={'200px'} />
  }

  const buildUnitBonus = computedBonus(player.perks, 'TROOPS_TRAINING_BONUS')
  const buildUnitDuration = millisToSeconds(unit.buildBaseTime * (100 / buildUnitBonus))
  const countdown = buildUnitDuration * amount

  async function removeFromQueue(index: number) {
    await removeBuildUnitsFromQueue(index, unit.type)
  }

  return (
    <Tooltip title={translate(unit.name)} arrow>
      <div
        onMouseEnter={() => setShowRemoveButton(true)}
        onMouseLeave={() => setShowRemoveButton(false)}
      >
        <UnitCard showNameLabel={false} unit={unit} amount={amount} height={128} width={128}>
          <>
            {/* Countdown */}
            <Box position={'absolute'} top={20} sx={{ transform: 'translate(0, -50%)' }}>
              <Paper variant="outlined">
                <Tooltip
                  title={translate(
                    'BUILD_UNITS_QUEUE_END_DATE_TOOLTIP',
                    formatTimestamp(countdown || 0)
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
                    <Typography fontSize={12}>{formatTimer(countdown)}</Typography>
                  </Stack>
                </Tooltip>
              </Paper>
            </Box>

            {/* remove item from the queue */}
            {showRemoveButton && (
              <Box position={'absolute'} top={0} right={0}>
                <Tooltip title={translate('BUILD_UNITS_QUEUE_REMOVE_ITEM_TOOLTIP')} arrow>
                  <IconButton
                    size="small"
                    onClick={() => removeFromQueue(index)}
                    aria-label={translate('BUILD_UNITS_QUEUE_REMOVE_ITEM_TOOLTIP')}
                    color="inherit"
                    sx={{ fontSize: '14px' }}
                  >
                    <CancelRoundedIcon color="error" fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </Box>
            )}

            {/* position in the queue */}
            <Box position={'absolute'} left={0} bottom={0} padding={0.5}>
              <Paper variant="outlined">
                <Typography
                  variant="body1"
                  fontSize={12}
                  fontWeight={500}
                  padding={0.3}
                  paddingLeft={0.6}
                  paddingRight={0.6}
                >
                  {index + 1}º
                </Typography>
              </Paper>
            </Box>
          </>
        </UnitCard>
      </div>
    </Tooltip>
  )
}
