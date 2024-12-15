import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { UnitType } from 'game-api-microservice/src/types/Unit'
import checkUnitRequirements from 'game-engine/src/engine/units/checkUnitRequirements'
import getAmountOfPlayerUnitsInThePlanet from 'game-engine/src/engine/units/getAmountOfPlayerUnitsInThePlanet'

import { usePlayer } from '../../store/PlayerContext'
import { useTranslations } from '../../store/TranslationContext'
import Loader from '../../components/loader/Loader'
import UnitStats from '../../components/unit-stats/UnitStats'
import BuildUnitsDialog from '../../components/dialogs/BuildUnitsDialog'
import UnitRequirements from '../../components/unit-requirements/UnitRequirements'
import UnitBonus from '../../components/unit-bonus/UnitBonus'
import BuildUnitsQueue from '../../components/build-units-queue/BuildUnitsQueue'
import UnitCard from '../../components/unit-card/UnitCard'

function GameDefensesPage() {
  const { translate } = useTranslations()

  const [unitToBuild, setUnitToBuild] = useState<UnitType>()

  const { player, isPlayerLoading, selectedPlanet } = usePlayer()

  const units = player && selectedPlanet ? [...selectedPlanet.units, ...player.race.units] : []

  if (!player || isPlayerLoading || !selectedPlanet) {
    return <Loader isLoading />
  }

  const activeBuildUnits = selectedPlanet.unitBuild.defenses.activeBuild

  return (
    <>
      <BuildUnitsQueue unitType={'DEFENSE'} />

      <Stack direction={'column'} gap={2} marginTop={1}>
        {units
          .filter((unit) => unit.type === 'DEFENSE')
          .map((unit) => {
            const unitRequirements = checkUnitRequirements(unit, player)

            const unitsInThisPlanet = getAmountOfPlayerUnitsInThePlanet(
              player,
              selectedPlanet,
              unit
            )

            return (
              <Paper key={unit.name} variant="outlined">
                <Stack direction={'row'}>
                  {/* Image Part */}
                  <Box>
                    <UnitCard unit={unit} amount={unitsInThisPlanet} height={230} width={230} />

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
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => setUnitToBuild(unit)}
                        >
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

export default GameDefensesPage
