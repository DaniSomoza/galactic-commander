function getUnitImage(unitName: string) {
  return unitImages[unitName] || placeHolderUnit
}

export default getUnitImage

const placeHolderUnit = 'TODO: ADD PLACEHOLDER'

const unitImages: Record<string, string> = {
  TROOP_PIRATE_CADET_NAME: '/units/pirates/troops/pirate_cadet_unit.jpeg'
}
