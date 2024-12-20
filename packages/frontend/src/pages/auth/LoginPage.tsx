import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid2'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'

import { GAME_DASHBOARD_PATH, REGISTER_PATH } from '../../routes/routes'
import { useAuthorization } from '../../store/AuthorizationContext'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { login } = useAuthorization()

  const handleSubmitLogin: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    await login(email, password)

    navigate(GAME_DASHBOARD_PATH)
  }

  // TODO: Add form validations
  // TODO: Add unhappy paths (login call fails...)

  // TODO: Add login translations!
  // TODO: Add refresh token flow?

  return (
    <Container component="main" maxWidth="xs" disableGutters>
      <Box component="section" marginTop={4}>
        <Paper variant="outlined">
          <Box padding={2}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmitLogin} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    id="password"
                    label="Password"
                    value={password}
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    fullWidth
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Login
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid>
                  <Typography>
                    Don't have an account?{' '}
                    <Link href={REGISTER_PATH} variant="body2">
                      Sign up
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default LoginPage
