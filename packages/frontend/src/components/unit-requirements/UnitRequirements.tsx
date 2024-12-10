import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import { UnitRequirement } from 'game-engine/src/engine/units/checkUnitRequirements'

import { useTranslations } from '../../store/TranslationContext'

type UnitRequirementsProps = {
  requirements: UnitRequirement[]
}

// TODO: ADD TRANSLATIONS 2

function UnitRequirements({ requirements }: UnitRequirementsProps) {
  const { translate } = useTranslations()

  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} variant="outlined">
      <Box paddingTop={1} paddingBottom={1} flexGrow={1}>
        <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 0.2 }}>
          {requirements.map(({ research, playerResearchLevel, level }) => {
            const isResearchCompleted = playerResearchLevel >= level
            const color = isResearchCompleted ? 'success' : 'error'
            const label = isResearchCompleted
              ? translate(research.name)
              : `${playerResearchLevel}/${level} ${translate(research.name)}`

            return (
              <ListItem disablePadding key={research.name}>
                <Tooltip title={translate('ATTACK_UNIT_TOOLTIP')} arrow>
                  <Stack direction={'row'} gap={0.5} paddingLeft={1} alignItems={'center'}>
                    {isResearchCompleted && <CheckCircleIcon fontSize="small" color={color} />}
                    <Typography fontSize={12} color={color}>
                      {label}
                    </Typography>
                  </Stack>
                </Tooltip>
              </ListItem>
            )
          })}
        </List>
      </Box>
    </Paper>
  )
}

export default UnitRequirements
