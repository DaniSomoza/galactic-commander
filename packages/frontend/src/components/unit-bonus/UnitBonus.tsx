import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

import { UnitType } from 'game-api-microservice/src/types/Unit'

import { useTranslations } from '../../store/TranslationContext'

type UnitBonusProps = {
  bonus: UnitType['bonus']
}

function UnitBonus({ bonus }: UnitBonusProps) {
  const { translate } = useTranslations()

  const hasBonus = Object.keys(bonus).length > 0

  if (!hasBonus) {
    return null
  }

  return (
    <Paper variant="outlined" sx={{ padding: 1 }}>
      {Object.keys(bonus).map((bono) => (
        <Typography fontSize={12} fontWeight={500} color="success">
          {translate(bono, bonus[bono as keyof UnitType['bonus']] as number)}
        </Typography>
      ))}
    </Paper>
  )
}

export default UnitBonus
