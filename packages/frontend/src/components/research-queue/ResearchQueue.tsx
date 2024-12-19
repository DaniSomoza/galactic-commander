import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import AlarmIcon from '@mui/icons-material/Alarm'

import calculateResearchDuration from 'game-engine/src/engine/research/calculateResearchDuration'
import { PlayerType } from 'game-api-microservice/src/types/Player'
import computedBonus from 'game-engine/src/engine/bonus/computedBonus'
import getSecond from 'game-engine/src/helpers/getSecond'

import { useResearch } from '../../store/ResearchContext'
import { useTranslations } from '../../store/TranslationContext'
import { usePlayer } from '../../store/PlayerContext'
import Loader from '../../components/loader/Loader'
import { ResearchType } from 'game-api-microservice/src/types/Research'
import ResearchCard from '../research-card/ResearchCard'
import formatTimestamp from '../../utils/formatTimestamp'
import formatTimer from '../../utils/formatTimer'
import calculateResearchLevelInTheQueue from '../../utils/calculateResearchLevelInTheQueue'

function ResearchQueue() {
  const { translate } = useTranslations()

  const { player, isPlayerLoading } = usePlayer()

  const { activeResearch, researchQueue, researched } = useResearch()

  const showQueue = researchQueue.length > 0

  if (!player || isPlayerLoading) {
    // TODO: create a research queue loader component
    return <Loader isLoading />
  }

  // TODO: research 500 Internal server error bug when remove an item from the queue

  const { researches: raceResearches } = player.race

  return (
    <Paper variant="outlined">
      {showQueue ? (
        <Stack direction={'row'} gap={1} padding={1} sx={{ overflowX: 'auto' }}>
          {researchQueue.map((researchName, index) => {
            const playerResearch = researched.find(
              (playerResearch) => playerResearch.research.name === researchName
            )

            const raceResearch = raceResearches.find(
              (raceResearch) => raceResearch.name === researchName
            )

            const currentLevel = calculateResearchLevelInTheQueue(
              researchName,
              playerResearch?.level || 0, // player level
              researchQueue,
              index,
              activeResearch
            )

            const startResearchTime = calculateStartResearchTimestamp(player, researchQueue, index)

            const showNextArrow = index < researchQueue.length - 1

            return (
              <Stack key={index} alignItems={'center'} direction={'row'} gap={1}>
                <QueueItem
                  index={index}
                  research={raceResearch!}
                  player={player}
                  level={currentLevel}
                  startResearchTime={startResearchTime}
                />

                {showNextArrow && <ArrowRightAltRoundedIcon sx={{ transform: 'rotate(180deg)' }} />}
              </Stack>
            )
          })}
        </Stack>
      ) : (
        <Stack direction={'row'} justifyContent={'center'} gap={1} padding={4}>
          <Tooltip title={translate('RESEARCH_QUEUE_EMPTY_TOOLTIP')} arrow>
            <Typography fontSize={12}>{translate('RESEARCH_QUEUE_EMPTY')}</Typography>
          </Tooltip>
        </Stack>
      )}
    </Paper>
  )
}

export default ResearchQueue

type QueueItemProps = {
  index: number
  research: ResearchType
  player: PlayerType
  level: number
  startResearchTime: number
}

function QueueItem({ research, player, level, index, startResearchTime }: QueueItemProps) {
  const { translate } = useTranslations()

  const nextLevel = level + 1

  const [showRemoveButton, setShowRemoveButton] = useState(false)

  const { removeResearchFromQueue } = useResearch()

  async function removeFromQueue(index: number) {
    await removeResearchFromQueue(index)
  }

  const researchBonus = computedBonus(player.perks, 'RESEARCH_BONUS')

  const researchDuration = calculateResearchDuration(research.initialTime, level, researchBonus)

  const endResearchTime = startResearchTime + researchDuration

  const countdown = Math.floor((endResearchTime - getSecond(Date.now())) / 1_000)

  return (
    <Tooltip title={translate(research.name)} arrow>
      <div
        onMouseEnter={() => setShowRemoveButton(true)}
        onMouseLeave={() => setShowRemoveButton(false)}
      >
        <ResearchCard
          showNameLabel={false}
          research={research}
          currentLevel={level}
          nextLevel={nextLevel}
          height={128}
          width={128}
        >
          <>
            {/* Countdown */}
            <Box position={'absolute'} top={20} sx={{ transform: 'translate(0, -50%)' }}>
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
                  <Stack
                    direction={'row'}
                    gap={0.5}
                    padding={0.4}
                    paddingLeft={0.6}
                    paddingRight={0.8}
                    alignItems={'center'}
                  >
                    <AlarmIcon fontSize="small" />
                    <Typography fontSize={12}>{formatTimer(countdown)}</Typography>
                  </Stack>
                </Paper>
              </Tooltip>
            </Box>

            {/* remove item from the queue */}
            {showRemoveButton && (
              <Box position={'absolute'} top={0} right={0}>
                <Tooltip
                  title={translate('RESEARCH_QUEUE_REMOVE_ITEM_TOOLTIP')}
                  arrow
                  placement="top"
                >
                  <IconButton
                    size="small"
                    onClick={() => removeFromQueue(index)}
                    aria-label={translate('RESEARCH_QUEUE_REMOVE_ITEM_TOOLTIP')}
                    color="inherit"
                    sx={{ fontSize: '14px' }}
                  >
                    <CancelRoundedIcon color="error" fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </Box>
            )}

            {/* position in the queue */}
            <Box position={'absolute'} left={0} bottom={0} padding={1}>
              <Paper variant="outlined">
                <Typography
                  variant="body1"
                  fontSize={12}
                  fontWeight={500}
                  padding={0.3}
                  paddingLeft={0.6}
                  paddingRight={0.6}
                >
                  {index + 1}º
                </Typography>
              </Paper>
            </Box>
          </>
        </ResearchCard>
      </div>
    </Tooltip>
  )
}

function calculateStartResearchTimestamp(
  player: PlayerType,
  researchQueue: string[],
  positionInTheQueue: number
): number {
  let startResearchTime = player.researches.activeResearch?.executeTaskAt || 0

  // TODO: include this in each iteration!
  const researchBonus = computedBonus(player.perks, 'RESEARCH_BONUS')

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
