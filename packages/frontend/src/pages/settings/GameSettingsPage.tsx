import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import ButtonGroup from '@mui/material/ButtonGroup'
import Typography from '@mui/material/Typography'
import { grey } from '@mui/material/colors'

import { useTheme } from '../../store/ThemeContext'
import { useAuthorization } from '../../store/AuthorizationContext'

function GameSettingsPage() {
  const { logout } = useAuthorization()

  const { switchTheme, isDarkThemeModeEnabled } = useTheme()

  return (
    <div>
      <Stack spacing={1} mt={3} padding={1}>
        <Typography variant="body1" color={grey[600]} gutterBottom>
          General Settings
        </Typography>

        <Stack direction="row" spacing={1}>
          <Tooltip title={'switch theme mode'}>
            <ButtonGroup aria-label="switch theme mode">
              <Button
                onClick={switchTheme}
                variant={isDarkThemeModeEnabled ? 'outlined' : 'contained'}
                endIcon={<LightModeIcon />}
              >
                Light
              </Button>
              <Button
                onClick={switchTheme}
                variant={isDarkThemeModeEnabled ? 'contained' : 'outlined'}
                endIcon={<DarkModeIcon />}
              >
                Dark
              </Button>
            </ButtonGroup>
          </Tooltip>
        </Stack>
      </Stack>

      <Stack spacing={1} marginTop={2} alignItems={'flex-start'} padding={1}>
        <Typography variant="body1" color={grey[600]} gutterBottom>
          User Settings
        </Typography>

        <Tooltip title={'logout'}>
          <Button onClick={logout} variant="outlined" endIcon={<LogoutRoundedIcon />}>
            Logout
          </Button>
        </Tooltip>
      </Stack>
    </div>
  )
}

export default GameSettingsPage
