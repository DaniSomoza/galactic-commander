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
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import AlarmIcon from '@mui/icons-material/Alarm'
import MonetizationOn from '@mui/icons-material/MonetizationOn'
import GroupIcon from '@mui/icons-material/Group'

import { UnitType } from 'game-api-microservice/src/types/Unit'
import computedBonus from 'game-engine/src/engine/bonus/computedBonus'
import getAmountOfPlayerUnitsInThePlanet from 'game-engine/src/engine/units/getAmountOfPlayerUnitsInThePlanet'
import checkUnitRequirements from 'game-engine/src/engine/units/checkUnitRequirements'
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
import UnitRequirements from '../unit-requirements/UnitRequirements'
import calculateCurrentPlayerPopulation from 'game-engine/src/engine/units/calculateCurrentPlayerPopulation'
import calculateMaxPlayerPopulation from 'game-engine/src/engine/units/calculateMaxPlayerPopulation'

type BuildUnitDialogProps = {
  unitToBuild: UnitType
  setUnitToBuild: Dispatch<SetStateAction<UnitType | undefined>>
  isOpen: boolean
}

function BuildUnitsDialog({ unitToBuild, isOpen, setUnitToBuild }: BuildUnitDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [amount, setAmount] = useState<number>(0)

  const { translate } = useTranslations()

  const { selectedPlanet, player } = usePlayer()

  // const { buildTroopsQueue, activeBuildTroopsCountdown, activeBuildTroops, starBuildUnits } =
  //   useBuildUnits()

  const { starBuildUnits } = useBuildUnits()

  const hasEnoughResources = amount * unitToBuild.resourceCost <= selectedPlanet!.resources

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

  const { isUnitAvailable, requirements } = checkUnitRequirements(unitToBuild, player!)

  const buildUnitBonus = computedBonus(player!.perks, 'TROOPS_TRAINING_BONUS')

  const buildUnitDuration = millisToSeconds(unitToBuild.buildBaseTime * (100 / buildUnitBonus))

  const troopsInThisPlanet = getAmountOfPlayerUnitsInThePlanet(
    player!,
    selectedPlanet!,
    unitToBuild
  )

  // TODO: create a isValidAmount and only call setAmount if is valid
  const isValidAmount = unitToBuild.isHero ? amount === 1 : amount >= 1

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
          </Box>
        </Stack>

        <Typography paddingTop={2}>{translate(unitToBuild.description)}</Typography>

        <Stack direction={'row'} gap={1} paddingTop={2}>
          {/* Stats Part */}
          <Box flexBasis={'50%'}>
            <UnitStats unit={unitToBuild} player={player!} />
          </Box>

          {/* Unit Requirements Part */}
          <Box flexBasis={'50%'}>
            <UnitRequirements requirements={requirements} isUnitAvailable={isUnitAvailable} />
          </Box>
        </Stack>

          <Stack
            direction={'row'}
            gap={2}
            padding={1}
            paddingTop={2}
            justifyContent={'center'}
            alignItems={'flex-end'}
          >
            <Box flexBasis={'20%'}>
              <Paper variant='outlined'>
                <Stack direction={'row'} padding={0.5} alignItems={'center'}>
                  <MonetizationOn fontSize="small" />

                  <Typography
                    variant="body1"
                    fontSize={12}
                    padding={0.4}
                    overflow={'hidden'}
                    textOverflow="ellipsis"
                    textAlign="center"
                  >
                    {formatNumber(unitToBuild.resourceCost * amount, true)}
                  </Typography>
                </Stack>
              </Paper>
            </Box>

            <Box flexBasis={'20%'}>
              <Paper>
                <Stack direction={'row'} padding={0.5} alignItems={'center'}>
                  <GroupIcon fontSize="small" />

                  <Typography
                    variant="body1"
                    fontSize={12}
                    padding={0.4}
                    overflow={'hidden'}
                    textOverflow="ellipsis"
                    textAlign="center"
                  >
                    {calculateCurrentPlayerPopulation(player!) + amount} /
                    {formatNumber(calculateMaxPlayerPopulation(player!))}
                  </Typography>
                </Stack>
              </Paper>
            </Box>

            <Box flexBasis={'20%'}>
              <Paper>
                <Stack direction={'row'} padding={0.5} alignItems={'center'}>
                  <BoltRoundedIcon fontSize="small" />

                  <Typography
                    variant="body1"
                    fontSize={12}
                    padding={0.4}
                    overflow={'hidden'}
                    textOverflow="ellipsis"
                    textAlign="center"
                  >
                    {calculateCurrentPlayerEnergy(player!) + amount * unitToBuild.energyCost} /
                    {formatNumber(calculateMaxPlayerEnergy(player!))}
                  </Typography>
                </Stack>
              </Paper>
            </Box>

            <Box flexBasis={'20%'}>
              <Paper>
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
            </Box>

            <Box flexBasis={'20%'}>
              <TextField
                label={'Amount'}
                value={amount}
                onChange={(event) => setAmount(Number(event.target.value))}
              />
            </Box>
          </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          disabled={isLoading || !hasEnoughResources || !isValidAmount}
          autoFocus
          onClick={performStartBuildUnits}
        >
          Build Units
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BuildUnitsDialog
