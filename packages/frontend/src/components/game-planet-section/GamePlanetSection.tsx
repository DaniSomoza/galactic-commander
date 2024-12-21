import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import { green } from '@mui/material/colors'

import Image from '../image/Image'
import formatNumber from '../../utils/formatNumber'
import { usePlayer } from '../../store/PlayerContext'
import { useTranslations } from '../../store/TranslationContext'
import formatCoordinatesLabel from '../../utils/formatPlanetCoordinates'
import { usePlayerResources } from '../../store/PlayerResourcesContext'

function GamePlanetSection() {
  const { translate } = useTranslations()
  const { player, isPlayerLoading } = usePlayer()
  const { resources } = usePlayerResources()

  const isLoading = isPlayerLoading || !player

  return (
    <Paper variant="outlined" sx={{ position: 'relative' }}>
      <Stack justifyContent="center" alignItems="center">
        {isLoading ? (
          <Skeleton variant="rounded" height={'200px'} width={'200px'} />
        ) : (
          <Image
            src={player.planets.principal.imgUrl}
            alt="player planet image"
            height={'200px'}
            width={'200px'}
            border
          />
        )}

        {/* planet name */}
        <Box
          position={'absolute'}
          top={24}
          padding={1}
          maxWidth={'164px'}
          sx={{ transform: 'translate(0, -50%)' }}
        >
          {isLoading ? (
            <Box>
              <Skeleton variant="rounded" width={'120px'} />
            </Box>
          ) : (
            <Paper variant="outlined">
              <Typography
                variant="body1"
                fontSize={12}
                fontWeight={500}
                padding={0.4}
                paddingLeft={0.8}
                paddingRight={0.8}
                overflow={'hidden'}
                textOverflow="ellipsis"
              >
                {/* TODO: implement change planet name endpoint */}
                {player.planets.principal.name}
              </Typography>
            </Paper>
          )}
        </Box>

        <Box position={'absolute'} left={0} bottom={0} padding={1}>
          <Stack spacing={0.5} alignItems="center">
            {isLoading ||
            (player && !resources[formatCoordinatesLabel(player.planets.principal.coordinates)]) ? (
              <Box>
                <Skeleton variant="rounded" width={42} />
              </Box>
            ) : (
              <Paper variant="outlined">
                <Tooltip
                  title={translate(
                    'GAME_PLAYER_PLANET_RESOURCES_TOOLTIP',
                    formatNumber(
                      resources[formatCoordinatesLabel(player.planets.principal.coordinates)],
                      true
                    )
                  )}
                  arrow
                >
                  <Typography
                    variant="body1"
                    fontSize={12}
                    fontWeight={500}
                    color={green[600]}
                    padding={0.4}
                  >
                    {formatNumber(
                      resources[formatCoordinatesLabel(player.planets.principal.coordinates)]
                    )}
                  </Typography>
                </Tooltip>
              </Paper>
            )}
          </Stack>
        </Box>

        <Box position={'absolute'} bottom={0} padding={1}>
          {isLoading ? (
            <Box>
              <Skeleton variant="rounded" width={72} />
            </Box>
          ) : (
            <Paper variant="outlined">
              <Tooltip title={translate('GAME_PLAYER_PLANET_COORDINATES_TOOLTIP')} arrow>
                <Typography
                  variant="body1"
                  fontSize={12}
                  fontWeight={500}
                  padding={0.4}
                  paddingLeft={0.8}
                  paddingRight={0.8}
                >
                  {formatCoordinatesLabel(player.planets.principal.coordinates)}
                </Typography>
              </Tooltip>
            </Paper>
          )}
        </Box>

        <Box position={'absolute'} right={0} bottom={0} padding={1}>
          {isLoading ? (
            <Box>
              <Skeleton variant="rounded" width={32} />
            </Box>
          ) : (
            <Paper variant="outlined">
              <Tooltip
                title={translate(
                  'GAME_PLAYER_PLANET_RESOURCE_QUALITY_TOOLTIP',
                  player.planets.principal.resourceQuality || 0
                )}
                arrow
              >
                <Typography
                  variant="body1"
                  fontSize={12}
                  fontWeight={500}
                  color={green[600]}
                  padding={0.4}
                >
                  {player.planets.principal.resourceQuality}%
                </Typography>
              </Tooltip>
            </Paper>
          )}
        </Box>
      </Stack>
    </Paper>
  )
}

export default GamePlanetSection
