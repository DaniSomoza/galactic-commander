import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'

import { UnitType } from 'game-api-microservice/src/types/Unit'
import checkUnitRequirements from 'game-engine/src/engine/units/checkUnitRequirements'
import getAmountOfPlayerUnitsInThePlanet from 'game-engine/src/engine/units/getAmountOfPlayerUnitsInThePlanet'

import { usePlayer } from '../../store/PlayerContext'
import { useTranslations } from '../../store/TranslationContext'
import Image from '../../components/image/Image'
import Loader from '../../components/loader/Loader'
import getUnitImage from '../../utils/getUnitImage'
import formatNumber from '../../utils/formatNumber'
import { useBuildUnits } from '../../store/buildUnitsContext'
import UnitStats from '../../components/unit-stats/UnitStats'
import BuildUnitsDialog from '../../components/dialogs/BuildUnitsDialog'
import UnitRequirements from '../../components/unit-requirements/UnitRequirements'
import UnitBonus from '../../components/unit-bonus/UnitBonus'

function GameTroopsPage() {
  const { translate } = useTranslations()

  const [unitToBuild, setUnitToBuild] = useState<UnitType>()

  const { player, isPlayerLoading, selectedPlanet } = usePlayer()

  const { buildTroopsQueue, activeBuildTroopsCountdown, activeBuildTroops } = useBuildUnits()

  console.log('buildTroopsQueue: ', buildTroopsQueue)
  console.log('activeBuildTroopsCountdown: ', activeBuildTroopsCountdown)
  console.log('activeBuildTroops: ', activeBuildTroops)

  const units = player && selectedPlanet ? [...selectedPlanet.units, ...player.race.units] : []

  if (!player || isPlayerLoading || !selectedPlanet) {
    return <Loader isLoading />
  }

  const activeBuildUnits = selectedPlanet.unitBuild.troops.activeBuild

  return (
    <>
      <Stack direction={'column'} gap={2}>
        {units.map((unit) => {
          const { isUnitAvailable, requirements } = checkUnitRequirements(unit, player)

          const troopsInThisPlanet = getAmountOfPlayerUnitsInThePlanet(player, selectedPlanet, unit)

          return (
            <Paper key={unit.name} variant="outlined">
              <Stack direction={'row'}>
                {/* Image Part */}
                <Box>
                  <Box sx={{ position: 'relative' }}>
                    <Stack justifyContent="center" alignItems="center">
                      <Image
                        src={getUnitImage(unit.name)}
                        alt={translate(unit.name)}
                        height={'230px'}
                        width={'230px'}
                        border
                      />

                      {/* Unit name */}
                      <Box
                        position={'absolute'}
                        top={20}
                        padding={1}
                        maxWidth={'230px'}
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
                            {translate(unit.name)}
                          </Typography>
                        </Paper>
                      </Box>

                      {/* Amount of units in this planet */}
                      <Box position={'absolute'} right={0} bottom={0} padding={1}>
                        <Paper variant="outlined">
                          <Stack
                            direction={'row'}
                            alignItems={'center'}
                            padding={0.4}
                            paddingLeft={0}
                            paddingRight={0.8}
                          >
                            {unit.isHero && <MilitaryTechIcon fontSize="small" />}
                            <Tooltip
                              title={translate(
                                'GAME_BUILD_UNITS_PAGE_AMOUNT_OF_UNITS_IN_PLANET_TOOLTIP',
                                formatNumber(troopsInThisPlanet, true)
                              )}
                              arrow
                            >
                              <Typography
                                paddingLeft={unit.isHero ? 0 : 0.8}
                                variant="body1"
                                fontSize={13}
                                fontWeight={500}
                              >
                                {formatNumber(troopsInThisPlanet)}
                              </Typography>
                            </Tooltip>
                          </Stack>
                        </Paper>
                      </Box>
                    </Stack>
                  </Box>

                  <Box maxWidth={'230px'}>
                    <Typography fontSize={12} padding={0.5}>
                      {translate(unit.description)}
                    </Typography>
                  </Box>
                </Box>

                <Stack padding={1} flexGrow={1} gap={1}>
                  <Stack direction={'row'} gap={1}>
                    {/* Stats Part */}
                    <Box flexBasis={'70%'}>
                      <UnitStats unit={unit} player={player} />
                    </Box>
                  </Stack>

                  <Stack direction={'row'} gap={1} justifyContent={'center'}>
                    {/* Requirements Part */}
                    <Box flexGrow={1}>
                      <UnitRequirements requirements={requirements} />
                    </Box>

                    <Box flexGrow={1}>
                      {/* Unit bonus */}
                      <UnitBonus bonus={unit.bonus} />
                    </Box>
                  </Stack>

                  <Stack
                    flexGrow={1}
                    direction={'row'}
                    justifyContent={'flex-end'}
                    alignItems={'flex-end'}
                    gap={1}
                    paddingTop={1}
                  >
                    <Button variant="outlined" size="small">
                      {translate('GAME_BUILD_UNITS_PAGE_BUILD_UNITS_SCHEDULE_BUTTON')}
                    </Button>

                    {activeBuildUnits ? (
                      <Button variant="contained" size="small" onClick={() => setUnitToBuild(unit)}>
                        {translate('GAME_BUILD_UNITS_PAGE_BUILD_UNITS_QUEUE_BUTTON')}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        disabled={!isUnitAvailable}
                        onClick={() => setUnitToBuild(unit)}
                      >
                        {translate('GAME_BUILD_UNITS_PAGE_START_BUILD_UNITS_BUTTON')}
                      </Button>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
          )
        })}
      </Stack>

      {unitToBuild && (
        <BuildUnitsDialog
          unitToBuild={unitToBuild}
          setUnitToBuild={setUnitToBuild}
          isOpen={!!unitToBuild}
        />
      )}
    </>
  )
}

export default GameTroopsPage
