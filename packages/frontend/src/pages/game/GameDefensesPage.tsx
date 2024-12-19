import BuildUnitsQueue from '../../components/build-units-queue/BuildUnitsQueue'
import UnitsList from '../../components/units-list/UnitsList'

function GameDefensesPage() {
  return (
    <>
      <BuildUnitsQueue unitType={'DEFENSE'} />

      <UnitsList unitType={'DEFENSE'} />
    </>
  )
}

export default GameDefensesPage
