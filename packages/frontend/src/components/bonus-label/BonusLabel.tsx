import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

import { UnitType } from 'game-api-microservice/src/types/Unit'

import { useTranslations } from '../../store/TranslationContext'

type BonusLabelProps = {
  bonus: UnitType['bonus']
  bono: string
}

// TODO: ADD ENERGY AND POPULATION

function BonusLabel({ bono, bonus }: BonusLabelProps) {
  const { translate } = useTranslations()

  const value = bonus[bono as keyof UnitType['bonus']] as number

  return (
    <Tooltip title={translate(`${bono}_TOOLTIP`, value)} arrow>
      <Paper
        variant="outlined"
        sx={{ paddingTop: 0.5, paddingBottom: 0.5, paddingLeft: 1, paddingRight: 1 }}
      >
        <Typography fontSize={13} color="success">
          {translate(bono, value)}
        </Typography>
      </Paper>
    </Tooltip>
  )
}

export default BonusLabel
