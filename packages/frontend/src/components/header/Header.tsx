import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import MailIcon from '@mui/icons-material/Mail'

import ServerTimeLabel from '../server-time-label/ServerTimeLabel'
import { useAuthorization } from '../../store/AuthorizationContext'

function Header() {
  const { sessionToken, user } = useAuthorization()

  return (
    <AppBar position="fixed" component="header">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Galactic Commander
        </Typography>

        <ServerTimeLabel />

        {sessionToken && (
          <Stack spacing={1} direction="row" alignItems={'center'}>
            <Tooltip title={'show notifications'} arrow>
              <IconButton size="medium" aria-label="show notifications" color="inherit">
                <Badge badgeContent={2} color="info">
                  <NotificationsIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title={'show messages'} arrow>
              <IconButton size="medium" aria-label="show messages" color="inherit">
                <Badge badgeContent={4} color="info">
                  <MailIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>

            {sessionToken && (
              <Stack flexGrow={1} direction={'row'} spacing={2} paddingLeft={2}>
                {user ? (
                  <Tooltip title={`Logged as ${user.username}`} arrow>
                    <IconButton size="medium" aria-label="show 4 new mails" color="inherit">
                      <Avatar src="https://mui.com/static/images/avatar/1.jpg" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Skeleton variant="circular" width={40} height={40} />
                )}
              </Stack>
            )}
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
