import { IUnit } from '../../types/IUnit'
import pirateUnits from './pirates/pirateUnits'
import specialUnits from './specials/specialUnits'

const units: IUnit[] = [...pirateUnits, ...specialUnits]

export default units
