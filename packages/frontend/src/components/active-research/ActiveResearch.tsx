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
import BonusCards from '../bonus-cards/BonusCards'
import { GAME_RESEARCHES_PATH } from '../../routes/routes'
import { useResearch } from '../../store/ResearchContext'
import { useTranslations } from '../../store/TranslationContext'
import Image from '../image/Image'
import getImage from '../../utils/getImage'

function ActiveResearch() {
  const navigate = useNavigate()
  const { translate } = useTranslations()

  const { activeResearch, activeResearchCountdown, isResearchLoading } = useResearch()

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
              <Skeleton variant="rounded" height={'200px'} width={'200px'} />
            ) : (
              <Image
                src={getImage(activeResearch?.research.name || '')}
                alt="player active research image"
                height={'200px'}
                width={'200px'}
                border
              />
            )}
            <Box
              position={'absolute'}
              top={20}
              padding={1}
              maxWidth={'230px'}
              sx={{ transform: 'translate(0, -50%)' }}
            >
              {isResearchLoading ? (
                <Box>
                  <Skeleton variant="rounded" width={'150px'} />
                </Box>
              ) : (
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
                    {translate(activeResearch?.research.name || '')}
                  </Typography>
                </Paper>
              )}
            </Box>

            <Box position={'absolute'} left={0} bottom={0} padding={1}>
              {isResearchLoading ? (
                <Box>
                  <Skeleton variant="rounded" width={'70px'} />
                </Box>
              ) : (
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
                      {formatTimer(activeResearchCountdown)}
                    </Typography>
                  </Tooltip>
                </Paper>
              )}
            </Box>

            <Box position={'absolute'} right={0} bottom={0} padding={1}>
              <Stack spacing={0.5} alignItems="center">
                <Stack spacing={0.5} alignItems="center">
                  <BonusCards
                    isLoading={isResearchLoading}
                    bonus={activeResearch?.research.bonus}
                    isFleetEnergyResearch={activeResearch?.research.isFleetEnergyResearch}
                    isTroopsPopulationResearch={activeResearch?.research.isTroopsPopulationResearch}
                  />
                </Stack>

                {isResearchLoading ? (
                  <Box>
                    <Skeleton variant="rounded" width={'42px'} height={'24px'} />
                  </Box>
                ) : (
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
                        <Typography
                          variant="body1"
                          fontSize={12}
                          fontWeight={500}
                          color={orange[600]}
                        >
                          {activeResearch!.level - 1}
                        </Typography>

                        <ArrowRightAltRoundedIcon fontSize="inherit" />

                        <Typography
                          variant="body1"
                          fontSize={12}
                          fontWeight={500}
                          color={green[600]}
                        >
                          {activeResearch?.level}
                        </Typography>
                      </Stack>
                    </Tooltip>
                  </Paper>
                )}
              </Stack>
            </Box>
          </Stack>
        )}
      </Box>
    </Paper>
  )
}

export default ActiveResearch
