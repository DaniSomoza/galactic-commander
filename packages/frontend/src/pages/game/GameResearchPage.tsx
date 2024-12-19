import Stack from '@mui/material/Stack'

import ResearchQueue from '../../components/research-queue/ResearchQueue'
import ResearchList from '../../components/research-list/ResearchList'

function GameResearchPage() {
  return (
    <Stack direction={'column'} gap={2}>
      <ResearchQueue />

      <ResearchList />
    </Stack>
  )
}

export default GameResearchPage
