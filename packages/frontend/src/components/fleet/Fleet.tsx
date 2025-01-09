import { useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import Divider from '@mui/material/Divider'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import GroupIcon from '@mui/icons-material/Group'
import RocketIcon from '@mui/icons-material/Rocket'
import AlarmIcon from '@mui/icons-material/Alarm'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded'

import { FleetType, FleetUnitsType } from 'game-api-microservice/src/types/Fleets'
import { PlanetType } from 'game-api-microservice/src/types/Planet'

import { useTranslations } from '../../store/TranslationContext'
import formatTimer from '../../utils/formatTimer'
import useCountdown from '../../hooks/useCountdown'
import { usePlayer } from '../../store/PlayerContext'
import waitTaskToFinish from '../../utils/waitTaskToFinish'
import UnitCard from '../unit-card/UnitCard'
import Image from '../image/Image'
import formatCoordinatesLabel from '../../utils/formatPlanetCoordinates'

type FleetProps = {
  fleet: FleetType
  onFinishFleet?: () => void
}

function Fleet({ fleet, onFinishFleet }: FleetProps) {
  const { translate } = useTranslations()

  const { loadPlayer } = usePlayer()

  const fleetCountdown = useCountdown(fleet.travel!.arriveAt)

  useEffect(() => {
    async function updatePlayer() {
      if (fleetCountdown === 0) {
        await waitTaskToFinish(fleet.travel!.taskId!)
        await loadPlayer()
        onFinishFleet?.()
      }
    }

    updatePlayer()
  }, [fleetCountdown, loadPlayer, fleet, onFinishFleet])

  // TODO: implement invisible fleets
  const isInvisible = false

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack gap={1} direction={'row'} alignItems={'center'} flexGrow={1}>
          <RocketLaunchIcon />

          {isInvisible ? (
            <Tooltip title={translate('INVISIBLE_FLEET_ACTIVATED_TOOLTIP')} arrow>
              <VisibilityOffIcon fontSize="small" color="success" />
            </Tooltip>
          ) : (
            <Tooltip title={translate('INVISIBLE_FLEET_NOT_ACTIVATED_TOOLTIP')} arrow>
              <VisibilityIcon fontSize="small" color="disabled" />
            </Tooltip>
          )}

          <FleetTypeLabel fleetType={fleet.travel?.fleetType} />

          <AmountOfUnitsLabel fleetUnits={fleet.units} />

          {/* TODO: fleet resources label ??? */}

          <FleetPlanetsLabel
            fromPlanet={fleet.planet}
            toPlanet={fleet.travel!.destination}
            isReturning={fleet.travel!.isReturning}
          />

          <Paper variant="outlined">
            <Stack direction={'row'} alignItems={'center'} gap={0.5} padding={0.5} paddingRight={1}>
              <AlarmIcon fontSize="small" />
              <Typography variant="body1" fontSize={12} textAlign={'center'}>
                {formatTimer(fleetCountdown)}
                {/* TODO: tooltip {formatTimestamp(fleet.travel?.arriveAt || 0)} */}
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </AccordionSummary>

      <Divider />

      <AccordionDetails>
        {/* TODO: implement fleet details */}
        <Stack direction={'row'} gap={1}>
          {fleet.units.map(({ unit, amount }) => (
            <UnitCard
              key={unit.name}
              unit={unit}
              amount={amount}
              height={140}
              width={140}
              isAvailable
            />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}

export default Fleet

function FleetTypeLabel({ fleetType = '' }: { fleetType?: string }) {
  const { translate } = useTranslations()

  return (
    <Paper variant="outlined">
      <Typography variant="body1" fontSize={12} textAlign={'center'} padding={0.5}>
        {translate(fleetType)}
      </Typography>
    </Paper>
  )
}

function AmountOfUnitsLabel({ fleetUnits }: { fleetUnits: FleetUnitsType[] }) {
  const spaceships = fleetUnits.reduce((troops, { unit, amount }) => {
    if (unit.type === 'SPACESHIP') {
      return troops + amount
    }

    return troops
  }, 0)

  const troops = fleetUnits.reduce((troops, { unit, amount }) => {
    if (unit.type === 'TROOP') {
      return troops + amount
    }

    return troops
  }, 0)

  return (
    <Paper variant="outlined">
      <Stack direction={'row'} alignItems={'center'} gap={1} padding={0.5} paddingRight={1}>
        <Stack direction={'row'} alignItems={'center'} gap={0.5}>
          <RocketIcon fontSize="small" />
          <Typography variant="body1" fontSize={12} textAlign={'center'}>
            {spaceships}
          </Typography>
        </Stack>

        <Stack direction={'row'} alignItems={'center'} gap={0.5}>
          <GroupIcon fontSize="small" />
          <Typography variant="body1" fontSize={12} textAlign={'center'}>
            {troops}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  )
}

type FleetPlanetsLabelProps = {
  fromPlanet: PlanetType
  toPlanet: PlanetType
  isReturning: boolean
}

function FleetPlanetsLabel({ fromPlanet, toPlanet, isReturning }: FleetPlanetsLabelProps) {
  return (
    <Stack direction={'row'} gap={1} flexGrow={1} justifyContent={'center'} alignItems={'center'}>
      {isReturning ? (
        <>
          <Tooltip arrow title={formatCoordinatesLabel(toPlanet.coordinates)}>
            <div>
              <Image
                src={toPlanet.imgUrl}
                alt={toPlanet.name}
                height={'36px'}
                width={'36px'}
                border
              />
            </div>
          </Tooltip>

          <ArrowRightAltRoundedIcon sx={{ transform: 'scaleX(-1)' }} />

          <Tooltip arrow title={formatCoordinatesLabel(fromPlanet.coordinates)}>
            <div>
              <Image
                src={fromPlanet.imgUrl}
                alt={fromPlanet.name}
                height={'36px'}
                width={'36px'}
                border
              />
            </div>
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip arrow title={formatCoordinatesLabel(fromPlanet.coordinates)}>
            <div>
              <Image
                src={fromPlanet.imgUrl}
                alt={fromPlanet.name}
                height={'36px'}
                width={'36px'}
                border
              />
            </div>
          </Tooltip>

          <ArrowRightAltRoundedIcon />

          <Tooltip arrow title={formatCoordinatesLabel(toPlanet.coordinates)}>
            <div>
              <Image
                src={toPlanet.imgUrl}
                alt={toPlanet.name}
                height={'36px'}
                width={'36px'}
                border
              />
            </div>
          </Tooltip>
        </>
      )}
    </Stack>
  )
}
