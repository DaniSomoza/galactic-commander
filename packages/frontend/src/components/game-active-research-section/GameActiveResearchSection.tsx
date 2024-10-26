import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded'
import { green, orange } from '@mui/material/colors'

import getSecond from 'game-engine/src/helpers/getSecond'

import researchPlaceholder from '../../assets/research_placeholder.jpg'
import usePolling from '../../hooks/usePolling'
import formatTimestamp from '../../utils/formatTimestamp'
import formatTimer from '../../utils/formatTimer'
import BonusCard from '../bonus-card/BonusCard'
import useTaskTracking from '../../hooks/useTaskTracking'
import { usePlayer } from '../../store/PlayerContext'
import { GAME_RESEARCHES_PATH } from '../../routes/routes'

function GameActiveResearchSection() {
  const [researchCountdown, setResearchCountdown] = useState(0)

  const { loadPlayer, player } = usePlayer()
  const navigate = useNavigate()

  const activeResearch = player?.researches.activeResearch
  const executeTaskAt = activeResearch?.executeTaskAt || 0
  const queue = player?.researches.queue || []
  const hasPendingResearches = queue.length > 0

  const { isTaskPending } = useTaskTracking(activeResearch?.taskId)

  useEffect(() => {
    if (!isTaskPending) {
      setTimeout(loadPlayer, 2_000)
    }
  }, [loadPlayer, isTaskPending])

  const updateResearchCountdown = useCallback(() => {
    if (executeTaskAt) {
      const researchCountDown = (executeTaskAt - getSecond(Date.now())) / 1_000
      setResearchCountdown(researchCountDown)
    }
  }, [executeTaskAt])

  // TODO: use the new getPlayer endpoint only!
  // TODO: create the 3,2,1... card with the next research

  usePolling(updateResearchCountdown)

  // TODO: FIX ISSUE WITH the research queue if no resources are present
  //    solution: Retry task after X minutes? just fail and go next in the queue?
  // TODO: create task section in the frontend to review the player tasks in the game...
  //    solution: a table and a acordeon each row
  // TODO: Add a social media footer links?

  // TODO: handle 3 states:
  //   - Active research
  //   - Loading State
  //   - No Active research

  const isLoading = researchCountdown <= 0 && hasPendingResearches
  const showNoResearchActiveLabel = !activeResearch && !isLoading

  // TODO: update no active research!!! JSX
  return (
    <Paper variant="outlined">
      <Box sx={{ position: 'relative' }}>
        {showNoResearchActiveLabel ? (
          <Stack
            padding={1}
            sx={{ width: '200px', height: '200px' }}
            direction="column"
            justifyContent="center"
            spacing={1}
            alignItems="center"
            alignContent="center"
          >
            <Typography>No active research</Typography>
            <Button variant="outlined" onClick={() => navigate(GAME_RESEARCHES_PATH)}>
              Research
            </Button>
          </Stack>
        ) : (
          <Stack justifyContent="center" alignItems="center">
            {isLoading ? (
              <Skeleton variant="rectangular" height={'200px'} width={'200px'} />
            ) : (
              <img
                src={researchPlaceholder}
                // TODO: create proper alt image
                alt="player active research image"
                height={'200px'}
                width={'200px'}
                style={{ borderRadius: '4px' }}
              />
            )}
            <Box
              position={'absolute'}
              top={24}
              padding={1}
              maxWidth={'192px'}
              sx={{ transform: 'translate(0, -50%)' }}
            >
              <Paper variant="outlined">
                <Typography
                  variant="body1"
                  fontSize={12}
                  padding={0.4}
                  paddingLeft={0.8}
                  paddingRight={0.8}
                  overflow={'hidden'}
                  textOverflow="ellipsis"
                >
                  {isLoading ? (
                    <Skeleton variant="text" width={'120px'} />
                  ) : (
                    activeResearch?.research.name
                  )}
                </Typography>
              </Paper>
            </Box>

            <Box position={'absolute'} left={0} bottom={0} padding={1}>
              <Paper variant="outlined">
                <Tooltip title={formatTimestamp(executeTaskAt)} arrow>
                  <Typography
                    variant="body1"
                    fontSize={12}
                    fontWeight={500}
                    padding={0.4}
                    paddingLeft={0.8}
                    paddingRight={0.8}
                  >
                    {isLoading ? (
                      <Skeleton variant="text" width={'48px'} />
                    ) : (
                      formatTimer(researchCountdown)
                    )}
                  </Typography>
                </Tooltip>
              </Paper>
            </Box>

            <Box position={'absolute'} right={0} bottom={0} padding={1}>
              <Stack spacing={0.5} alignItems="center">
                {/* TODO: create activeResearch.research.bonus section because is optional */}

                <Stack spacing={0.5} alignItems="center">
                  {isLoading ? (
                    <Skeleton variant="rectangular" height={'40px'} width={'40px'} />
                  ) : (
                    <>
                      {activeResearch?.research.bonus &&
                        Object.keys(activeResearch.research.bonus).map((bono) => (
                          <BonusCard
                            key={bono}
                            bonus={{
                              bonus: activeResearch.research.bonus,
                              source: activeResearch.research.name,
                              type: 'Research'
                            }}
                          />
                        ))}

                      {/* TODO: adapt BonusCard to isFleetEnergyResearch */}
                      {activeResearch?.research.isFleetEnergyResearch && (
                        <Paper variant="outlined">
                          <Skeleton variant="rectangular" height={'40px'} width={'40px'} />
                        </Paper>
                      )}

                      {/* TODO: adapt BonusCard to isTroopsPopulationResearch */}
                      {activeResearch?.research.isTroopsPopulationResearch && (
                        <Paper variant="outlined">
                          <Skeleton variant="rectangular" height={'40px'} width={'40px'} />
                        </Paper>
                      )}
                    </>
                  )}
                </Stack>

                <Paper variant="outlined">
                  <Stack
                    padding={0.4}
                    paddingLeft={0.8}
                    paddingRight={0.8}
                    direction={'row'}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {isLoading ? (
                      <Skeleton variant="text" width={'8px'} />
                    ) : (
                      <Typography
                        variant="body1"
                        fontSize={12}
                        fontWeight={500}
                        color={orange[600]}
                      >
                        {activeResearch!.level - 1}
                      </Typography>
                    )}

                    <ArrowRightAltRoundedIcon fontSize="inherit" />

                    {isLoading ? (
                      <Skeleton variant="text" width={'8px'} />
                    ) : (
                      <Typography variant="body1" fontSize={12} fontWeight={500} color={green[600]}>
                        {activeResearch?.level}
                      </Typography>
                    )}
                  </Stack>
                </Paper>
              </Stack>
            </Box>
          </Stack>
        )}
      </Box>
    </Paper>
  )
}

export default GameActiveResearchSection
