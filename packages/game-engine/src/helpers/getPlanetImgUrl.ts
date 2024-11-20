import getRandomNumber from './getRandomNumber'

function getPlanetImgUrl(resourceQuality: number): string {
  const baseImage = Math.floor(resourceQuality / 10) * 10
  const variant = getPlanetImgVariant(resourceQuality)

  return `/planets/planet_${baseImage}_${variant}.jpg`
}

function getPlanetImgVariant(resourceQuality: number): number {
  if (resourceQuality < 50) {
    return getRandomNumber(1, 10)
  }

  if (resourceQuality < 100) {
    return getRandomNumber(1, 15)
  }

  return getRandomNumber(1, 20)
}

export default getPlanetImgUrl
