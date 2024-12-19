import BuildUnitsQueue from '../../components/build-units-queue/BuildUnitsQueue'
import UnitsList from '../../components/units-list/UnitsList'

function GameTroopsPage() {
  return (
    <>
      <BuildUnitsQueue unitType={'TROOP'} />

      <UnitsList unitType={'TROOP'} />
    </>
  )
}

export default GameTroopsPage
