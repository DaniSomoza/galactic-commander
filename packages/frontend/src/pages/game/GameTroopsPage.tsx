import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import computedBonus from 'game-engine/src/engine/bonus/computedBonus'
import checkUnitRequirements from 'game-engine/src/engine/units/checkUnitRequirements'

import { usePlayer } from '../../store/PlayerContext'
import { useTranslations } from '../../store/TranslationContext'
import Image from '../../components/image/Image'
import Loader from '../../components/loader/Loader'
import getUnitImage from '../../utils/getUnitImage'
import formatTimer from '../../utils/formatTimer'
import formatNumber from '../../utils/formatNumber'
import millisToSeconds from '../../utils/millisToSeconds'
import { useBuildUnits } from '../../store/buildUnitsContext'

function GameTroopsPage() {
  const { translate } = useTranslations()

  const { player, isPlayerLoading, selectedPlanet } = usePlayer()

  const { buildTroopsQueue, activeBuildTroopsCountdown, activeBuildTroops, starBuildUnits } =
    useBuildUnits()

  console.log('buildTroopsQueue: ', buildTroopsQueue)
  console.log('activeBuildTroopsCountdown: ', activeBuildTroopsCountdown)
  console.log('activeBuildTroops: ', activeBuildTroops)

  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState(0)

  const units = player && selectedPlanet ? [...selectedPlanet.units, ...player.race.units] : []

  if (!player || isPlayerLoading || !selectedPlanet) {
    return <Loader isLoading />
  }

  async function performUpdateBuildUnitsQueue(unitName: string, amount: number) {
    setIsLoading(true)
    console.log('unitName: ', unitName)
    console.log('amount: ', amount)
    console.log('planetCoordinates: ', selectedPlanet?.coordinates)
    // TODO: implement performUpdateBuildUnitsQueue
    await starBuildUnits(unitName, amount, 'TROOP')
    setIsLoading(false)
    setAmount(0)
  }

  async function performStartBuildUnits(unitName: string, amount: number) {
    setIsLoading(true)
    console.log('unitName: ', unitName)
    console.log('amount: ', amount)
    console.log('planetCoordinates: ', selectedPlanet?.coordinates)
    // TODO: implement performStartBuildUnits
    await starBuildUnits(unitName, amount, 'TROOP')
    setIsLoading(false)
    setAmount(0)
  }

  const activeBuildUnits = selectedPlanet.unitBuild.troops.activeBuild

  return (
    <Stack direction={'column'} gap={2}>
      {/* unitList */}
      {units.map((unit) => {
        // TODO: build unit time
        const buildUnitBonus = computedBonus(player.perks, 'TROOPS_TRAINING_BONUS')

        const buildUnitDuration = millisToSeconds(unit.buildBaseTime * (100 / buildUnitBonus))

        const attackBonus = computedBonus(player.perks, 'TROOPS_ATTACK_BONUS')
        const attack = unit.stats.attack * (attackBonus / 100)

        const shieldBonus = computedBonus(player.perks, 'TROOPS_SHIELD_BONUS')
        const shield = unit.stats.shield * (shieldBonus / 100)

        const healthBonus = computedBonus(player.perks, 'TROOPS_HEALTH_BONUS')
        const health = unit.stats.health * (healthBonus / 100)

        const hasEnoughResources = amount * unit.resourceCost <= selectedPlanet.resources

        const { isUnitAvailable, requirements } = checkUnitRequirements(unit, player)

        console.log('hasEnoughResources: ', hasEnoughResources)
        console.log('isUnitAvailable: ', isUnitAvailable)
        console.log('requirements: ', requirements)

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

                    {/* Build unit time */}
                    <Box position={'absolute'} left={0} bottom={0} padding={1}>
                      <Paper variant="outlined">
                        <Tooltip
                          title={translate(
                            'GAME_BUILD_UNITS_PAGE_BUILD_DURATION',
                            formatTimer(buildUnitDuration)
                          )}
                          arrow
                        >
                          <Typography
                            variant="body1"
                            fontSize={13}
                            fontWeight={500}
                            padding={0.4}
                            paddingLeft={0.8}
                            paddingRight={0.8}
                          >
                            {formatTimer(buildUnitDuration)}
                          </Typography>
                        </Tooltip>
                      </Paper>
                    </Box>
                  </Stack>
                </Box>
              </Box>

              {/* Text Part */}
              <Stack padding={1.5} flexGrow={1}>
                <Typography variant="body2" gutterBottom>
                  {translate(unit.description)}
                </Typography>

                {/* TODO: CREATE A UNIT STAT COMPONENT */}
                {/* Stats Part */}
                <Tooltip title={translate('ATTACK_UNIT_TOOLTIP', unit.stats.attack, attack)}>
                  <Typography variant="body2" gutterBottom>
                    {translate('ATTACK_UNIT_LABEL', attack)}
                  </Typography>
                </Tooltip>

                <Tooltip title={translate('SHIELD_UNIT_TOOLTIP', unit.stats.shield, shield)}>
                  <Typography variant="body2" gutterBottom>
                    {translate('SHIELD_UNIT_LABEL', shield)}
                  </Typography>
                </Tooltip>

                <Tooltip title={translate('HEALTH_UNIT_TOOLTIP', unit.stats.health, health)}>
                  <Typography variant="body2" gutterBottom>
                    {translate('HEALTH_UNIT_LABEL', health)}
                  </Typography>
                </Tooltip>

                {/* TODO: Unit Bonus Part */}

                {/* TODO: Unit Requirements Part */}

                {/* Action Buttons Part */}
                <Stack
                  flexGrow={1}
                  direction={'row'}
                  justifyContent={'flex-end'}
                  alignItems={'flex-end'}
                  gap={1}
                >
                  {/* TODO: Amount input */}
                  <TextField
                    value={amount}
                    // label={translate('AMOUNT_BUILD_UNITS_INPUT_LABEL')}
                    label={'Amount'}
                    onChange={(event) => setAmount(Number(event.target.value))}
                  />

                  <Stack flexGrow={1}>
                    <Stack flexGrow={1} direction={'row'} gap={1}>
                      {/* Resource cost Part */}
                      <Typography variant="body2" gutterBottom>
                        {translate(
                          'GAME_BUILD_UNITS_PAGE_BUILD_RESOURCE_COST',
                          formatNumber(unit.resourceCost * amount, true)
                        )}
                      </Typography>

                      {/* Energy Part */}
                      {!!unit.energyCost && (
                        <Typography variant="body2" gutterBottom>
                          {translate(
                            'GAME_BUILD_UNITS_PAGE_BUILD_ENERGY',
                            formatNumber(unit.energyCost * amount, true)
                          )}
                        </Typography>
                      )}
                    </Stack>

                    <Stack
                      flexGrow={1}
                      direction={'row'}
                      justifyContent={'flex-end'}
                      alignItems={'flex-end'}
                      gap={1}
                    >
                      <Button variant="outlined" disabled={isLoading} size="small">
                        {translate('GAME_BUILD_UNITS_PAGE_BUILD_UNITS_SCHEDULE_BUTTON')}
                      </Button>

                      {activeBuildUnits ? (
                        <Button
                          variant="contained"
                          size="small"
                          disabled={isLoading}
                          onClick={() => performUpdateBuildUnitsQueue(unit.name, amount)}
                        >
                          {translate('GAME_BUILD_UNITS_PAGE_BUILD_UNITS_QUEUE_BUTTON')}
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          size="small"
                          // disabled={isLoading || !hasEnoughResources || !isUnitAvailable}
                          onClick={() => performStartBuildUnits(unit.name, amount)}
                        >
                          {translate('GAME_BUILD_UNITS_PAGE_START_BUILD_UNITS_BUTTON')}
                        </Button>
                      )}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        )
      })}
    </Stack>
  )
}

export default GameTroopsPage
