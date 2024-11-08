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

import formatTimestamp from '../../utils/formatTimestamp'
import formatTimer from '../../utils/formatTimer'
import BonusCard from '../bonus-card/BonusCard'
import { GAME_RESEARCHES_PATH } from '../../routes/routes'
import { useResearch } from '../../store/ResearchContext'
import { useTranslations } from '../../store/TranslationContext'
import Image from '../image/Image'

function GameActiveResearchSection() {
  const { translate } = useTranslations()
  const navigate = useNavigate()

  const { activeResearch, activeResearchCountdown, isResearchLoading } = useResearch()

  // TODO: handle 3 states:
  //   - Active research
  //   - Loading State
  //   - No Active research

  const showNoResearchActiveLabel = !activeResearch && !isResearchLoading

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
            <Typography textAlign={'center'}>
              {translate('GAME_PLAYER_ACTIVE_RESEARCH_NO_RESEARCH_LABEL')}
            </Typography>
            <Button variant="outlined" onClick={() => navigate(GAME_RESEARCHES_PATH)}>
              {translate('GAME_PLAYER_ACTIVE_RESEARCH_GO_TO_RESEARCH_BUTTON')}
            </Button>
          </Stack>
        ) : (
          <Stack justifyContent="center" alignItems="center">
            {isResearchLoading ? (
              <Skeleton variant="rectangular" height={'200px'} width={'200px'} />
            ) : (
              <Image
                src={activeResearch?.research.imgUrl || ''}
                // TODO: create proper alt image
                alt="player active research image"
                height={'200px'}
                width={'200px'}
                border
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
                  textAlign="center"
                  overflow={'hidden'}
                  textOverflow="ellipsis"
                >
                  {isResearchLoading ? (
                    <Skeleton variant="text" width={'120px'} />
                  ) : (
                    translate(activeResearch?.research.name || '')
                  )}
                </Typography>
              </Paper>
            </Box>

            <Box position={'absolute'} left={0} bottom={0} padding={1}>
              <Paper variant="outlined">
                <Tooltip
                  title={translate(
                    'GAME_PLAYER_ACTIVE_RESEARCH_END_DATE',
                    formatTimestamp(activeResearch?.executeTaskAt || 0)
                  )}
                  arrow
                >
                  <Typography
                    variant="body1"
                    fontSize={12}
                    fontWeight={500}
                    padding={0.4}
                    paddingLeft={0.8}
                    paddingRight={0.8}
                  >
                    {isResearchLoading ? (
                      <Skeleton variant="text" width={'48px'} />
                    ) : (
                      formatTimer(activeResearchCountdown)
                    )}
                  </Typography>
                </Tooltip>
              </Paper>
            </Box>

            <Box position={'absolute'} right={0} bottom={0} padding={1}>
              <Stack spacing={0.5} alignItems="center">
                {/* TODO: create activeResearch.research.bonus section because is optional */}

                <Stack spacing={0.5} alignItems="center">
                  {isResearchLoading ? (
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
                  <Tooltip
                    title={translate(
                      'GAME_PLAYER_ACTIVE_RESEARCH_LEVEL',
                      activeResearch?.level ? activeResearch?.level - 1 : 0,
                      activeResearch?.level || 0
                    )}
                    arrow
                  >
                    <Stack
                      padding={0.4}
                      paddingLeft={0.8}
                      paddingRight={0.8}
                      direction={'row'}
                      justifyContent="center"
                      alignItems="center"
                    >
                      {isResearchLoading ? (
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

                      {isResearchLoading ? (
                        <Skeleton variant="text" width={'8px'} />
                      ) : (
                        <Typography
                          variant="body1"
                          fontSize={12}
                          fontWeight={500}
                          color={green[600]}
                        >
                          {activeResearch?.level}
                        </Typography>
                      )}
                    </Stack>
                  </Tooltip>
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
