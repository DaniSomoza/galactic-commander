import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'

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
    <Paper>
      <Stack gap={0.5} padding={1}>
        {Object.keys(bonus).map((bono) => (
          <Paper
            key={bono}
            variant="outlined"
            sx={{ paddingTop: 0.5, paddingBottom: 0.5, paddingLeft: 1, paddingRight: 1 }}
          >
            <Typography fontSize={13} color="success">
              {translate(bono, bonus[bono as keyof UnitType['bonus']] as number)}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Paper>
  )
}

export default UnitBonus
