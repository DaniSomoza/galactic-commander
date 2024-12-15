import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import StarsIcon from '@mui/icons-material/Stars'
import GroupIcon from '@mui/icons-material/Group'

import { UnitType } from 'game-api-microservice/src/types/Unit'
import checkUnitRequirements from 'game-engine/src/engine/units/checkUnitRequirements'
import getAmountOfPlayerUnitsInThePlanet from 'game-engine/src/engine/units/getAmountOfPlayerUnitsInThePlanet'

import { usePlayer } from '../../store/PlayerContext'
import { useTranslations } from '../../store/TranslationContext'
import Image from '../../components/image/Image'
import Loader from '../../components/loader/Loader'
import formatNumber from '../../utils/formatNumber'
import UnitStats from '../../components/unit-stats/UnitStats'
import BuildUnitsDialog from '../../components/dialogs/BuildUnitsDialog'
import UnitRequirements from '../../components/unit-requirements/UnitRequirements'
import UnitBonus from '../../components/unit-bonus/UnitBonus'
import getImage from '../../utils/getImage'
import BuildUnitsQueue from '../../components/build-units-queue/BuildUnitsQueue'

function GameTroopsPage() {
  const { translate } = useTranslations()

  const [unitToBuild, setUnitToBuild] = useState<UnitType>()

  const { player, isPlayerLoading, selectedPlanet } = usePlayer()

  const units = player && selectedPlanet ? [...selectedPlanet.units, ...player.race.units] : []

  if (!player || isPlayerLoading || !selectedPlanet) {
    return <Loader isLoading />
  }

  const activeBuildUnits = selectedPlanet.unitBuild.troops.activeBuild

  return (
    <>
      <BuildUnitsQueue unitType={'TROOP'} />

      <Stack direction={'column'} gap={2} marginTop={1}>
        {units.map((unit) => {
          const unitRequirements = checkUnitRequirements(unit, player)

          const troopsInThisPlanet = getAmountOfPlayerUnitsInThePlanet(player, selectedPlanet, unit)

          return (
            <Paper key={unit.name} variant="outlined">
              <Stack direction={'row'}>
                {/* Image Part */}
                <Box>
                  <Box sx={{ position: 'relative' }}>
                    <Stack justifyContent="center" alignItems="center">
                      <Image
                        src={getImage(unit.name)}
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
                          <Stack
                            direction={'row'}
                            gap={0.5}
                            padding={0.4}
                            paddingLeft={0.6}
                            paddingRight={0.8}
                            alignItems={'center'}
                          >
                            {unit.isHero && <StarsIcon fontSize="small" color="info" />}
                            <Typography variant="body1" fontSize={13}>
                              {translate(unit.name)}
                            </Typography>
                          </Stack>
                        </Paper>
                      </Box>

                      {/* Amount of units in this planet */}
                      <Box position={'absolute'} right={0} bottom={0} padding={1}>
                        <Paper variant="outlined">
                          <Tooltip
                            title={translate(
                              'GAME_BUILD_UNITS_PAGE_AMOUNT_OF_UNITS_IN_PLANET_TOOLTIP',
                              formatNumber(troopsInThisPlanet, true)
                            )}
                            arrow
                          >
                            <Stack
                              direction={'row'}
                              gap={0.5}
                              padding={0.4}
                              paddingLeft={0.6}
                              paddingRight={0.8}
                              alignItems={'center'}
                            >
                              <GroupIcon fontSize="small" />
                              <Typography fontSize={13}>
                                {formatNumber(troopsInThisPlanet, true)}
                              </Typography>
                            </Stack>
                          </Tooltip>
                        </Paper>
                      </Box>
                    </Stack>
                  </Box>

                  <Box padding={1} paddingRight={0}>
                    <Paper variant="outlined">
                      <Typography maxWidth={'212px'} padding={1} fontSize={12}>
                        {translate(unit.description)}
                      </Typography>
                    </Paper>
                  </Box>
                </Box>

                <Stack padding={1} flexGrow={1} gap={1}>
                  <Stack alignItems={'flex-start'} gap={1}>
                    <UnitRequirements unitRequirements={unitRequirements} unitName={unit.name} />

                    <UnitBonus bonus={unit.bonus} />

                    <UnitStats unit={unit} player={player} />
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
                        disabled={!unitRequirements.isUnitAvailable}
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
