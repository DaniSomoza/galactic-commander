function getRaceImage(researchName: string) {
  return researchImages[researchName]
}

export default getRaceImage

const researchImages: Record<string, string> = {
  PIRATES_RACE_NAME: '/races/pirates_race.jpg',
  CYBORGS_RACE_NAME: '/races/cyborgs_race.jpg',
  ELDERS_RACE_NAME: '/races/elders_race.jpg',
  FOTOX_RACE_NAME: '/races/fotox_race.jpg',
  GHOSTS_RACE_NAME: '/races/ghosts_race.jpg',
  HUMANS_RACE_NAME: '/races/humans_race.jpg',
  SAURIANS_RACE_NAME: '/races/saurians_race.jpg'
}
