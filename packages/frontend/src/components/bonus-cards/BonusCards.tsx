import Skeleton from '@mui/material/Skeleton'

import { IBonus } from 'game-engine/dist/types/IBonus'

import Bonus from '../bonus/Bonus'

type BonusCardProps = {
  bonus?: IBonus
  isFleetEnergyResearch?: boolean
  isTroopsPopulationResearch?: boolean
  isLoading?: boolean
}

// TODO: Delete this component
function BonusCards({
  bonus,
  isFleetEnergyResearch,
  isTroopsPopulationResearch,
  isLoading
}: BonusCardProps) {
  if (isLoading) {
    return <Skeleton variant="rounded" height={'40px'} width={'40px'} />
  }

  return (
    <>
      {bonus &&
        Object.keys(bonus).map((bono) => (
          <Bonus
            key={bono}
            size="small"
            bono={bono}
            bonusValue={bonus[bono as keyof IBonus] as number}
          />
        ))}

      {isFleetEnergyResearch && (
        <Bonus size="small" bono="RESEARCH_ENERGY_BONUS" bonusValue={true} />
      )}

      {isTroopsPopulationResearch && (
        <Bonus size="small" bono="RESEARCH_POPULATION_BONUS" bonusValue={true} />
      )}
    </>
  )
}

export default BonusCards
