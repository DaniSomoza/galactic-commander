import { useCallback, useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded'

import { PlanetType } from 'game-api-microservice/src/types/Planet'
import { PlanetCoordinatesType } from 'game-api-microservice/src/types/Planet'
import { GALAXIES, SECTORS_PER_GALAXIES, SYSTEM_PER_SECTORS } from 'game-engine/src/types/IPlanet'

import { usePlayer } from '../../store/PlayerContext'
import { useGameInfo } from '../../store/GameInfoContext'
import { useTranslations } from '../../store/TranslationContext'
import { useFleet } from '../../store/FleetContext'
import { getGalaxy } from '../../endpoints/game/galaxyEndpoints'
import ActiveFleet from '../../components/active-fleet/ActiveFleet'
import PlanetCard from '../../components/planet-card/PlanetCard'
import Loader from '../../components/loader/Loader'
import formatCoordinatesLabel from '../../utils/formatPlanetCoordinates'

function GameGalaxiesPage() {
  const { translate } = useTranslations()
  const { player, isPlayerLoading, selectedPlanet } = usePlayer()
  const { fleetsInThePlanet, currentPlayerFleets, maxPlayerFleets } = useFleet()
  const { selectedUniverse } = useGameInfo()

  const universeName = selectedUniverse?.name

  const [galaxy, setGalaxy] = useState(selectedPlanet?.coordinates.galaxy || 0)
  const [sector, setSector] = useState(selectedPlanet?.coordinates.sector || 0)
  const [system, setSystem] = useState(selectedPlanet?.coordinates.system || 0)

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

  const hasEnoughFleets = currentPlayerFleets < maxPlayerFleets

  // TODO: onFinish a fleet refresh planets

  if (!player || isPlayerLoading || !selectedPlanet) {
    return <Loader isLoading />
  }

  return (
    <Stack gap={1}>
      {/* TODO: Planet Coordinates selector */}
      <Paper variant="outlined">
        <Box padding={1}>
          <Stack direction={'row'} gap={3} padding={1} justifyContent={'center'}>
            {/* Galaxy selector */}
            <Stack gap={1} justifyContent={'center'}>
              <Stack direction={'row'} gap={0.5} justifyContent={'center'} alignItems={'center'}>
                <Tooltip title={translate('PREVIOUS_GALAXY_SELECTOR', galaxy - 1)}>
                  <IconButton
                    size="small"
                    disabled={galaxy === 1}
                    onClick={() => setGalaxy((galaxy) => galaxy - 1)}
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
                <Tooltip title={translate('NEXT_GALAXY_SELECTOR', galaxy + 1)}>
                  <IconButton
                    size="small"
                    disabled={galaxy === GALAXIES}
                    onClick={() => setGalaxy((galaxy) => galaxy + 1)}
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
                <Tooltip title={translate('PREVIOUS_SECTOR_SELECTOR', sector - 1)}>
                  <IconButton
                    size="small"
                    disabled={sector === 1}
                    onClick={() => setSector((sector) => sector - 1)}
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
                <Tooltip title={translate('NEXT_SECTOR_SELECTOR', sector + 1)}>
                  <IconButton
                    size="small"
                    disabled={sector === SECTORS_PER_GALAXIES}
                    onClick={() => setSector((sector) => sector + 1)}
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
                <Tooltip title={translate('PREVIOUS_SYSTEM_SELECTOR', system - 1)}>
                  <IconButton
                    size="small"
                    disabled={system === 1}
                    onClick={() => setSystem((system) => system - 1)}
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
                <Tooltip title={translate('NEXT_SYSTEM_SELECTOR', system + 1)}>
                  <IconButton
                    size="small"
                    disabled={system === SYSTEM_PER_SECTORS}
                    onClick={() => setSystem((system) => system + 1)}
                  >
                    <NavigateNextRoundedIcon />
                  </IconButton>
                </Tooltip>
              </Stack>

              <Typography variant="body1" textAlign={'center'}>
                System
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Paper>

      <Stack direction={'row'} flexWrap={'wrap'} justifyContent={'center'} gap={1}>
        {planets.map((planet) => {
          const planetLabel = formatCoordinatesLabel(planet.coordinates)

          return (
            <Box key={planetLabel}>
              <Paper>
                <Stack justifyContent="center" alignItems="center">
                  <PlanetCard planet={planet}>
                    {/* Planet Coordinates label */}
                    <Box
                      position={'absolute'}
                      bottom={0}
                      left={'50%'}
                      padding={1}
                      sx={{ transform: 'translateX(-50%)' }}
                    >
                      <Paper variant="outlined">
                        <Tooltip title={translate('GAME_PLAYER_PLANET_COORDINATES_TOOLTIP')} arrow>
                          <Typography
                            variant="body1"
                            fontSize={12}
                            fontWeight={500}
                            padding={0.5}
                            paddingLeft={0.8}
                            paddingRight={0.8}
                          >
                            {formatCoordinatesLabel(planet.coordinates)}
                          </Typography>
                        </Tooltip>
                      </Paper>
                    </Box>

                    {/* Fleet action buttons */}
                    <Box position={'absolute'} right={0} bottom={0} padding={1}>
                      <Paper variant="outlined">
                        <Stack
                          direction={'column'}
                          justifyContent={'flex-start'}
                          alignItems={'center'}
                        >
                          {/* TODO: create fleet button: show create fleet dialog or redirect to create fleet page? */}
                          <Tooltip title={translate('send fleet')}>
                            <IconButton
                              aria-label="send fleet to this planet"
                              size="small"
                              disabled={!planet.isExplored || !hasEnoughFleets}
                              onClick={() => {
                                // fastExplorePlanetFleet(planet.coordinates)
                              }}
                            >
                              <RocketLaunchIcon fontSize="inherit" />
                            </IconButton>
                          </Tooltip>

                          {/* Explore Planet fast button */}
                          <FastExplorePlanetButton planet={planet} />
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

      <Stack gap={1}>
        {fleetsInThePlanet.map((planetFleet) => {
          return (
            <ActiveFleet
              key={planetFleet.taskId}
              fleet={planetFleet}
              onFinishFleet={refreshPlanets}
            />
          )
        })}
      </Stack>
    </Stack>
  )
}

export default GameGalaxiesPage

type FastExplorePlanetButtonProps = {
  planet: PlanetType
}
function FastExplorePlanetButton({ planet }: FastExplorePlanetButtonProps) {
  const { translate } = useTranslations()
  const { selectedPlanet } = usePlayer()
  const { explorePlanetFleet, unitsInThePlanet, currentPlayerFleets, maxPlayerFleets } = useFleet()

  const [disableActions, setDisableActions] = useState(false)

  const amountOfProbesInThePlanet = unitsInThePlanet.reduce(
    (amountOfProbesInThePlanet, { unit, amount }) => {
      if (unit.subtype === 'PROBE') {
        return amountOfProbesInThePlanet + amount
      }
      return amountOfProbesInThePlanet
    },
    0
  )

  const probeUnit = unitsInThePlanet.find(({ unit }) => unit.subtype === 'PROBE')?.unit

  async function fastExplorePlanetFleet(toPlanetCoordinates: PlanetCoordinatesType) {
    if (probeUnit && selectedPlanet) {
      setDisableActions(true)
      const exploreFleet = [{ unitName: probeUnit.name, amount: 1 }]
      await explorePlanetFleet(exploreFleet, selectedPlanet.coordinates, toPlanetCoordinates)
      setDisableActions(false)
      // TODO: show snackbar on success
    }
  }

  const hasEnoughFleets = currentPlayerFleets < maxPlayerFleets

  return (
    // TODO: create a not enough probes available in this planet!
    <Tooltip title={translate('FAST_EXPLORE_PLANET_LABEL', amountOfProbesInThePlanet)}>
      <IconButton
        aria-label="spy planet"
        size="small"
        disabled={!probeUnit || !hasEnoughFleets || disableActions}
        onClick={() => {
          fastExplorePlanetFleet(planet.coordinates)
        }}
      >
        <TravelExploreIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  )
}
