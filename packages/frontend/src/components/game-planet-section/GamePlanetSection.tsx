import { useCallback, useState } from 'react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import { green } from '@mui/material/colors'

import calculateResourceProductionBonus from 'game-engine/src/engine/resources/calculateResourceProduction'
import getSecond from 'game-engine/src/helpers/getSecond'
import applyBonus from 'game-engine/src/helpers/applyBonus'

import formatNumber from '../../utils/formatNumber'
import usePolling from '../../hooks/usePolling'
import { usePlayer } from '../../store/PlayerContext'
import formatCoordinatesLabel from '../../utils/formatPlanetCoordinates'
import Image from '../image/Image'

// TODO: rename this to PlanetSelectorCard
function GamePlanetSection() {
  const [resources, setResources] = useState(0)

  const { player } = usePlayer()

  const planet = player?.planets.principal
  const owner = player

  const {
    resources: actualPlanetResources,
    lastResourceProductionTime,
    resourceQuality
  } = planet || {}

  const productionBonus = owner?.bonus
    ? applyBonus(owner.bonus, 'resourceProductionBonus', true)
    : undefined

  const updatePlanetResources = useCallback(() => {
    const actualSecond = getSecond(Date.now())

    setResources(
      calculateResourceProductionBonus(
        actualSecond,
        actualPlanetResources || 0,
        lastResourceProductionTime || actualSecond,
        resourceQuality || 0,
        productionBonus
      )
    )
  }, [actualPlanetResources, lastResourceProductionTime, resourceQuality, productionBonus])

  usePolling(updatePlanetResources)

  return (
    <Paper variant="outlined" sx={{ position: 'relative' }}>
      <Stack justifyContent="center" alignItems="center">
        {planet ? (
          <Image
            src={planet.imgUrl}
            // TODO: create proper alt image
            alt="player planet image"
            height={'200px'}
            width={'200px'}
            border
          />
        ) : (
          <Skeleton variant="rounded" width={200} height={200} />
        )}
        <Box
          position={'absolute'}
          top={24}
          padding={1}
          maxWidth={'164px'}
          sx={{ transform: 'translate(0, -50%)' }}
        >
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
              {planet ? planet.name : <Skeleton variant="text" width={130} />}
            </Typography>
          </Paper>
        </Box>

        <Box position={'absolute'} left={0} bottom={0} padding={1}>
          <Stack spacing={0.5} alignItems="center">
            <Paper variant="outlined">
              <Tooltip title={`Resources in this planet: ${formatNumber(resources, true)}`} arrow>
                <Typography
                  variant="body1"
                  fontSize={12}
                  fontWeight={500}
                  color={green[600]}
                  padding={0.4}
                >
                  {resources ? formatNumber(resources) : <Skeleton variant="text" width={32} />}
                </Typography>
              </Tooltip>
            </Paper>
          </Stack>
        </Box>

        <Box position={'absolute'} bottom={0} padding={1}>
          <Paper variant="outlined">
            <Tooltip title={'go to Galaxies'} arrow>
              <Typography
                variant="body1"
                fontSize={12}
                fontWeight={500}
                padding={0.4}
                paddingLeft={0.8}
                paddingRight={0.8}
              >
                {planet?.coordinates ? (
                  formatCoordinatesLabel(planet?.coordinates)
                ) : (
                  <Skeleton variant="text" width={24} />
                )}
              </Typography>
            </Tooltip>
          </Paper>
        </Box>

        <Box position={'absolute'} right={0} bottom={0} padding={1}>
          <Paper variant="outlined">
            <Tooltip title={'planet resource quality'} arrow>
              <Typography
                variant="body1"
                fontSize={12}
                fontWeight={500}
                color={green[600]}
                padding={0.4}
              >
                {planet ? `${planet.resourceQuality}%` : <Skeleton variant="text" width={28} />}
              </Typography>
            </Tooltip>
          </Paper>
        </Box>
      </Stack>
    </Paper>
  )
}

export default GamePlanetSection
