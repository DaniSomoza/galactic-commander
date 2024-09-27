import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { activateUser } from '../endpoints/auth/authEndpoints'
import { LOGIN_PATH, REGISTER_PATH } from '../routes/routes'

function ActivateUserPage() {
  const [queryParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const userActivation = async () => {
      const activationCode = queryParams.get('activationCode')

      if (activationCode) {
        try {
          await activateUser(activationCode)
          navigate(LOGIN_PATH)
          return
        } catch {
          navigate(REGISTER_PATH)
          return
        }
      }

      navigate(LOGIN_PATH)
    }

    userActivation()
  }, [queryParams, navigate])

  return (
    <Container component="main" maxWidth="xs" disableGutters>
      <Box component="section" marginTop={4} textAlign="center">
        <CircularProgress />

        <Typography>Activating your account...</Typography>
      </Box>
    </Container>
  )
}

export default ActivateUserPage
