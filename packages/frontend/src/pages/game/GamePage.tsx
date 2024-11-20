import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Skeleton from '@mui/material/Skeleton'

import { useAuthorization } from '../../store/AuthorizationContext'
import { GameInfoProvider, useGameInfo } from '../../store/GameInfoContext'
import { PlayerProvider, usePlayer } from '../../store/PlayerContext'
import { ResearchProvider } from '../../store/ResearchContext'
import { PlayerResourcesProvider } from '../../store/PlayerResourcesContext'
import { GAME_CREATE_PLAYER_PATH, LOGIN_PATH } from '../../routes/routes'
import GameNavigationBar from '../../components/game-navigation-bar/GameNavigationBar'
import PlanetSelector from '../../components/planet-selector/PlanetSelector'
import FleetsLabel from '../../components/fleets-label/FleetsLabel'
import PlanetsLabel from '../../components/planets-label/PlanetsLabel'
import PopulationLabel from '../../components/population-label/PopulationLabel'
import EnergyLabel from '../../components/energy-label/EnergyLabel'
import GamePlanetSection from '../../components/game-planet-section/GamePlanetSection'
import GameActiveResearchSection from '../../components/game-active-research-section/GameActiveResearchSection'

function GamePage() {
  const { logout, sessionToken } = useAuthorization()
  const navigate = useNavigate()

  const { loadPlayer } = usePlayer()
  const { selectedUniverse } = useGameInfo()

  useEffect(() => {
    if (!sessionToken) {
      logout()
      navigate(LOGIN_PATH)
    }
  }, [sessionToken, logout, navigate])

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

  const drawerWidth = 210

  return (
    <>
      {/* Game Navigation Left Bar */}
      <GameNavigationBar drawerWidth={drawerWidth} />

      {/* Player game stats */}
      <Box paddingLeft={`${drawerWidth}px`} maxWidth={'880px'} margin={'0 auto'}>
        <Box padding={2}>
          <Stack direction="column" spacing={2}>
            <Stack
              direction="row"
              spacing={2}
              component="section"
              justifyContent={'flex-end'}
              alignItems={'flex-end'}
            >
              <PlanetSelector />

              {/* separator */}
              <div style={{ flexGrow: 1 }} />

              <FleetsLabel />

              <PlanetsLabel />

              <PopulationLabel />

              <EnergyLabel />
            </Stack>

            {/* Player current actions Bar */}
            <Stack direction="row" spacing={2}>
              <Box component="section">
                <GamePlanetSection />
              </Box>

              <Box component="section">
                <GameActiveResearchSection />
              </Box>

              <Box component="section">
                <Skeleton variant="rectangular" height={'200px'} width={'200px'} />
              </Box>
            </Stack>
          </Stack>

          {/* current selected Page */}
          <Container sx={{ marginTop: 2 }} component="main" disableGutters>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </>
  )
}

function GamePageWithGameProviders() {
  return (
    <GameInfoProvider>
      <PlayerProvider>
        <ResearchProvider>
          <PlayerResourcesProvider>
            <GamePage />
          </PlayerResourcesProvider>
        </ResearchProvider>
      </PlayerProvider>
    </GameInfoProvider>
  )
}

export default GamePageWithGameProviders
