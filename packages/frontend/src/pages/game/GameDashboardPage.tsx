import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'

import { usePlayer } from '../../store/PlayerContext'
import BonusCards from '../../components/bonus-cards/BonusCards'
import PlayerPerksSection from '../../components/player-perks-section/PlayerPerksSection'

function GameDashboardPage() {
  const { player, isPlayerLoading } = usePlayer()

  console.log('player: ', player)

  // TODO: ADD PLAYER RESEARCH QUEUE ?

  // TODO: create computed bonuses

  return (
    <Stack gap={2}>
      <Paper variant="outlined">
        {/* TODO: INCLUDE HERE THE RESEARCH QUEUE */}

        {/* TODO: REMOVE THIS */}
        <Stack direction={'row'} gap={1} padding={1} justifyContent={'center'} flexWrap={'wrap'}>
          {player?.perks.map((perk) => <BonusCards key={perk.source} bonus={perk.bonus} />)}
        </Stack>
      </Paper>

      <PlayerPerksSection playerPerks={player?.perks} isLoading={isPlayerLoading} />

      <Paper variant="outlined">
        <Skeleton variant="rectangular" height={'400px'} />
      </Paper>
    </Stack>
  )
}

export default GameDashboardPage
