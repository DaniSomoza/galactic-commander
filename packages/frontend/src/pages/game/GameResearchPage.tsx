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
import { PlayerType } from 'game-api-microservice/src/types/Player'
import applyBonus from 'game-engine/src/helpers/applyBonus'
import getSecond from 'game-engine/src/helpers/getSecond'

import { usePlayer } from '../../store/PlayerContext'
import { useResearch } from '../../store/ResearchContext'
import Loader from '../../components/loader/Loader'
import formatTimer from '../../utils/formatTimer'
import millisToSeconds from '../../utils/millisToSeconds'
import formatTimestamp from '../../utils/formatTimestamp'
import Image from '../../components/image/Image'
import { useTranslations } from '../../store/TranslationContext'

function GameResearchPage() {
  const { translate } = useTranslations()

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
          <Stack direction={'row'} gap={1} padding={1} maxWidth="100%" overflow="auto">
            {researchQueue.map((researchName, index) => {
              const playerResearch = researched.find(
                (playerResearch) => playerResearch.research.name === researchName
              )
              const currentLevel = calculateResearchLevelInTheQueue(
                researchName,
                playerResearch?.level || 0, // player level
                researchQueue,
                index,
                activeResearch
              )
              const nextLevel = currentLevel + 1

              const startResearchTime = calculateStartResearchTimestamp(
                player,
                researchQueue,
                index
              )
              const researchBonus = applyBonus(player.bonus, 'researchBonus', true)
              const raceResearch = raceResearches.find(
                (raceResearch) => raceResearch.name === researchName
              )
              const researchDuration = calculateResearchDuration(
                raceResearch!.initialTime,
                currentLevel,
                researchBonus
              )
              const endResearchTime = startResearchTime + researchDuration

              const showNextArrow = index < researchQueue.length - 1

              const countdown = Math.floor((endResearchTime - getSecond(Date.now())) / 1_000)

              // TODO: ADD REMOVE FROM THE QUEUE BUTTON AND MODAL
              return (
                <Stack key={index} alignItems={'center'} direction={'row'} gap={1}>
                  <Box sx={{ position: 'relative' }}>
                    <Tooltip title={translate(researchName)} arrow>
                      <Stack justifyContent="center" alignItems="center" gap={1}>
                        <Image
                          src={raceResearch!.imgUrl}
                          // TODO: create proper alt image
                          alt="player active research image"
                          height={'128px'}
                          width={'128px'}
                          border
                        />

                        {/* Countdown */}
                        <Box
                          position={'absolute'}
                          top={16}
                          sx={{ transform: 'translate(0, -50%)' }}
                        >
                          <Tooltip
                            title={
                              <div>
                                <div>
                                  {translate(
                                    'GAME_RESEARCH_PAGE_RESEARCH_QUEUE_START_DATE',
                                    formatTimestamp(startResearchTime)
                                  )}
                                </div>
                                <div>
                                  {translate(
                                    'GAME_RESEARCH_PAGE_RESEARCH_QUEUE_END_DATE',
                                    formatTimestamp(endResearchTime)
                                  )}
                                </div>
                              </div>
                            }
                            arrow
                            placement="top"
                          >
                            <Paper variant="outlined">
                              <Typography
                                variant="body1"
                                fontSize={12}
                                padding={0.2}
                                paddingLeft={0.6}
                                paddingRight={0.6}
                                textAlign={'center'}
                              >
                                {formatTimer(countdown)}
                              </Typography>
                            </Paper>
                          </Tooltip>
                        </Box>

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
                                fontSize={12}
                                fontWeight={500}
                                color={orange[600]}
                              >
                                {currentLevel}
                              </Typography>

                              <ArrowRightAltRoundedIcon fontSize="inherit" />

                              <Typography
                                variant="body1"
                                fontSize={12}
                                fontWeight={500}
                                color={green[600]}
                              >
                                {nextLevel}
                              </Typography>
                            </Stack>
                          </Paper>
                        </Box>
                      </Stack>
                    </Tooltip>
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

        const researchBonus = applyBonus(player.bonus, 'researchBonus', true)

        const currentLevel = playerResearch?.level || 0
        const nextLevel = calculateResearchLevelInTheQueue(
          raceResearch.name,
          playerResearch?.level || 0,
          researchQueue,
          researchQueue.length,
          activeResearch
        )
        const researchDuration = millisToSeconds(
          calculateResearchDuration(raceResearch.initialTime, nextLevel, researchBonus)
        )

        const resourceCost = playerResearch
          ? calculateResearchResourceCost(playerResearch.research, nextLevel)
          : raceResearch.resourceCost

        // TODO: show bonus

        return (
          <Paper key={raceResearch.name} variant="outlined">
            <Stack direction={'row'}>
              {/* Image Part */}
              <Box sx={{ position: 'relative' }}>
                <Stack justifyContent="center" alignItems="center">
                  <Image
                    src={raceResearch.imgUrl}
                    // TODO: create proper alt image
                    alt="player active research image"
                    height={'200px'}
                    width={'200px'}
                    border
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
                      >
                        <Typography
                          variant="body1"
                          fontSize={12}
                          fontWeight={500}
                          color={currentLevel !== nextLevel ? orange[600] : green[600]}
                        >
                          {currentLevel}
                        </Typography>

                        {currentLevel !== nextLevel && (
                          <>
                            <ArrowRightAltRoundedIcon fontSize="inherit" />

                            <Typography
                              variant="body1"
                              fontSize={12}
                              fontWeight={500}
                              color={green[600]}
                            >
                              {nextLevel}
                            </Typography>
                          </>
                        )}
                      </Stack>
                    </Paper>
                  </Box>
                </Stack>
              </Box>

              {/* Text Part */}
              <Stack padding={1.5} flexGrow={1}>
                <Typography fontSize={14} overflow={'hidden'} textOverflow="ellipsis">
                  {translate(raceResearch.name)}
                </Typography>

                <Typography fontSize={14} overflow={'hidden'} textOverflow="ellipsis" flexGrow={1}>
                  {translate(raceResearch.description)}
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

function calculateResearchLevelInTheQueue(
  researchName: string,
  initialLevel: number,
  researchQueue: string[],
  positionInTheQueue: number,
  activeResearch?: PlayerType['researches']['activeResearch']
): number {
  let level = initialLevel

  if (activeResearch?.research.name === researchName) {
    level++
  }

  for (let i = 0; i < positionInTheQueue; i++) {
    if (researchQueue[i] === researchName) {
      level++
    }
  }

  return level
}

function calculateStartResearchTimestamp(
  player: PlayerType,
  researchQueue: string[],
  positionInTheQueue: number
): number {
  let startResearchTime = player.researches.activeResearch?.executeTaskAt || 0

  // TODO: include this in each iteration!
  const researchBonus = applyBonus(player.bonus, 'researchBonus', true)

  for (let i = 0; i < positionInTheQueue; i++) {
    const playerResearch = player.researches.researched.find(
      (playerResearch) => playerResearch.research.name === researchQueue[i]
    )
    const raceResearch = player.race.researches.find(
      (raceResearch) => raceResearch.name === researchQueue[i]
    )

    const researchLevelInTheQueue = calculateResearchLevelInTheQueue(
      researchQueue[i],
      playerResearch?.level || 0,
      researchQueue,
      i,
      player.researches.activeResearch
    )

    const researchDuration = calculateResearchDuration(
      raceResearch!.initialTime,
      researchLevelInTheQueue,
      researchBonus
    )

    startResearchTime = startResearchTime + researchDuration
  }

  return startResearchTime
}
