import { useState, Dispatch, SetStateAction } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import AlarmIcon from '@mui/icons-material/Alarm'
import DiamondIcon from '@mui/icons-material/Diamond'
import GroupIcon from '@mui/icons-material/Group'

import { UnitType } from 'game-api-microservice/src/types/Unit'
import computedBonus from 'game-engine/src/engine/bonus/computedBonus'
import getAmountOfPlayerUnitsInThePlanet from 'game-engine/src/engine/units/getAmountOfPlayerUnitsInThePlanet'
import calculateMaxPlayerEnergy from 'game-engine/src/engine/units/calculateMaxPlayerEnergy'
import calculateCurrentPlayerEnergy from 'game-engine/src/engine/units/calculateCurrentPlayerEnergy'

import { useBuildUnits } from '../../store/buildUnitsContext'
import { usePlayer } from '../../store/PlayerContext'
import { useTranslations } from '../../store/TranslationContext'
import getUnitImage from '../../utils/getUnitImage'
import formatTimer from '../../utils/formatTimer'
import formatNumber from '../../utils/formatNumber'
import millisToSeconds from '../../utils/millisToSeconds'
import Image from '../image/Image'
import UnitStats from '../unit-stats/UnitStats'
import calculateCurrentPlayerPopulation from 'game-engine/src/engine/units/calculateCurrentPlayerPopulation'
import calculateMaxPlayerPopulation from 'game-engine/src/engine/units/calculateMaxPlayerPopulation'
import { usePlayerResources } from '../../store/PlayerResourcesContext'
import formatCoordinatesLabel from '../../utils/formatPlanetCoordinates'
import { useTheme } from '../../store/ThemeContext'

type BuildUnitDialogProps = {
  unitToBuild: UnitType
  setUnitToBuild: Dispatch<SetStateAction<UnitType | undefined>>
  isOpen: boolean
}

const MAX_INPUT_AMOUNT = 10_000_000

