import getSecond from 'game-engine/src/helpers/getSecond'

function formatTimer(executeTaskAt: number): string {
  const seconds = (executeTaskAt - getSecond(Date.now())) / 1_000

  if (seconds < 0) {
    return `00:00:00`
  }

  const hours = Math.floor(seconds / 3_600)
  const minutes = Math.floor((seconds % 3_600) / 60)
  const remainingSeconds = seconds % 60

  const formattedHours = hours.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0')

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}

export default formatTimer