function formatTimer(seconds: number): string {
  if (seconds < 0) {
    return `00:00:00`
  }

  const hours = Math.floor(seconds / 3_600)
  const minutes = Math.floor((seconds % 3_600) / 60)
  const remainingSeconds = seconds % 60

  const formattedHours = hours.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0')

  if (hours < 24) {
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  }

  const days = Math.floor(seconds / 86_400)
  const hoursWithoutDays = Math.floor((seconds % 86_400) / 3_600)

  const formattedHoursWithoutDays = hoursWithoutDays.toString().padStart(2, '0')

  return `${days}d ${formattedHoursWithoutDays}:${formattedMinutes}:${formattedSeconds}`
}

export default formatTimer
