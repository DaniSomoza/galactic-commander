import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import AlarmIcon from '@mui/icons-material/Alarm'
import DiamondIcon from '@mui/icons-material/Diamond'

import calculateResearchResourceCost from 'game-engine/src/engine/resources/calculateResearchResourceCost'
import calculateResearchDuration from 'game-engine/src/engine/research/calculateResearchDuration'
import computedBonus from 'game-engine/src/engine/bonus/computedBonus'

import { useTranslations } from '../../store/TranslationContext'
import { usePlayer } from '../../store/PlayerContext'
import Loader from '../loader/Loader'
import ResearchCard from '../research-card/ResearchCard'
import { useResearch } from '../../store/ResearchContext'
import calculateResearchLevelInTheQueue from '../../utils/calculateResearchLevelInTheQueue'
import formatNumber from '../../utils/formatNumber'
import formatCoordinatesLabel from '../../utils/formatPlanetCoordinates'
import { usePlayerResources } from '../../store/PlayerResourcesContext'
import formatTimer from '../../utils/formatTimer'
import millisToSeconds from '../../utils/millisToSeconds'
import BonusLabel from '../bonus-label/BonusLabel'
import { useTheme } from '../../store/ThemeContext'

function ResearchList() {
  const [isLoading, setIsLoading] = useState(false)

  const { theme } = useTheme()

  const { translate } = useTranslations()

  const { player, isPlayerLoading } = usePlayer()

  const { resources } = usePlayerResources()

  const { activeResearch, researchQueue, researched, startResearch, updateResearchQueue } =
    useResearch()

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

  if (!player || isPlayerLoading) {
    return <Loader isLoading />
  }

  return (
    <Stack direction={'column'} gap={2} marginTop={1}>
      {player.race.researches.map((research) => {
        const playerResearch = researched.find(
          (playerResearch) => playerResearch.research.name === research.name
        )

        const currentLevel = playerResearch?.level || 0

        const nextLevel = calculateResearchLevelInTheQueue(
          research.name,
          currentLevel,
          researchQueue,
          researchQueue.length,
          activeResearch
        )

        const resourceCost = calculateResearchResourceCost(research, nextLevel)
        const principalPlanetLabel = formatCoordinatesLabel(player.planets.principal.coordinates)
        const resourcesInPrincipalPlanet = resources[principalPlanetLabel]
        const hasEnoughResources = resourcesInPrincipalPlanet >= resourceCost

        const researchBonus = computedBonus(player.perks, 'RESEARCH_BONUS')

        const researchDuration = millisToSeconds(
          calculateResearchDuration(research.initialTime, nextLevel, researchBonus)
        )

        return (
          <Paper key={research.name} variant="outlined">
            <Stack direction={'row'}>
              <Box>
                <ResearchCard
                  disableBorder
                  research={research}
                  currentLevel={currentLevel}
                  nextLevel={currentLevel !== nextLevel ? nextLevel : undefined}
                  height={230}
                  width={230}
                >
                  {/* Research duration */}
                  <Box position={'absolute'} left={0} bottom={0} padding={1}>
                    <Paper variant="outlined">
                      <Tooltip
                        title={translate(
                          'GAME_RESEARCH_PAGE_RESEARCH_DURATION',
                          formatTimer(researchDuration)
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
                          <Typography fontSize={13}>{formatTimer(researchDuration)}</Typography>
                        </Stack>
                      </Tooltip>
                    </Paper>
                  </Box>
                </ResearchCard>
              </Box>

              {/* Text Part */}
              <Stack padding={1.5} flexGrow={1} gap={1}>
                <Typography variant="body2">{translate(research.description)}</Typography>

                <Stack alignItems={'flex-start'}>
                  {/* Research bonus */}
                  <Paper>
                    <Stack gap={0.5} padding={0.5} alignItems={'center'}>
                      {Object.keys(research.bonus).map((bono) => (
                        <BonusLabel key={bono} bono={bono} bonus={research.bonus} />
                      ))}
                    </Stack>
                  </Paper>
                </Stack>

                <Stack
                  flexGrow={1}
                  direction={'row'}
                  justifyContent={'flex-end'}
                  alignItems={'flex-end'}
                  gap={1}
                >
                  {/* Research resource cost */}
                  <Box flexGrow={1} display={'flex'}>
                    <Tooltip
                      title={translate('RESEARCH_RESOURCE_COST', formatNumber(resourceCost, true))}
                      arrow
                    >
                      <Paper
                        variant="outlined"
                        sx={{
                          borderColor: hasEnoughResources ? undefined : theme.palette.error.main
                        }}
                      >
                        <Stack
                          direction={'row'}
                          gap={0.5}
                          padding={0.5}
                          paddingRight={1}
                          alignItems={'center'}
                        >
                          <DiamondIcon
                            fontSize="small"
                            color={hasEnoughResources ? 'inherit' : 'error'}
                          />

                          <Typography
                            variant="body1"
                            fontSize={12}
                            overflow={'hidden'}
                            textOverflow="ellipsis"
                            textAlign="center"
                            color={hasEnoughResources ? 'textPrimary' : 'error'}
                          >
                            {formatNumber(resourceCost, true)}
                          </Typography>
                        </Stack>
                      </Paper>
                    </Tooltip>
                  </Box>

                  <Button variant="outlined" disabled={isLoading} size="small">
                    {translate('GAME_RESEARCH_PAGE_RESEARCH_SCHEDULE_BUTTON')}
                  </Button>

                  {activeResearch ? (
                    <Button
                      variant="contained"
                      size="small"
                      disabled={isLoading}
                      onClick={() => performUpdateResearchQueue(research.name)}
                    >
                      {translate('GAME_RESEARCH_PAGE_RESEARCH_QUEUE_BUTTON', nextLevel + 1)}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      disabled={isLoading || !hasEnoughResources}
                      onClick={() => performStartResearch(research.name)}
                    >
                      {translate('GAME_RESEARCH_PAGE_RESEARCH_START_RESEARCH_BUTTON')}
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

export default ResearchList
