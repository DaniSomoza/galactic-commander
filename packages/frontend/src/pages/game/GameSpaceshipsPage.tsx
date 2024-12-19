import BuildUnitsQueue from '../../components/build-units-queue/BuildUnitsQueue'
import UnitsList from '../../components/units-list/UnitsList'

function GameSpaceshipsPage() {
  return (
    <>
      <BuildUnitsQueue unitType={'SPACESHIP'} />

      <UnitsList unitType={'SPACESHIP'} />
    </>
  )
}

export default GameSpaceshipsPage
