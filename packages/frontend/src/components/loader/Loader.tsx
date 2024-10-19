import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

type LoaderProps = {
  isLoading: boolean
  loadingText?: string
}

function Loader({ isLoading, loadingText }: LoaderProps) {
  if (!isLoading) {
    return null
  }

  return (
    <Box padding={6}>
      <Stack justifyContent="center" spacing={2} alignItems="center">
        <CircularProgress />
        {loadingText && <Typography>{loadingText}</Typography>}
      </Stack>
    </Box>
  )
}

export default Loader
