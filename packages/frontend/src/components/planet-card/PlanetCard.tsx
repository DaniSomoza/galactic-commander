import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import { green, orange } from '@mui/material/colors'

import { PlanetType } from 'game-api-microservice/src/types/Planet'
import formatCoordinatesLabel from '../../utils/formatPlanetCoordinates'
import Image from '../image/Image'
import { useTranslations } from '../../store/TranslationContext'

type PlanetCardProps = {
  disableBorder?: boolean
  planet: PlanetType
  height?: number
  width?: number
  children?: JSX.Element | JSX.Element[]
}

function PlanetCard({ disableBorder = false, planet, children }: PlanetCardProps) {
  const { translate } = useTranslations()

  const planetLabel = formatCoordinatesLabel(planet.coordinates)

  return (
    <Box key={planetLabel} sx={{ position: 'relative' }}>
      <Paper variant={disableBorder ? 'elevation' : 'outlined'}>
        <Stack justifyContent="center" alignItems="center">
          <Image
            src={planet.imgUrl}
            alt={planet.name}
            height={'200px'}
            width={'200px'}
            border={!disableBorder}
            disabled={!planet.isExplored}
          />

          {/* Planet name */}
          {planet.isExplored && (
            <Box
              position={'absolute'}
              top={20}
              maxWidth={200}
              sx={{ transform: 'translate(0, -50%)' }}
            >
              <Paper variant="outlined">
                <Stack
                  direction={'row'}
                  gap={0.5}
                  padding={0.4}
                  paddingLeft={0.6}
                  paddingRight={0.8}
                  alignItems={'center'}
                >
                  {/* {unit.isHero && <StarsIcon fontSize="small" color="info" />} */}
                  {/* TODO: isSpecial Planet! */}
                  <Typography variant="body1" fontSize={12}>
                    {planet.name}
                  </Typography>
                </Stack>
              </Paper>
            </Box>
          )}

          {/* Planet resource quality */}
          {planet.isExplored && (
            <Box position={'absolute'} left={0} bottom={0} padding={1}>
              <Paper variant="outlined">
                <Tooltip
                  title={translate(
                    'GAME_PLAYER_PLANET_RESOURCE_QUALITY_TOOLTIP',
                    planet.resourceQuality || 0
                  )}
                  arrow
                >
                  <Typography
                    variant="body1"
                    fontSize={12}
                    fontWeight={500}
                    color={planet.resourceQuality > 50 ? green[600] : orange[600]}
                    padding={0.4}
                  >
                    {planet.resourceQuality}%
                  </Typography>
                </Tooltip>
              </Paper>
            </Box>
          )}

          {children}
        </Stack>
      </Paper>
    </Box>
  )
}

export default PlanetCard
