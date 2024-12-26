import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
// import Typography from '@mui/material/Typography'
// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'

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

  const [planets, setPlanets] = useState<PlanetType[]>([])

  const selectedPlanetLabel = selectedPlanet
    ? formatCoordinatesLabel(selectedPlanet.coordinates)
    : ''

  useEffect(() => {
    async function callGetPlanets() {
      if (selectedPlanetLabel && selectedPlanet && selectedUniverse) {
        const { galaxy, sector, system } = selectedPlanet.coordinates
        const {
          data: { planets }
        } = await getGalaxy(galaxy, sector, system, selectedUniverse.name)

        setPlanets(planets)
      }
    }

    callGetPlanets()

    // TODO: call to get galaxy view
  }, [selectedPlanetLabel])

  if (!player || isPlayerLoading || !selectedPlanet) {
    return <Loader isLoading />
  }

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Game Galaxies Page</h1>

      {/* TODO: Planet Coordinates selector */}

      <Stack direction={'row'} flexWrap={'wrap'} maxWidth={'620px'} gap={1}>
        {planets.map((planet) => {
          const planetLabel = formatCoordinatesLabel(planet.coordinates)

          console.log('planetLabel: ', planetLabel)
          console.log('planet: ', planet)

          return (
            <Paper key={planetLabel}>
              <Image
                // src={getImage(planet.name)}
                src={planet.imgUrl}
                alt={translate(planet.name)}
                height={'200px'}
                width={'200px'}
                border
              />
            </Paper>
          )
        })}
      </Stack>
    </>
  )
}

export default GameGalaxiesPage
