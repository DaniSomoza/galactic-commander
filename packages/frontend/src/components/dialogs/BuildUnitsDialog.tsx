import { useState, Dispatch, SetStateAction } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'

import { UnitType } from 'game-api-microservice/src/types/Unit'
import { useBuildUnits } from '../../store/buildUnitsContext'
import { usePlayer } from '../../store/PlayerContext'

type BuildUnitDialogProps = {
  unitToBuild: UnitType
  setUnitToBuild: Dispatch<SetStateAction<UnitType | undefined>>
  isOpen: boolean
}

function BuildUnitsDialog({ unitToBuild, isOpen, setUnitToBuild }: BuildUnitDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [amount, setAmount] = useState<number>(0)

  const { player, isPlayerLoading, selectedPlanet } = usePlayer()

  const { buildTroopsQueue, activeBuildTroopsCountdown, activeBuildTroops, starBuildUnits } =
    useBuildUnits()

  const hasEnoughResources = amount * unitToBuild.resourceCost <= selectedPlanet!.resources

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

  function handleClose() {
    setUnitToBuild(undefined)
  }

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Build Units
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
        <Typography gutterBottom>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </Typography>

        <Typography gutterBottom>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
          vel augue laoreet rutrum faucibus dolor auctor.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Build Units
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BuildUnitsDialog
