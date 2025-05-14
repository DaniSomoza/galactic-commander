import { useCallback, useState } from 'react'

import getSecond from 'game-engine/src/helpers/getSecond'

import usePolling from './usePolling'

function useCountdown(executeTaskAt: number): number {
  const [countdown, setCountdown] = useState<number>(
    (executeTaskAt - getSecond(Date.now())) / 1_000
  )

  const updateCountdown = useCallback(() => {
    setCountdown(() => {
      const countdown = Math.floor((executeTaskAt - getSecond(Date.now())) / 1_000)
      return countdown < 0 ? 0 : countdown
    })
  }, [executeTaskAt])

  usePolling(updateCountdown)

  return countdown
}

export default useCountdown
