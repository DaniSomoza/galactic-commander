import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded'
import { green, orange } from '@mui/material/colors'

import calculateResearchResourceCost from 'game-engine/src/engine/resources/calculateResearchResourceCost'
import calculateResearchDuration from 'game-engine/src/engine/research/calculateResearchDuration'

import researchPlaceholder from '../../assets/research_placeholder.jpg'
import { usePlayer } from '../../store/PlayerContext'
import Loader from '../../components/loader/Loader'
import formatTimer from '../../utils/formatTimer'
import { useResearch } from '../../store/ResearchContext'

const NUMBER_OF_RESEARCH_SHOWED_IN_THE_QUEUE = 6

function GameResearchPage() {
  const { player, isPlayerLoading } = usePlayer()

  const [isLoading, setIsLoading] = useState(false)

  const { activeResearch, researchQueue, researched, startResearch, updateResearchQueue } =
    useResearch()

  if (!player || isPlayerLoading) {
    return <Loader isLoading />
  }

  const { researches: raceResearches } = player.race

  async function performStartResearch(researchName: string) {
    setIsLoading(true)
    await startResearch(researchName)
    setIsLoading(false)
  }

  async function performUpdateResearchQueue(researchName: string) {
    setIsLoading(true)
    await updateResearchQueue(researchName)
    setIsLoading(false)
  }

  return (
    <Stack direction={'column'} gap={2}>
      {/* Research Queue */}
      {researchQueue.length > 0 && (
        <Paper variant="outlined">
          <Stack direction={'row'} spacing={0.6} padding={1}>
            {researchQueue
              .slice(0, NUMBER_OF_RESEARCH_SHOWED_IN_THE_QUEUE)
              .map((researchName, index) => {
                const playerResearch = researched.find(
                  (playerResearch) => playerResearch.research.name === researchName
                )
                // TODO: check previous items in the research queue
                const currentLevel = playerResearch ? playerResearch.level : 0
                const nextLevel = currentLevel + 1

                const showNextArrow =
                  index + 1 < NUMBER_OF_RESEARCH_SHOWED_IN_THE_QUEUE &&
                  index < researchQueue.length - 1

                return (
                  <Stack key={index} alignItems={'center'} direction={'row'} spacing={1}>
                    <Box sx={{ position: 'relative' }}>
                      <Stack justifyContent="center" alignItems="center">
                        <Tooltip title={researchName}>
                          <img
                            src={researchPlaceholder}
                            // TODO: create proper alt image
                            alt="player active research image"
                            height={'72px'}
                            width={'72px'}
                            style={{ borderRadius: '4px' }}
                          />
                        </Tooltip>

                        {/* position in the queue */}
                        <Box position={'absolute'} left={0} bottom={0} padding={0.3}>
                          <Paper variant="outlined">
                            <Typography
                              variant="body1"
                              fontSize={12}
                              fontWeight={500}
                              padding={0.3}
                              paddingLeft={0.6}
                              paddingRight={0.6}
                            >
                              {index + 1}
                            </Typography>
                          </Paper>
                        </Box>

                        {/* level */}
                        <Box position={'absolute'} right={0} bottom={0} padding={0.3}>
                          <Paper variant="outlined">
                            <Stack
                              padding={0.3}
                              paddingLeft={0.6}
                              paddingRight={0.6}
                              direction={'row'}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Typography
                                variant="body1"
                                fontSize={10}
                                fontWeight={500}
                                color={orange[600]}
                              >
                                {currentLevel}
                              </Typography>

                              <ArrowRightAltRoundedIcon fontSize="inherit" />

                              <Typography
                                variant="body1"
                                fontSize={10}
                                fontWeight={500}
                                color={green[600]}
                              >
                                {nextLevel}
                              </Typography>
                            </Stack>
                          </Paper>
                        </Box>
                      </Stack>
                    </Box>

                    {showNextArrow && (
                      <ArrowRightAltRoundedIcon sx={{ transform: 'rotate(180deg)' }} />
                    )}
                  </Stack>
                )
              })}
          </Stack>
        </Paper>
      )}

      {/* Researches list */}
      {raceResearches.map((raceResearch) => {
        const playerResearch = researched.find(
          (playerResearch) => playerResearch.research.name === raceResearch.name
        )

        // TODO: FIX review the current Research queue to update properly the level, resources and duration
        const currentLevel = playerResearch?.level || 0
        const researchDuration = Math.floor(
          calculateResearchDuration(raceResearch.initialTime, currentLevel) / 1_000
        )
        const resourceCost = playerResearch
          ? calculateResearchResourceCost(playerResearch.research, currentLevel)
          : raceResearch.resourceCost

        // TODO: show bonus

        return (
          <Paper key={raceResearch.name} variant="outlined">
            <Stack direction={'row'}>
              {/* Image Part */}
              <Box sx={{ position: 'relative' }}>
                <Stack justifyContent="center" alignItems="center">
                  <img
                    // TODO: create proper images for each research
                    src={researchPlaceholder}
                    // TODO: create proper alt image
                    alt="player active research image"
                    height={'200px'}
                    width={'200px'}
                    style={{ borderRadius: '4px 0px 0px 4px' }}
                  />
                  {/* Research time */}
                  <Box position={'absolute'} left={0} bottom={0} padding={1}>
                    <Paper variant="outlined">
                      <Tooltip title={`Research duration: ${formatTimer(researchDuration)}`} arrow>
                        <Typography
                          variant="body1"
                          fontSize={12}
                          fontWeight={500}
                          padding={0.4}
                          paddingLeft={0.8}
                          paddingRight={0.8}
                        >
                          {formatTimer(researchDuration)}
                        </Typography>
                      </Tooltip>
                    </Paper>
                  </Box>

                  {/* Research level */}
                  <Box position={'absolute'} right={0} bottom={0} padding={1}>
                    <Paper variant="outlined">
                      <Stack
                        padding={0.4}
                        paddingLeft={0.8}
                        paddingRight={0.8}
                        direction={'row'}
                        justifyContent="center"
                        alignItems="center"
                        color={green[600]}
                      >
                        <Typography variant="body1" fontSize={12} fontWeight={500}>
                          {currentLevel}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Box>
                </Stack>
              </Box>

              {/* Text Part */}
              <Stack padding={1.5} flexGrow={1}>
                <Typography fontSize={14} overflow={'hidden'} textOverflow="ellipsis">
                  {raceResearch.name}
                </Typography>

                <Typography fontSize={14} overflow={'hidden'} textOverflow="ellipsis" flexGrow={1}>
                  Description: {raceResearch.description}
                </Typography>

                <Typography fontSize={14} overflow={'hidden'} textOverflow="ellipsis" flexGrow={1}>
                  Cost: {resourceCost}
                </Typography>

                <Stack direction={'row'} justifyContent={'flex-end'} gap={1}>
                  <Button variant="outlined" disabled={isLoading} size="small">
                    Schedule
                  </Button>
                  {activeResearch ? (
                    <Button
                      variant="contained"
                      size="small"
                      disabled={isLoading}
                      onClick={() => performUpdateResearchQueue(raceResearch.name)}
                    >
                      Add to Queue
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      disabled={isLoading}
                      onClick={() => performStartResearch(raceResearch.name)}
                    >
                      Research
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        )
      })}
    </Stack>
  )
}

export default GameResearchPage
