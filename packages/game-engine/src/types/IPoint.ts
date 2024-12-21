type IPointType = 'Unit' | 'Research' | 'Battle'

export interface IPoint {
  playerId: string
  taskId: string
  points: number
  sourceId: string
  sourceName: string
  type: IPointType
  second: number
}
