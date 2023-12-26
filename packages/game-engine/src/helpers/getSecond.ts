function getSecond(timestamp: number): number {
  return Math.trunc(timestamp / 1_000) * 1_000
}

export default getSecond
