import { styled } from '@mui/material/styles'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Skeleton from '@mui/material/Skeleton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'

import formatCoordinatesLabel from '../../utils/formatPlanetCoordinates'
import { usePlayer } from '../../store/PlayerContext'
import Image from '../image/Image'

const SelectorInput = styled(OutlinedInput)(() => ({
  '& .MuiInputBase-input': {
    padding: '0'
  }
}))

function PlanetSelector() {
  const { selectedPlanet } = usePlayer()

  // TODO: SelectChangeEvent<any>
  const handleChange = (event: SelectChangeEvent) => {
    const { value } = event.target

    console.log('value: ', value)
  }

  return (
    <Paper sx={{ height: '32px' }}>
      <Select
        id="select-planet-selector"
        value={'planet 1'}
        onChange={handleChange}
        input={<SelectorInput id="select-planet-input" />}
        renderValue={() => (
          <Stack direction={'row'} spacing={1} alignItems="center">
            {selectedPlanet ? (
              <Image
                src={selectedPlanet.imgUrl}
                alt="player planet image"
                height={'32px'}
                width={'32px'}
                border
              />
            ) : (
              <Skeleton variant="rounded" width={32} height={32} />
            )}
            <Paper variant="outlined" style={{ marginRight: '4px' }}>
              <Typography
                variant="body1"
                fontSize={12}
                fontWeight={500}
                padding={0.1}
                paddingLeft={0.8}
                paddingRight={0.8}
              >
                {selectedPlanet ? (
                  formatCoordinatesLabel(selectedPlanet.coordinates)
                ) : (
                  <Skeleton variant="text" width={50} />
                )}
              </Typography>
            </Paper>
          </Stack>
        )}
      >
        <MenuItem value={'planet 1'}>{'planet 1'}</MenuItem>
        <MenuItem value={'planet 2'}>{'planet 2'}</MenuItem>
        <MenuItem value={'planet 3'}>{'planet 3'}</MenuItem>
      </Select>
    </Paper>
  )
}

export default PlanetSelector