function BuildUnitsDialog({ unitToBuild, isOpen, setUnitToBuild }: BuildUnitDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [amount, setAmount] = useState<number>(0)

  const { theme } = useTheme()

  const { translate } = useTranslations()

  const { selectedPlanet, player } = usePlayer()

  const { resources } = usePlayerResources()

  // const { buildTroopsQueue, activeBuildTroopsCountdown, activeBuildTroops, starBuildUnits } =
  //   useBuildUnits()

  const { starBuildUnits, activeBuildTroops } = useBuildUnits()

  const resourceCost = amount * unitToBuild.resourceCost
  const currentPopulation = calculateCurrentPlayerPopulation(player!)
  const predictedPopulation = currentPopulation + amount
  const maxPlayerPopulation = calculateMaxPlayerPopulation(player!)
  const currentEnergy = calculateCurrentPlayerEnergy(player!)
  const predictedEnergy = currentEnergy * amount
  const maxPlayerEnergy = calculateMaxPlayerEnergy(player!)

  const selectedPlanetLabel = formatCoordinatesLabel(selectedPlanet!.coordinates)
  const planetResources = resources[selectedPlanetLabel]

  const isValidAmount = unitToBuild.isHero ? amount === 1 : amount >= 1
  const hasEnoughResources = planetResources >= resourceCost
  const isValidPopulation = maxPlayerPopulation >= predictedPopulation
  const isValidEnergy = maxPlayerEnergy >= predictedEnergy

  // async function performUpdateBuildUnitsQueue() {
  //   setIsLoading(true)
  //   console.log('unitName: ', unitName)
  //   console.log('amount: ', amount)
  //   console.log('planetCoordinates: ', selectedPlanet?.coordinates)
  //   // TODO: implement performUpdateBuildUnitsQueue
  //   await starBuildUnits(unitName, amount, 'TROOP')
  //   setIsLoading(false)
  //   setAmount(0)
  // }

  async function performStartBuildUnits() {
    setIsLoading(true)
    console.log('unitName: ', unitToBuild.name)
    console.log('amount: ', amount)
    console.log('planetCoordinates: ', selectedPlanet?.coordinates)
    // TODO: implement performStartBuildUnits
    await starBuildUnits(unitToBuild.name, amount, 'TROOP')
    setIsLoading(false)
    setAmount(0)
    handleClose()
  }

  function handleClose() {
    setUnitToBuild(undefined)
  }

  const buildUnitBonus = computedBonus(player!.perks, 'TROOPS_TRAINING_BONUS')

  const buildUnitDuration = millisToSeconds(unitToBuild.buildBaseTime * (100 / buildUnitBonus))

  const troopsInThisPlanet = getAmountOfPlayerUnitsInThePlanet(
    player!,
    selectedPlanet!,
    unitToBuild
  )

  const error = getErrorLabel({
    isValidAmount,
    hasEnoughResources,
    isValidPopulation,
    isValidEnergy
  })

  const showErrorLabel = !!amount && !!error

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Build {translate(unitToBuild.name)}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500]
        })}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        <Stack direction={'row'} justifyContent={'center'}>
          <Box sx={{ position: 'relative' }}>
            <Paper variant="outlined">
              <Stack justifyContent="center" alignItems="center">
                <Image
                  src={getUnitImage(unitToBuild.name)}
                  alt={translate(unitToBuild.name)}
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
                      {translate(unitToBuild.name)}
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
                      {unitToBuild.isHero && <MilitaryTechIcon fontSize="small" />}
                      <Tooltip
                        title={translate(
                          'GAME_BUILD_UNITS_PAGE_AMOUNT_OF_UNITS_IN_PLANET_TOOLTIP',
                          formatNumber(troopsInThisPlanet, true)
                        )}
                        arrow
                      >
                        <Typography
                          paddingLeft={unitToBuild.isHero ? 0 : 0.8}
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
            </Paper>
          </Box>
        </Stack>

        <Typography paddingTop={2}>{translate(unitToBuild.description)}</Typography>

        <Stack direction={'row'} gap={1} paddingTop={2} justifyContent={'center'}>
          {/* Stats Part */}
          <Box flexBasis={'50%'}>
            <UnitStats unit={unitToBuild} player={player!} />
          </Box>
        </Stack>

        <Stack direction={'row'} justifyContent={'space-between'} paddingTop={1} gap={1}>
          <Box flexBasis={'50%'}>
            <Paper>
              <Box padding={1} paddingBottom={0} paddingTop={'10px'} minHeight={89}>
                <TextField
                  label={'Amount of units to build'}
                  helperText={showErrorLabel ? error : ''}
                  fullWidth
                  placeholder="type the amount"
                  error={showErrorLabel}
                  value={amount || ''}
                  onChange={(event) => {
                    const value = Number(event.target.value)
                    const isNaN = Number.isNaN(value)

                    if (!isNaN) {
                      const isMax = value >= MAX_INPUT_AMOUNT

                      setAmount(isMax ? MAX_INPUT_AMOUNT : value)
                    }
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <GroupIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={'max amount of units'} arrow placement="top">
                            <Button
                              aria-label={'max amount of units'}
                              onClick={() =>
                                setAmount(
                                  getMaxAmountOfUnits({
                                    unit: unitToBuild,
                                    currentPopulation,
                                    currentEnergy,
                                    maxPlayerPopulation,
                                    maxPlayerEnergy,
                                    planetResources
                                  })
                                )
                              }
                              size="small"
                            >
                              MAX
                            </Button>
                          </Tooltip>
                        </InputAdornment>
                      )
                    }
                  }}
                />
              </Box>
            </Paper>
          </Box>

          <Box flexBasis={'50%'}>
            <Paper>
              <Stack direction={'row'} justifyContent={'center'} padding={1} gap={0.5}>
                <Stack flexBasis={'50%'} gap={0.5}>
                  <Paper
                    variant="outlined"
                    sx={{ borderColor: isValidPopulation ? undefined : theme.palette.error.main }}
                  >
                    <Stack direction={'row'} padding={0.5} alignItems={'center'}>
                      <GroupIcon fontSize="small" color={isValidPopulation ? 'inherit' : 'error'} />

                      <Typography
                        variant="body1"
                        fontSize={12}
                        padding={0.4}
                        overflow={'hidden'}
                        textOverflow="ellipsis"
                        textAlign="center"
                        color={isValidPopulation ? 'textPrimary' : 'error'}
                      >
                        {calculateCurrentPlayerPopulation(player!) + amount} /
                        {formatNumber(calculateMaxPlayerPopulation(player!))}
                      </Typography>
                    </Stack>
                  </Paper>

                  <Paper
                    variant="outlined"
                    sx={{ borderColor: isValidEnergy ? undefined : theme.palette.error.main }}
                  >
                    <Stack direction={'row'} padding={0.5} alignItems={'center'}>
                      <BoltRoundedIcon
                        fontSize="small"
                        color={isValidEnergy ? 'inherit' : 'error'}
                      />

                      <Typography
                        variant="body1"
                        fontSize={12}
                        padding={0.4}
                        overflow={'hidden'}
                        textOverflow="ellipsis"
                        textAlign="center"
                        color={isValidEnergy ? 'textPrimary' : 'error'}
                      >
                        {calculateCurrentPlayerEnergy(player!) + amount * unitToBuild.energyCost} /
                        {formatNumber(calculateMaxPlayerEnergy(player!))}
                      </Typography>
                    </Stack>
                  </Paper>
                </Stack>

                <Stack flexBasis={'50%'} gap={0.5}>
                  <Paper variant="outlined">
                    <Tooltip
                      title={translate(
                        'GAME_BUILD_UNITS_PAGE_BUILD_DURATION',
                        formatTimer(buildUnitDuration * amount)
                      )}
                      arrow
                    >
                      <Stack direction={'row'} padding={0.5} alignItems={'center'}>
                        <AlarmIcon fontSize="small" />

                        <Typography
                          variant="body1"
                          fontSize={12}
                          padding={0.4}
                          overflow={'hidden'}
                          textOverflow="ellipsis"
                          textAlign="center"
                        >
                          {formatTimer(buildUnitDuration * amount)}
                        </Typography>
                      </Stack>
                    </Tooltip>
                  </Paper>

                  <Paper
                    variant="outlined"
                    sx={{ borderColor: hasEnoughResources ? undefined : theme.palette.error.main }}
                  >
                    <Stack direction={'row'} padding={0.5} alignItems={'center'}>
                      <DiamondIcon
                        fontSize="small"
                        color={hasEnoughResources ? 'inherit' : 'error'}
                      />

                      <Typography
                        variant="body1"
                        fontSize={12}
                        padding={0.4}
                        overflow={'hidden'}
                        textOverflow="ellipsis"
                        textAlign="center"
                        color={hasEnoughResources ? 'textPrimary' : 'error'}
                      >
                        {formatNumber(unitToBuild.resourceCost * amount, true)}
                      </Typography>
                    </Stack>
                  </Paper>
                </Stack>
              </Stack>
            </Paper>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Tooltip title={'Add units to planet queue'} arrow>
          <Button disabled={isLoading || !!error} autoFocus onClick={performStartBuildUnits}>
            {activeBuildTroops ? 'Queue units' : 'Build Units'}
          </Button>
        </Tooltip>
      </DialogActions>
    </Dialog>
  )
}

