import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'

import { CheckUnitRequirementsType } from 'game-engine/src/engine/units/checkUnitRequirements'

import { useTranslations } from '../../store/TranslationContext'
import { useTheme } from '../../store/ThemeContext'

type UnitRequirementsProps = {
  unitName: string
  unitRequirements: CheckUnitRequirementsType
}

// TODO: ADD TRANSLATIONS 2

function UnitRequirements({ unitRequirements, unitName }: UnitRequirementsProps) {
  const { translate } = useTranslations()
  const { theme } = useTheme()

  const { isUnitAvailable, requirements } = unitRequirements

  const color = isUnitAvailable ? 'success' : 'warning'

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} id={`unit-requirements-${unitName}`}>
        <Stack direction={'row'} gap={0.5} alignItems={'center'}>
          {isUnitAvailable ? (
            <CheckCircleIcon color={color} />
          ) : (
            <WarningRoundedIcon color={color} />
          )}
          <Typography fontSize={13} color={color}>
            {isUnitAvailable ? 'Unit available' : 'Unit not available'}
          </Typography>
        </Stack>
      </AccordionSummary>

      <Divider />

      <AccordionDetails sx={{ paddingBottom: 1.2 }}>
        <Box flexGrow={1}>
          <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 0.2 }}>
            {requirements.map(({ research, playerResearchLevel, level }) => {
              const isResearchCompleted = playerResearchLevel >= level
              const color = isResearchCompleted ? 'success' : 'info'
              const progress = isResearchCompleted ? 100 : (playerResearchLevel / level) * 100

              // TODO: add onclick to redirect to researches ???

              return (
                <ListItem disablePadding key={research.name}>
                  <Tooltip
                    title={
                      isResearchCompleted
                        ? translate('UNIT_REQUISITE_COMPLETED_TOOLTIP', level, research.name)
                        : translate(
                            'UNIT_REQUISITE_TOOLTIP',
                            playerResearchLevel,
                            level,
                            research.name
                          )
                    }
                    arrow
                  >
                    <Paper
                      variant="outlined"
                      sx={{
                        padding: 1
                      }}
                    >
                      <Stack direction={'row'} alignItems={'center'} alignContent={'center'}>
                        <Box position={'relative'} height={28}>
                          <Box
                            position={'absolute'}
                            top={0}
                            left={0}
                            color={theme.palette.grey[400]}
                          >
                            <CircularProgress
                              size="28px"
                              variant="determinate"
                              value={100}
                              thickness={4}
                              color={'inherit'}
                            />
                          </Box>

                          <Box color={theme.palette.info.dark}>
                            <CircularProgress
                              size="28px"
                              variant="determinate"
                              value={progress || 10}
                              thickness={4}
                              color={isResearchCompleted ? 'success' : 'inherit'}
                            />
                          </Box>

                          <Box
                            position={'absolute'}
                            sx={{ transform: 'translate(-50%, -50%)' }}
                            left={'50%'}
                            top={'50%'}
                          >
                            <Typography fontSize={14} color={color} fontWeight={500}>
                              {level}
                            </Typography>
                          </Box>
                        </Box>

                        <Stack
                          direction={'row'}
                          gap={0.5}
                          alignItems={'center'}
                          alignContent={'center'}
                        >
                          <MilitaryTechIcon color={color} />

                          <Typography fontSize={12} color={color}>
                            {translate(research.name)}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Paper>
                  </Tooltip>
                </ListItem>
              )
            })}
          </List>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default UnitRequirements
