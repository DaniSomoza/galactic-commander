import getSecond from '../../helpers/getSecond'
import { IUniverse } from '../../models/UniverseModel'

const universe: IUniverse = {
  name: 'alfa-universe', // TODO: create an env var with this value!!
  lastProcessedTime: getSecond(new Date().getTime()),
  isProcessingInProgress: false
}

export default universe
