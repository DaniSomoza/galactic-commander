import { useCallback, useEffect, useState } from 'react'

function usePolling(logic: () => void, customIntervalTime = 1_000) {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>()

  useEffect(() => {
    logic()

    const intervalId = setInterval(logic, customIntervalTime)
    setIntervalId(intervalId)

    return () => {
      clearInterval(intervalId)
    }
  }, [logic, customIntervalTime])

  const stopPolling = useCallback(() => {
    clearInterval(intervalId)
  }, [intervalId])

  return stopPolling
}

export default usePolling
