import { useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import Divider from '@mui/material/Divider'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'

import { FleetType } from 'game-api-microservice/src/types/Fleets'

import { useTranslations } from '../../store/TranslationContext'
import formatTimer from '../../utils/formatTimer'
import useCountdown from '../../hooks/useCountdown'
import { usePlayer } from '../../store/PlayerContext'
import waitTaskToFinish from '../../utils/waitTaskToFinish'
import UnitCard from '../unit-card/UnitCard'

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

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Stack gap={1} direction={'row'}>
          <RocketLaunchIcon fontSize="small" />

          {/* TODO: create fleet type label */}
          <Typography variant="body1" fontSize={12} textAlign={'center'}>
            {translate(fleet.travel?.fleetType || '')}
          </Typography>

          {/* TODO: amount of units label */}
          {/* TODO: show units + unit icon */}
          <Typography variant="body1" fontSize={12} textAlign={'center'}>
            units: {fleet.units.length}
          </Typography>

          {/* TODO: from planet label */}

          {/* Arrow Icon => */}

          {/* TODO: to planet label */}

          {/* TODO: create countdown label */}
          <Typography variant="body1" fontSize={12} textAlign={'center'}>
            {formatTimer(fleetCountdown)}
            {/* TODO: tooltip {formatTimestamp(fleet.travel?.arriveAt || 0)} */}
          </Typography>
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
