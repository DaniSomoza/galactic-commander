import { getTask as getTaskEndpoint } from '../endpoints/game/taskEndpoints'

async function waitTaskToFinish(taskId: string, customIntervalTime = 1_000) {
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(async () => {
      try {
        const {
          data: { task }
        } = await getTaskEndpoint(taskId)

        const isTaskFinished =
          task.status === 'CANCELLED' || task.status === 'PROCESSED' || task.status === 'ERROR'

        if (isTaskFinished) {
          clearInterval(intervalId)
          resolve(task)
        }
      } catch (error) {
        clearInterval(intervalId)
        reject(error)
      }
    }, customIntervalTime)
  })
}

export default waitTaskToFinish
