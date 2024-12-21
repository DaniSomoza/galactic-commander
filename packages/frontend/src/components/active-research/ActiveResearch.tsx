import { useNavigate } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import AlarmIcon from '@mui/icons-material/Alarm'

import formatTimestamp from '../../utils/formatTimestamp'
import formatTimer from '../../utils/formatTimer'
import { GAME_RESEARCHES_PATH } from '../../routes/routes'
import { useResearch } from '../../store/ResearchContext'
import { useTranslations } from '../../store/TranslationContext'
import ResearchCard from '../research-card/ResearchCard'

function ActiveResearch() {
  const navigate = useNavigate()
  const { translate } = useTranslations()

  const { activeResearch, activeResearchCountdown, isResearchLoading } = useResearch()

  if (isResearchLoading) {
    return (
      <Paper variant="outlined">
        <Skeleton variant="rounded" width={'200px'} height={'200px'} />
      </Paper>
    )
  }

  return (
    <Paper variant="outlined">
      {activeResearch ? (
        <>
          <ResearchCard
            disableBorder
            research={activeResearch.research!}
            nextLevel={activeResearch.level}
            currentLevel={activeResearch.level - 1}
            height={200}
            width={200}
          >
            {/* Research countdown */}
            <Box position={'absolute'} left={0} bottom={0} padding={1}>
              <Paper variant="outlined">
                <Tooltip
                  title={translate(
                    'GAME_PLAYER_ACTIVE_RESEARCH_END_DATE',
                    formatTimestamp(activeResearch?.executeTaskAt || 0)
                  )}
                  arrow
                >
                  <Stack
                    direction={'row'}
                    gap={0.5}
                    padding={0.4}
                    paddingLeft={0.6}
                    paddingRight={0.8}
                    alignItems={'center'}
                  >
                    <AlarmIcon fontSize="small" />

                    <Typography fontSize={12}>{formatTimer(activeResearchCountdown)}</Typography>
                  </Stack>
                </Tooltip>
              </Paper>
            </Box>
          </ResearchCard>
        </>
      ) : (
        <Stack
          padding={1}
          sx={{ width: '200px', height: '200px' }}
          direction="column"
          justifyContent="center"
          spacing={1}
          alignItems="center"
          alignContent="center"
        >
          <Typography textAlign={'center'}>
            {translate('GAME_PLAYER_ACTIVE_RESEARCH_NO_RESEARCH_LABEL')}
          </Typography>
          <Button variant="outlined" onClick={() => navigate(GAME_RESEARCHES_PATH)}>
            {translate('GAME_PLAYER_ACTIVE_RESEARCH_GO_TO_RESEARCH_BUTTON')}
          </Button>
        </Stack>
      )}
    </Paper>
  )
}

export default ActiveResearch
