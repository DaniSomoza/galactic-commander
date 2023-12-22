import { ITaskTypeDocument, ResearchTaskType } from '../../models/TaskModel'

// TODO: This tasks can be processed in parallel
function processResearchTask(task: ITaskTypeDocument<ResearchTaskType>, second: number) {
  console.log('task: ', task)
  console.log('second: ', second)

  // TODO: implement this

  return Promise.all([task.save()])
}

export default processResearchTask
