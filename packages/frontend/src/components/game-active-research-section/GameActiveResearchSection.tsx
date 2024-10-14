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

import { PlayerType } from 'game-api-microservice/src/types/Player'

import researchPlaceholder from '../../assets/research_placeholder.jpg'
import usePolling from '../../hooks/usePolling'
import formatTimestamp from '../../utils/formatTimestamp'
import formatTimer from '../../utils/formatTimer'
import BonusCard from '../bonus-card/BonusCard'
import useTaskTracking from '../../hooks/useTaskTracking'
import { usePlayer } from '../../store/PlayerContext'
import { GAME_RESEARCHES_PATH } from '../../routes/routes'

type GameActiveResearchSectionType = {
  activeResearch: PlayerType['researches']['activeResearch']
}

function GameActiveResearchSection({ activeResearch }: GameActiveResearchSectionType) {
  const [researchTimer, setResearchTimer] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { isTaskPending, task } = useTaskTracking(activeResearch?.taskId)
  const { loadPlayer } = usePlayer()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isTaskPending && task) {
      setIsLoading(true)
      loadPlayer().then(() => setIsLoading(false))
    }
  }, [isTaskPending, task, loadPlayer])

  const executeTaskAt = activeResearch?.executeTaskAt || 0

  const updateResearchTimer = useCallback(() => {
    if (executeTaskAt) {
      setResearchTimer(formatTimer(executeTaskAt))
    }
  }, [executeTaskAt])

  usePolling(updateResearchTimer)

  return (
    <Paper variant="outlined">
      {isLoading ? (
        <Skeleton variant="rectangular" height={'200px'} width={'200px'} />
      ) : (
        <Box sx={{ position: 'relative' }}>
          {activeResearch ? (
            <Stack justifyContent="center" alignItems="center">
              <img
                src={researchPlaceholder}
                // TODO: create proper alt image
                alt="player active research image"
                height={'200px'}
                width={'200px'}
                style={{ borderRadius: '4px' }}
              />

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
                    {activeResearch.research.name}
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
                      {researchTimer ? researchTimer : <Skeleton variant="text" width={'48px'} />}
                    </Typography>
                  </Tooltip>
                </Paper>
              </Box>

              <Box position={'absolute'} right={0} bottom={0} padding={1}>
                <Stack spacing={0.5} alignItems="center">
                  {/* TODO: create activeResearch.research.bonus section because is optional */}

                  <Stack spacing={0.5} alignItems="center">
                    {activeResearch.research.bonus &&
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
                    {activeResearch.research.isFleetEnergyResearch && (
                      <Paper variant="outlined">
                        <Skeleton variant="rectangular" height={'40px'} width={'40px'} />
                      </Paper>
                    )}

                    {/* TODO: adapt BonusCard to isTroopsPopulationResearch */}
                    {activeResearch.research.isTroopsPopulationResearch && (
                      <Paper variant="outlined">
                        <Skeleton variant="rectangular" height={'40px'} width={'40px'} />
                      </Paper>
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
                      <Typography
                        variant="body1"
                        fontSize={12}
                        fontWeight={500}
                        color={orange[600]}
                      >
                        {activeResearch.level - 1}
                      </Typography>

                      <ArrowRightAltRoundedIcon fontSize="inherit" />

                      <Typography variant="body1" fontSize={12} fontWeight={500} color={green[600]}>
                        {activeResearch.level}
                      </Typography>
                    </Stack>
                  </Paper>
                </Stack>
              </Box>
            </Stack>
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
              <Typography>No active research</Typography>
              <Button variant="outlined" onClick={() => navigate(GAME_RESEARCHES_PATH)}>
                Research
              </Button>
            </Stack>
          )}
        </Box>
      )}
    </Paper>
  )
}

export default GameActiveResearchSection
