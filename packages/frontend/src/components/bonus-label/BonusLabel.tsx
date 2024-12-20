import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

import { UnitType } from 'game-api-microservice/src/types/Unit'

import { useTranslations } from '../../store/TranslationContext'

type BonusLabelProps = {
  bonus: UnitType['bonus']
  bono: string
  customValue?: string
}

function BonusLabel({ bono, bonus, customValue }: BonusLabelProps) {
  const { translate } = useTranslations()

  const value = customValue || (bonus[bono as keyof UnitType['bonus']] as number)

  // TODO: mostrar aqui la fuente de los bonos!! con imagenes en el tooltip!!

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
