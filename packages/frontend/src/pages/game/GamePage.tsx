import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'

import { useAuthorization } from '../../store/AuthorizationContext'
import { GameInfoProvider } from '../../store/GameInfoContext'
import { PlayerProvider } from '../../store/PlayerContext'
import { LOGIN_PATH } from '../../routes/routes'
import GameNavigationBar from '../../components/game-navigation-bar/GameNavigationBar'

function GamePage() {
  const { logout, sessionToken } = useAuthorization()
  const navigate = useNavigate()

  useEffect(() => {
    if (!sessionToken) {
      logout()
      navigate(LOGIN_PATH)
    }
  }, [sessionToken, logout, navigate])

  const drawerWidth = 210

  return (
    <GameInfoProvider>
      <PlayerProvider>
        <GameNavigationBar drawerWidth={drawerWidth} />

        <Box paddingLeft={`${drawerWidth}px`} maxWidth={'880px'} margin={'0 auto'}>
          <Box padding={2}>
            <Outlet />
          </Box>
        </Box>
      </PlayerProvider>
    </GameInfoProvider>
  )
}

export default GamePage
