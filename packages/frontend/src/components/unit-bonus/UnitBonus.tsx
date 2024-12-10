import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

import { UnitType } from 'game-api-microservice/src/types/Unit'

import { useTranslations } from '../../store/TranslationContext'

type UnitBonusProps = {
  bonus: UnitType['bonus']
}

function UnitBonus({ bonus }: UnitBonusProps) {
  console.log('bonus: ', bonus)

  const { translate } = useTranslations()

  const mockedBonus = {
    'Ataque de tropas ': 10,
    'Defensa de tropas ': 10,
    'Escudos de tropas ': 20
  }

  // TODO: implement this!

  const hasBonus = Object.keys(mockedBonus).length > 0

  if (!hasBonus) {
    return null
  }

  return (
    <Paper variant="outlined" sx={{ padding: 1 }}>
      {Object.keys(mockedBonus).map((bono) => (
        <Typography fontSize={14} color="success">
          +{mockedBonus[bono]}% {translate(bono)}
        </Typography>
      ))}
    </Paper>
  )
}

export default UnitBonus
