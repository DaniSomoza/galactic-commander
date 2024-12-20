import { useNavigate } from 'react-router-dom'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PublicIcon from '@mui/icons-material/Public'
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'
import DiamondIcon from '@mui/icons-material/Diamond'
import GroupIcon from '@mui/icons-material/Group'
import RocketIcon from '@mui/icons-material/Rocket'
import SecurityIcon from '@mui/icons-material/Security'
import CorporateFareIcon from '@mui/icons-material/CorporateFare'
import EmailIcon from '@mui/icons-material/Email'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import GitHubIcon from '@mui/icons-material/GitHub'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded'
import TerminalIcon from '@mui/icons-material/Terminal'

import {
  GAME_ALLIANCE_PATH,
  GAME_DASHBOARD_PATH,
  GAME_DEFENSES_PATH,
  GAME_GALAXIES_PATH,
  GAME_MESSAGES_PATH,
  GAME_RANKING_PATH,
  GAME_RESEARCHES_PATH,
  GAME_RESOURCES_PATH,
  GAME_SHIPS_PATH,
  GAME_SPECIALS_PATH,
  GAME_TROOPS_PATH,
  GAME_SETTINGS_PATH,
  GAME_BATTLE_CALCULATOR_PATH,
  GAME_TASKS_PATH
} from '../../routes/routes'
import { useTranslations } from '../../store/TranslationContext'

type GameNavigationBarProps = {
  drawerWidth: number
}

function GameNavigationBar({ drawerWidth }: GameNavigationBarProps) {
  const { translate } = useTranslations()
  const navigate = useNavigate()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { marginTop: '64px', width: drawerWidth, boxSizing: 'border-box' }
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(GAME_DASHBOARD_PATH)}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={translate('NAV_BAR_DASHBOARD')} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(GAME_RESEARCHES_PATH)}>
            <ListItemIcon>
              <ScienceRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={translate('NAV_BAR_RESEARCHES')} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(GAME_RESOURCES_PATH)}>
            <ListItemIcon>
              <DiamondIcon />
            </ListItemIcon>
            <ListItemText primary={translate('NAV_BAR_RESOURCES')} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(GAME_SPECIALS_PATH)}>
            <ListItemIcon>
              <MilitaryTechIcon />
            </ListItemIcon>
            <ListItemText primary={translate('NAV_BAR_SPECIALS')} />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(GAME_TROOPS_PATH)}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={translate('NAV_BAR_TROOPS')} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(GAME_SHIPS_PATH)}>
            <ListItemIcon>
              <RocketIcon />
            </ListItemIcon>
            <ListItemText primary={translate('NAV_BAR_SHIPS')} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(GAME_DEFENSES_PATH)}>
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText primary={translate('NAV_BAR_DEFENSES')} />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(GAME_ALLIANCE_PATH)}>
            <ListItemIcon>
              <CorporateFareIcon />
            </ListItemIcon>
            <ListItemText primary={translate('NAV_BAR_ALLIANCE')} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(GAME_GALAXIES_PATH)}>
            <ListItemIcon>
              <PublicIcon />
            </ListItemIcon>
            <ListItemText primary={translate('NAV_BAR_GALAXY')} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(GAME_MESSAGES_PATH)}>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary={translate('NAV_BAR_MESSAGES')} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(GAME_RANKING_PATH)}>
            <ListItemIcon>
              <EmojiEventsIcon />
            </ListItemIcon>
            <ListItemText primary={translate('NAV_BAR_RANKING')} />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem disablePadding>
          <ListItemButton
            onClick={() =>
              window.open('https://github.com/DaniSomoza/galactic-commander', '_blank')
            }
          >
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary={translate('NAV_BAR_CODE')} />
            <Paper variant="outlined">
              <Typography
                variant="caption"
                fontSize={12}
                padding={0.4}
                paddingLeft={0.8}
                paddingRight={0.8}
              >
                v0.0.1
              </Typography>
            </Paper>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(GAME_TASKS_PATH)}>
            <ListItemIcon>
              <TerminalIcon />
            </ListItemIcon>
            <ListItemText primary={translate('NAV_BAR_GAME_LOG')} />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(GAME_SETTINGS_PATH)}>
            <ListItemIcon>
              <SettingsRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={translate('NAV_BAR_SETTINGS')} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(GAME_BATTLE_CALCULATOR_PATH)}>
            <ListItemIcon>
              <CalculateRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={translate('NAV_BAR_BATTLE_SIMULATOR')} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}

export default GameNavigationBar
