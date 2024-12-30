import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import PublicIcon from '@mui/icons-material/Public'
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded'

import { PlanetType } from 'game-api-microservice/src/types/Planet'
import { PlanetCoordinatesType } from 'game-api-microservice/src/types/Planet'

import { usePlayer } from '../../store/PlayerContext'
import Loader from '../../components/loader/Loader'
import formatCoordinatesLabel from '../../utils/formatPlanetCoordinates'
import { getGalaxy } from '../../endpoints/game/galaxyEndpoints'
import { useGameInfo } from '../../store/GameInfoContext'
import Image from '../../components/image/Image'
import { useTranslations } from '../../store/TranslationContext'
import { useFleet } from '../../store/FleetContext'
import Fleet from '../../components/fleet/Fleet'

function GameGalaxiesPage() {
  const { translate } = useTranslations()
  const { player, isPlayerLoading, selectedPlanet } = usePlayer()
  const { explorePlanetFleet, unitsInThePlanet, fleetsInThePlanet } = useFleet()
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

  const probeUnit = unitsInThePlanet.find(({ unit }) => unit.subtype === 'PROBE')?.unit

  function fastExplorePlanetFleet(toPlanetCoordinates: PlanetCoordinatesType) {
    // TODO: loading state
    if (probeUnit && selectedPlanet) {
      const exploreFleet = [{ unitName: probeUnit.name, amount: 1 }]
      explorePlanetFleet(exploreFleet, selectedPlanet.coordinates, toPlanetCoordinates)
    }
  }

  console.log('@@@ fleetsInThePlanet: ', fleetsInThePlanet)

  return (
    <Stack gap={1} padding={1}>
      {/* TODO: ALL fleets, update this to only use new fleets */}
      <Stack gap={1}>
        {fleetsInThePlanet.map((planetFleet, index) => {
          return <Fleet key={index} fleet={planetFleet} />
        })}
      </Stack>

      {/* TODO: Planet Coordinates selector */}
      <Paper variant="outlined">
        <Box padding={1}>
          <Stack direction={'row'} gap={3} padding={1}>
            <Stack direction={'row'}>
              <Tooltip title={translate('spy/explore planet')}>
                <IconButton
                  aria-label="next"
                  size="small"
                  disabled={!probeUnit}
                  onClick={() => setGalaxy((galaxy) => galaxy - 1)}
                >
                  <NavigateBeforeRoundedIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>

              <Stack gap={0.5}>
                <Paper variant="outlined">{galaxy}</Paper>
                <Typography variant="body1" fontSize={12} textAlign={'center'}>
                  Galaxy
                </Typography>
              </Stack>

              <Tooltip title={translate('spy/explore planet')}>
                <IconButton
                  aria-label="next"
                  size="small"
                  disabled={!probeUnit}
                  onClick={() => setGalaxy((galaxy) => galaxy + 1)}
                >
                  <NavigateNextRoundedIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Stack>

            <Stack direction={'row'}>
              <Tooltip title={translate('spy/explore planet')}>
                <IconButton
                  aria-label="next"
                  size="small"
                  disabled={!probeUnit}
                  onClick={() => setSector((sector) => sector - 1)}
                >
                  <NavigateBeforeRoundedIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>

              <Stack gap={0.5}>
                <Paper variant="outlined">{sector}</Paper>
                <Typography variant="body1" fontSize={12} textAlign={'center'}>
                  Sector
                </Typography>
              </Stack>

              <Tooltip title={translate('spy/explore planet')}>
                <IconButton
                  aria-label="next"
                  size="small"
                  disabled={!probeUnit}
                  onClick={() => setSector((sector) => sector + 1)}
                >
                  <NavigateNextRoundedIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Stack>

            <Stack direction={'row'}>
              <Tooltip title={translate('spy/explore planet')}>
                <IconButton
                  aria-label="next"
                  size="small"
                  disabled={!probeUnit}
                  onClick={() => setSystem((system) => system - 1)}
                >
                  <NavigateBeforeRoundedIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>

              <Stack gap={0.5}>
                <Paper variant="outlined">{system}</Paper>
                <Typography variant="body1" fontSize={12} textAlign={'center'}>
                  System
                </Typography>
              </Stack>

              <Tooltip title={translate('spy/explore planet')}>
                <IconButton
                  aria-label="next"
                  size="small"
                  disabled={!probeUnit}
                  onClick={() => setSystem((system) => system + 1)}
                >
                  <NavigateNextRoundedIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Box>
      </Paper>

      <Stack direction={'row'} flexWrap={'wrap'} justifyContent={'center'} gap={1}>
        {planets.map((planet) => {
          const planetLabel = formatCoordinatesLabel(planet.coordinates)

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

                        {/* Planet Colony fast button */}
                        {/* TODO: disable button if no troops and ships are present */}
                        {/* TODO: disable button if max number of colonies */}
                        {/* TODO: disable button if it is a unexplored planet and has an owner ?? */}
                        {/* TODO: disable button if users clicks on it! */}
                        <Tooltip title="Colony planet">
                          <IconButton
                            aria-label="colony planet"
                            size="small"
                            // disabled={!probeUnit}
                            // onClick={() => fastExplorePlanetFleet(planet.coordinates)}
                          >
                            <PublicIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>

                        {/* Explore Planet fast button */}
                        {/* TODO: disable button if no probes are present */}
                        {/* TODO: disable button if max number of active player fleets */}
                        {/* TODO: disable button if it is the selected planet ?? */}
                        {/* TODO: disable button if users clicks on it! */}
                        <Tooltip title={translate('spy/explore planet')}>
                          <IconButton
                            aria-label="spy planet"
                            size="small"
                            disabled={!probeUnit}
                            onClick={() => fastExplorePlanetFleet(planet.coordinates)}
                          >
                            <TravelExploreIcon fontSize="inherit" />
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
