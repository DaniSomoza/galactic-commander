import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { UnitType, UnitTypes } from 'game-api-microservice/src/types/Unit'
import checkUnitRequirements from 'game-engine/src/engine/units/checkUnitRequirements'
import getAmountOfPlayerUnitsInThePlanet from 'game-engine/src/engine/units/getAmountOfPlayerUnitsInThePlanet'
import { PlanetType } from 'game-api-microservice/src/types/Planet'

import { usePlayer } from '../../store/PlayerContext'
import { useTranslations } from '../../store/TranslationContext'
import Loader from '../../components/loader/Loader'
import UnitStats from '../../components/unit-stats/UnitStats'
import BuildUnitsDialog from '../../components/dialogs/BuildUnitsDialog'
import UnitRequirements from '../../components/unit-requirements/UnitRequirements'
import UnitBonus from '../../components/unit-bonus/UnitBonus'
import UnitCard from '../../components/unit-card/UnitCard'

type UnitsListProp = {
  unitType: UnitTypes
}

const path: Record<UnitTypes, keyof PlanetType['unitBuild']> = {
  TROOP: 'troops',
  SPACESHIP: 'spaceships',
  DEFENSE: 'defenses'
}

function UnitsList({ unitType }: UnitsListProp) {
  const { translate } = useTranslations()

  const [unitToBuild, setUnitToBuild] = useState<UnitType>()

  const { player, isPlayerLoading, selectedPlanet } = usePlayer()

  const units = player && selectedPlanet ? [...selectedPlanet.units, ...player.race.units] : []

  if (!player || isPlayerLoading || !selectedPlanet) {
    return <Loader isLoading />
  }

  const activeBuildUnits = selectedPlanet.unitBuild[path[unitType]].activeBuild

  return (
    <>
      <Stack direction={'column'} gap={2} marginTop={1}>
        {units
          .filter((unit) => unit.type === unitType)
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
                  <Box>
                    {/* Image Part */}
                    <UnitCard unit={unit} amount={unitsInThisPlanet} height={230} width={230} />

                    {/* Unit bonus Part */}
                    {Object.keys(unit.bonus).length > 0 && (
                      <Box padding={1} paddingBottom={0}>
                        <UnitBonus bonus={unit.bonus} />
                      </Box>
                    )}
                  </Box>

                  {/* stats Part */}
                  <Stack alignItems={'flex-start'} gap={1} padding={1}>
                    <UnitStats unit={unit} player={player} />

                    <UnitRequirements unitRequirements={unitRequirements} unitName={unit.name} />
                  </Stack>
                </Stack>

                {/* description Part */}
                <Box padding={1}>
                  <Paper variant="outlined">
                    <Typography padding={1} fontSize={13}>
                      {translate(unit.description)}
                    </Typography>
                  </Paper>
                </Box>

                {/* action buttons Part */}
                <Stack
                  flexGrow={1}
                  direction={'row'}
                  justifyContent={'flex-end'}
                  alignItems={'flex-end'}
                  gap={1}
                  padding={1}
                  paddingTop={0}
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

export default UnitsList
