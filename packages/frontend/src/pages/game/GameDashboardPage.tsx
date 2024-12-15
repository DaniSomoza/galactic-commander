import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'

import { usePlayer } from '../../store/PlayerContext'
import PlayerPerksSection from '../../components/player-perks-section/PlayerPerksSection'

function GameDashboardPage() {
  const { player, isPlayerLoading } = usePlayer()

  // TODO: ADD PLAYER RESEARCH QUEUE ?

  // TODO: create computed bonuses

  return (
    <Stack gap={2}>
      {/* TODO: INCLUDE HERE THE RESEARCH QUEUE */}

      <PlayerPerksSection playerPerks={player?.perks} isLoading={isPlayerLoading} />

      <Paper variant="outlined">
        <Skeleton variant="rectangular" height={'400px'} />
      </Paper>
    </Stack>
  )
}

export default GameDashboardPage
