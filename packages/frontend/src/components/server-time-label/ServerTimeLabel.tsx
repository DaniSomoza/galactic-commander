import { useCallback, useState } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

import usePolling from '../../hooks/usePolling'
import formatTimestamp from '../../utils/formatTimestamp'

// TODO: crate getServerTime util
function getServerTime(): number {
  return new Date().getTime() - 1
}

function ServerTimeLabel() {
  const [serverTime, setServerTime] = useState(getServerTime)

  const updateServerTime = useCallback(() => {
    setServerTime(getServerTime)
  }, [])

  usePolling(updateServerTime)

  return (
    <Paper variant="outlined" sx={{ marginRight: '8px' }}>
      <Tooltip title={'Server time'} arrow>
        <Typography
          variant="body1"
          fontSize={12}
          padding={0.4}
          paddingLeft={0.8}
          paddingRight={0.8}
          overflow={'hidden'}
          textOverflow="ellipsis"
          textAlign="center"
        >
          {formatTimestamp(serverTime)}
        </Typography>
      </Tooltip>
    </Paper>
  )
}

export default ServerTimeLabel
