import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'

import { UnitType } from 'game-api-microservice/src/types/Unit'

import BonusLabel from '../bonus-label/BonusLabel'

type UnitBonusProps = {
  bonus: UnitType['bonus']
}

function UnitBonus({ bonus }: UnitBonusProps) {
  const hasBonus = Object.keys(bonus).length > 0

  if (!hasBonus) {
    return null
  }

  return (
    <Paper>
      <Stack gap={0.5} padding={0.5}>
        {Object.keys(bonus).map((bono) => (
          <BonusLabel key={bono} bono={bono} bonus={bonus} />
        ))}
      </Stack>
    </Paper>
  )
}

export default UnitBonus
