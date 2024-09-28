import { useState } from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid2'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'

import { registerUser } from '../endpoints/auth/authEndpoints'

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showCheckYourEmail, setShowCheckYourEmail] = useState(false)

  const handleSubmitRegister: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    await registerUser(username, email, password)

    setShowCheckYourEmail(true)
  }

  // TODO: Add form validations
  // TODO: Add unhappy paths (register call fails...)

  return (
    <Container component="main" maxWidth="xs" disableGutters>
      <Box component="section" marginTop={4}>
        <Paper variant="outlined">
          {!showCheckYourEmail ? (
            <Box padding={2}>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>

              <Box component="form" noValidate onSubmit={handleSubmitRegister} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="given-name"
                      name="userName"
                      required
                      fullWidth
                      id="userName"
                      label="Username"
                      autoFocus
                    />
                  </Grid>
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
                  Register
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid>
                    {/* TODO: create login link */}
                    Already have an account?
                    <Link href="#" variant="body2">
                      Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          ) : (
            <Box padding={2} textAlign="center">
              <Typography component="h1" variant="h5" gutterBottom>
                Check your email!
              </Typography>

              <Typography>
                Thank you for registering! Please check your email inbox (and spam folder) and click
                on the activation link in the email to complete your registration and activate your
                account.
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  )
}

export default RegisterPage
