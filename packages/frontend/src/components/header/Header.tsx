import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

import { useTheme } from '../../store/ThemeContext'

function Header() {
  const { switchTheme, isDarkThemeModeEnabled } = useTheme()

  return (
    <AppBar position="static" component="header">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Game Header
        </Typography>
        <Tooltip title={'switch theme mode'}>
          <IconButton
            size="large"
            aria-label="switch theme mode"
            onClick={switchTheme}
            color="inherit"
          >
            {isDarkThemeModeEnabled ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}

export default Header
