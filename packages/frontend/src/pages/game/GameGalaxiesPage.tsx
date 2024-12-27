import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import VisibilityIcon from '@mui/icons-material/Visibility'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'

import { PlanetType } from 'game-api-microservice/src/types/Planet'

import { usePlayer } from '../../store/PlayerContext'
import Loader from '../../components/loader/Loader'
import formatCoordinatesLabel from '../../utils/formatPlanetCoordinates'
import { getGalaxy } from '../../endpoints/game/galaxyEndpoints'
import { useGameInfo } from '../../store/GameInfoContext'
import Image from '../../components/image/Image'
import { useTranslations } from '../../store/TranslationContext'

function GameGalaxiesPage() {
  const { translate } = useTranslations()
  const { player, isPlayerLoading, selectedPlanet } = usePlayer()
  const { selectedUniverse } = useGameInfo()

  // TODO: setState with galaxy, sector and system

  const [galaxy, setGalaxy] = useState<number>(selectedPlanet?.coordinates.galaxy || 1)
  const [sector, setSector] = useState<number>(selectedPlanet?.coordinates.sector || 1)
  const [system, setSystem] = useState<number>(selectedPlanet?.coordinates.system || 1)

  const [planets, setPlanets] = useState<PlanetType[]>([])

  useEffect(() => {
    async function callGetPlanets() {
      if (selectedUniverse) {
        const {
          data: { planets }
        } = await getGalaxy(galaxy, sector, system, selectedUniverse.name)

        setPlanets(planets)
      }
    }

    callGetPlanets()
  }, [galaxy, sector, system, selectedUniverse])

  if (!player || isPlayerLoading || !selectedPlanet) {
    return <Loader isLoading />
  }

  return (
    <Stack gap={1} padding={1}>
      {/* TODO: Planet Coordinates selector */}
      <Paper variant="outlined">
        <Box padding={1}>Planet Coordinates selector</Box>
      </Paper>

      <Stack direction={'row'} flexWrap={'wrap'} justifyContent={'center'} gap={1}>
        {planets.map((planet) => {
          const planetLabel = formatCoordinatesLabel(planet.coordinates)

          console.log('planetLabel: ', planetLabel)
          console.log('planet: ', planet)

          return (
            <Box key={planetLabel} sx={{ position: 'relative' }}>
              <Paper variant={'outlined'}>
                <Stack justifyContent="center" alignItems="center">
                  {/* TODO: create planet card */}
                  <Image
                    src={planet.imgUrl}
                    alt={planet.name}
                    height={'200px'}
                    width={'200px'}
                    border
                  />

                  {/* Planet name */}
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
                        {/* TODO: isSpecial */}
                        <Typography variant="body1" fontSize={12}>
                          {planet.name}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Box>

                  {/* Action buttons */}
                  <Box position={'absolute'} right={0} bottom={0} padding={1}>
                    <Paper variant="outlined">
                      <Stack
                        direction={'row'}
                        padding={0.2}
                        justifyContent={'flex-start'}
                        alignItems={'center'}
                      >
                        {/* fleet button */}
                        {/* TODO: disable button if no units are present */}
                        {/* TODO: disable button if max number of active player fleets */}
                        {/* TODO: disable button if it is the selected planet ?? */}
                        {/* TODO: redirect to create new fleet page */}
                        <Tooltip title="send fleet">
                          <IconButton aria-label="spy planet" size="small">
                            <RocketLaunchIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>

                        {/* Explore Planet fast button */}
                        {/* TODO: disable button if no probes are present */}
                        {/* TODO: disable button if max number of active player fleets */}
                        {/* TODO: disable button if it is the selected planet ?? */}
                        {/* TODO: disable button if users clicks on it! */}
                        <Tooltip title="spy/explore planet">
                          <IconButton aria-label="spy planet" size="small">
                            <VisibilityIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Paper>
                  </Box>
                </Stack>
              </Paper>
            </Box>
          )
        })}
      </Stack>
    </Stack>
  )
}

export default GameGalaxiesPage
