import { useCallback, useEffect, useState } from 'react'

import {
  TaskType,
  TaskTypesTypes,
  ERROR_TASK_STATUS,
  PENDING_TASK_STATUS,
  PROCESSED_TASK_STATUS,
  CANCELLED_TASK_STATUS
} from 'game-api-microservice/src/types/Task'

import usePolling from './usePolling'
import { getTask as getTaskEndpoint } from '../endpoints/game/taskEndpoints'

function useTaskTracking<T extends TaskTypesTypes>(taskId?: string, customIntervalTime = 1_000) {
  const [task, setTask] = useState<TaskType<T>>()

  const getTask = useCallback(async (taskId: string): Promise<TaskType<T>> => {
    const response = await getTaskEndpoint(taskId)
    const { task } = response.data

    setTask(task)

    return task
  }, [])

  const trackTask = useCallback(async () => {
    if (taskId) {
      getTask(taskId)
    }
  }, [getTask, taskId])

  const stopTaskPolling = usePolling(trackTask, customIntervalTime)

  const isTaskPending = task?.status === PENDING_TASK_STATUS
  const isTaskProcessed = task?.status === PROCESSED_TASK_STATUS
  const isTaskError = task?.status === ERROR_TASK_STATUS
  const isTaskCancelled = task?.status === CANCELLED_TASK_STATUS

  useEffect(() => {
    if (task && !isTaskPending) {
      stopTaskPolling()
    }
  }, [task, isTaskPending, stopTaskPolling, trackTask])

  return {
    task,
    getTask,
    stopTaskPolling,
    isTaskPending,
    isTaskProcessed,
    isTaskError,
    isTaskCancelled
  }
}

export default useTaskTracking
