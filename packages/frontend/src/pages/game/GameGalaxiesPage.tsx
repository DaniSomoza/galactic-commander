import { useCallback, useEffect, useState } from 'react'
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
import { useTranslations } from '../../store/TranslationContext'
import { useFleet } from '../../store/FleetContext'
import Fleet from '../../components/fleet/Fleet'
import PlanetCard from '../../components/planet-card/PlanetCard'

function GameGalaxiesPage() {
  const { translate } = useTranslations()
  const { player, isPlayerLoading, selectedPlanet } = usePlayer()
  const { explorePlanetFleet, unitsInThePlanet, fleetsInThePlanet } = useFleet()
  const { selectedUniverse } = useGameInfo()

  const universeName = selectedUniverse?.name

  const [galaxy, setGalaxy] = useState(selectedPlanet?.coordinates.galaxy)
  const [sector, setSector] = useState(selectedPlanet?.coordinates.sector)
  const [system, setSystem] = useState(selectedPlanet?.coordinates.system)

  const [planets, setPlanets] = useState<PlanetType[]>([])

  useEffect(() => {
    if (selectedPlanet) {
      setGalaxy((galaxy) => galaxy || selectedPlanet.coordinates.galaxy)
      setSector((sector) => sector || selectedPlanet.coordinates.sector)
      setSystem((system) => system || selectedPlanet.coordinates.system)
    }
  }, [selectedPlanet])

  const refreshPlanets = useCallback(async () => {
    if (universeName && galaxy && sector && system) {
      const {
        data: { planets }
      } = await getGalaxy(galaxy, sector, system, universeName)

      setPlanets(planets)
    }
  }, [galaxy, sector, system, universeName])

  useEffect(() => {
    refreshPlanets()
  }, [refreshPlanets])

  // TODO: onFinish a fleet refresh planets

  if (!player || isPlayerLoading || !selectedPlanet) {
    return <Loader isLoading />
  }

  const probeUnit = unitsInThePlanet.find(({ unit }) => unit.subtype === 'PROBE')?.unit
  // TODO: ADD amount of fleets available to check if its disabled or not

  async function fastExplorePlanetFleet(toPlanetCoordinates: PlanetCoordinatesType) {
    // TODO: add loading state
    if (probeUnit && selectedPlanet) {
      const exploreFleet = [{ unitName: probeUnit.name, amount: 1 }]
      await explorePlanetFleet(exploreFleet, selectedPlanet.coordinates, toPlanetCoordinates)
    }
  }

  return (
    <Stack gap={1} padding={1}>
      {/* TODO: ALL fleets, update this to only use new fleets */}
      <Stack gap={1}>
        {fleetsInThePlanet.map((planetFleet, index) => {
          return <Fleet key={index} fleet={planetFleet} onFinishFleet={refreshPlanets} />
        })}
      </Stack>

      {/* TODO: Planet Coordinates selector */}
      <Paper variant="outlined">
        <Box padding={1}>
          <Stack direction={'row'} gap={3} padding={1}>
            {/* Galaxy selector */}
            <Stack gap={1} justifyContent={'center'}>
              <Stack direction={'row'} gap={0.5} justifyContent={'center'} alignItems={'center'}>
                <Tooltip title={translate('PREVIOUS_GALAXY_SELECTOR')}>
                  <IconButton
                    size="small"
                    disabled={!probeUnit}
                    onClick={() => setGalaxy((galaxy) => galaxy! - 1)}
                  >
                    <NavigateBeforeRoundedIcon />
                  </IconButton>
                </Tooltip>
                <Paper variant="outlined">
                  <Typography
                    variant="body1"
                    textAlign={'center'}
                    padding={1}
                    paddingLeft={2}
                    paddingRight={2}
                  >
                    {galaxy}
                  </Typography>
                </Paper>
                <Tooltip title={translate('NEXT_GALAXY_SELECTOR')}>
                  <IconButton
                    size="small"
                    disabled={!probeUnit}
                    onClick={() => setGalaxy((galaxy) => galaxy! + 1)}
                  >
                    <NavigateNextRoundedIcon />
                  </IconButton>
                </Tooltip>
              </Stack>

              <Typography variant="body1" textAlign={'center'}>
                Galaxy
              </Typography>
            </Stack>

            {/* Sector selector */}
            <Stack gap={1} justifyContent={'center'}>
              <Stack direction={'row'} gap={0.5} justifyContent={'center'} alignItems={'center'}>
                <Tooltip title={translate('PREVIOUS_SECTOR_SELECTOR')}>
                  <IconButton
                    size="small"
                    disabled={!probeUnit}
                    onClick={() => setSector((sector) => sector! - 1)}
                  >
                    <NavigateBeforeRoundedIcon />
                  </IconButton>
                </Tooltip>
                <Paper variant="outlined">
                  <Typography
                    variant="body1"
                    textAlign={'center'}
                    padding={1}
                    paddingLeft={2}
                    paddingRight={2}
                  >
                    {sector}
                  </Typography>
                </Paper>
                <Tooltip title={translate('NEXT_SECTOR_SELECTOR')}>
                  <IconButton
                    size="small"
                    disabled={!probeUnit}
                    onClick={() => setSector((sector) => sector! + 1)}
                  >
                    <NavigateNextRoundedIcon />
                  </IconButton>
                </Tooltip>
              </Stack>

              <Typography variant="body1" textAlign={'center'}>
                Sector
              </Typography>
            </Stack>

            {/* System selector */}
            <Stack gap={1} justifyContent={'center'}>
              <Stack direction={'row'} gap={0.5} justifyContent={'center'} alignItems={'center'}>
                <Tooltip title={translate('PREVIOUS_SYSTEM_SELECTOR')}>
                  <IconButton
                    size="small"
                    disabled={!probeUnit}
                    onClick={() => setSystem((system) => system! - 1)}
                  >
                    <NavigateBeforeRoundedIcon />
                  </IconButton>
                </Tooltip>
                <Paper variant="outlined">
                  <Typography
                    variant="body1"
                    textAlign={'center'}
                    padding={1}
                    paddingLeft={2}
                    paddingRight={2}
                  >
                    {system}
                  </Typography>
                </Paper>
                <Tooltip title={translate('NEXT_SYSTEM_SELECTOR')}>
                  <IconButton
                    size="small"
                    disabled={!probeUnit}
                    onClick={() => setSystem((system) => system! + 1)}
                  >
                    <NavigateNextRoundedIcon />
                  </IconButton>
                </Tooltip>
              </Stack>

              <Typography variant="body1" textAlign={'center'}>
                System
              </Typography>
            </Stack>

            {/* TODO: SHOW SPY PROBES AVAILABLE IN THE PLANET!! */}
          </Stack>
        </Box>
      </Paper>

      <Stack direction={'row'} flexWrap={'wrap'} justifyContent={'center'} gap={1}>
        {planets.map((planet) => {
          const planetLabel = formatCoordinatesLabel(planet.coordinates)

          return (
            <Box key={planetLabel}>
              <Paper variant={'outlined'}>
                <Stack justifyContent="center" alignItems="center">
                  <PlanetCard planet={planet} disableBorder>
                    {/* Fleet action buttons */}
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
                  </PlanetCard>
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