export default BuildUnitsDialog

function getErrorLabel({
  isValidAmount,
  hasEnoughResources,
  isValidPopulation,
  isValidEnergy
}: {
  isValidAmount: boolean
  hasEnoughResources: boolean
  isValidPopulation: boolean
  isValidEnergy: boolean
}): string {
  if (!isValidAmount) {
    return 'invalid amount'
  }

  if (!hasEnoughResources) {
    return 'no enough resources'
  }

  if (!isValidPopulation) {
    return 'no enough population'
  }

  if (!isValidEnergy) {
    return 'no enough energy'
  }

  return ''
}

function getMaxAmountOfUnits({
  unit,
  currentPopulation,
  currentEnergy,
  maxPlayerPopulation,
  maxPlayerEnergy,
  planetResources
}: {
  unit: UnitType
  currentPopulation: number
  currentEnergy: number
  maxPlayerPopulation: number
  maxPlayerEnergy: number
  planetResources: number
}): number {
  const { resourceCost, type, isHero, energyCost } = unit

  if (isHero) {
    return 1
  }

  const maxAmountOfUnitsBasedOnResources = planetResources / resourceCost

  const hasEnergy = energyCost !== 0
  const maxAmountOfUnitsBasedOnEnergy = hasEnergy
    ? MAX_INPUT_AMOUNT
    : maxPlayerEnergy / currentEnergy

  const isTroop = type === 'TROOP'

  if (isTroop) {
    const maxAmountOfUnitsBasedOnPopulation = maxPlayerPopulation - currentPopulation

    return Math.floor(
      Math.min(
        maxAmountOfUnitsBasedOnPopulation,
        maxAmountOfUnitsBasedOnEnergy,
        maxAmountOfUnitsBasedOnResources
      )
    )
  }

  return Math.floor(Math.min(maxAmountOfUnitsBasedOnEnergy, maxAmountOfUnitsBasedOnResources))
}
