import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { FleetType } from 'game-api-microservice/src/types/Fleets'

import formatTimestamp from '../../utils/formatTimestamp'

type FleetProps = {
  fleet: FleetType
}

function Fleet({ fleet }: FleetProps) {

  // TODO: implement this with MUIacordion and create an state to track the task!!
  return (
    <Paper variant="outlined">
      <Stack gap={1} direction={'row'}>
        <Typography variant="body1" fontSize={12} textAlign={'center'}>
          {fleet.travel?.fleetType}
        </Typography>

        <Typography variant="body1" fontSize={12} textAlign={'center'}>
          units: {fleet.units.length}
        </Typography>

        <Typography variant="body1" fontSize={12} textAlign={'center'}>
          {formatTimestamp(fleet.travel?.arriveAt || 0)}
        </Typography>
      </Stack>
    </Paper>
  )
}

export default Fleet
