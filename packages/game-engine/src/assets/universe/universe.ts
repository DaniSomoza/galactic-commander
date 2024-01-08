import getSecond from '../../helpers/getSecond'
import { IUniverse } from '../../models/UniverseModel'

const universe: IUniverse = {
  name: 'alfa-universe',
  lastProcessedTime: getSecond(new Date().getTime()),
  isProcessingInProgress: false
}

export default universe
