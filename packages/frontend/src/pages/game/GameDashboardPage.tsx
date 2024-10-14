import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Divider from '@mui/material/Divider'

import { GAME_CREATE_PLAYER_PATH } from '../../routes/routes'
import { usePlayer } from '../../store/PlayerContext'
import { useGameInfo } from '../../store/GameInfoContext'
import { useAuthorization } from '../../store/AuthorizationContext'
import GamePlanetSection from '../../components/game-planet-section/GamePlanetSection'
import GameActiveResearchSection from '../../components/game-active-research-section/GameActiveResearchSection'
import Loader from '../../components/loader/Loader'
import BonusCard from '../../components/bonus-card/BonusCard'
import PopulationLabel from '../../components/population-label/PopulationLabel'
import EnergyLabel from '../../components/energy-label/EnergyLabel'

function GameDashboardPage() {
  const { sessionToken } = useAuthorization()
  const { player, loadPlayer, isPlayerLoading } = usePlayer()
  const { selectedUniverse } = useGameInfo()

  const navigate = useNavigate()

  useEffect(() => {
    async function checkPlayer() {
      try {
        await loadPlayer()
      } catch {
        navigate(GAME_CREATE_PLAYER_PATH)
      }
    }

    if (selectedUniverse && sessionToken) {
      checkPlayer()
    }
  }, [loadPlayer, selectedUniverse, sessionToken, navigate])

  // TODO: ADD PLANET SELECTOR!
  // TODO: SHOW current bonus (chip component?)

  if (!player || isPlayerLoading) {
    return <Loader isLoading />
  }

  return (
    <Stack direction="column" spacing={2}>
      <Stack
        direction="row"
        spacing={2}
        component="section"
        justifyContent={'flex-end'}
        alignItems={'flex-end'}
      >
        <PopulationLabel />

        <EnergyLabel />
      </Stack>

      <Stack direction="row" spacing={2}>
        <Box component="section">
          {/* Planet Section */}
          <GamePlanetSection planet={player.planets.principal} owner={player} />
        </Box>

        <Box component="section">
          {/* Active researches Section */}
          <GameActiveResearchSection activeResearch={player.researches.activeResearch} />
        </Box>

        <Box component="section">
          {/* BUILD SECTION ??? */}
          <Paper variant="outlined">
            <Skeleton variant="rectangular" height={'66px'} width={'200px'} />
            <Divider />
            <Skeleton variant="rectangular" height={'66px'} width={'200px'} />
            <Divider />
            <Skeleton variant="rectangular" height={'66px'} width={'200px'} />
          </Paper>
        </Box>
      </Stack>

      <Stack direction="row" component="section" spacing={2} flexGrow={1}>
        {/* Bonus Section */}
        <Paper variant="outlined" sx={{ flexGrow: 1 }}>
          <Stack
            direction={'row'}
            justifyContent={'center'}
            spacing={1}
            alignItems="center"
            padding={1}
          >
            {player.bonus.map((bonus) => (
              <BonusCard bonus={bonus} key={bonus.source} />
            ))}
          </Stack>
        </Paper>
      </Stack>

      <Stack direction="row" spacing={2}>
        <Container component="main" disableGutters>
          <Box component="section">
            {/* MainFrame */}
            <Paper variant="outlined">
              <Skeleton variant="rectangular" height={'400px'} />
            </Paper>
          </Box>
        </Container>
      </Stack>
    </Stack>
  )
}

export default GameDashboardPage
