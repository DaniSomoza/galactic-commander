import { getTask as getTaskEndpoint } from '../endpoints/game/taskEndpoints'

async function waitTaskToStart(taskId: string, customIntervalTime = 1_000) {
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(async () => {
      try {
        const {
          data: { task }
        } = await getTaskEndpoint(taskId)

        if (task.status !== 'PENDING') {
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

export default waitTaskToStart
