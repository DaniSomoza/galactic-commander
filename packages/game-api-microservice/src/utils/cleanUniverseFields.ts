import { IUniverseDocument } from 'game-engine/models/UniverseModel'

import { UniverseType } from '../types/Universe'

function cleanUniverseFields(universe: IUniverseDocument): UniverseType {
  const { name, isProcessingInProgress, lastProcessedTime } = universe

  return {
    name,
    isProcessingInProgress,
    lastProcessedTime
  }
}

export default cleanUniverseFields
