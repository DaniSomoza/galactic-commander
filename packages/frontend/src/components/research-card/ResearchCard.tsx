import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded'
import { green, orange } from '@mui/material/colors'

import { ResearchType } from 'game-api-microservice/src/types/Research'

import Image from '../image/Image'
import getImage from '../../utils/getImage'
import { useTranslations } from '../../store/TranslationContext'

type ResearchCardProps = {
  showNameLabel?: boolean
  disableBorder?: boolean
  research: ResearchType
  currentLevel: number
  nextLevel?: number
  height?: number
  width?: number
  children?: JSX.Element | JSX.Element[]
}

function ResearchCard({
  showNameLabel = true,
  disableBorder = false,
  research,
  currentLevel,
  nextLevel,
  height,
  width,
  children
}: ResearchCardProps) {
  const { translate } = useTranslations()

  return (
    <Box sx={{ position: 'relative' }}>
      <Paper variant={disableBorder ? 'elevation' : 'outlined'}>
        <Stack justifyContent="center" alignItems="center">
          <Image
            src={getImage(research.name)}
            alt={translate(research.name)}
            height={`${height}px`}
            width={`${width}px`}
            border
          />

          {/* Research name */}
          {showNameLabel && (
            <Box
              position={'absolute'}
              top={20}
              maxWidth={width}
              sx={{ transform: 'translate(0, -50%)' }}
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
                  <Typography variant="body1" fontSize={13}>
                    {translate(research.name)}
                  </Typography>
                </Stack>
              </Paper>
            </Box>
          )}

          {/* Research level */}
          <Box position={'absolute'} right={0} bottom={0} padding={1}>
            <Paper variant="outlined">
              <Stack
                padding={0.3}
                paddingLeft={0.6}
                direction={'row'}
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  variant="body1"
                  fontSize={14}
                  color={nextLevel ? orange[600] : 'textPrimary'}
                >
                  {currentLevel}
                </Typography>

                {nextLevel && (
                  <>
                    <ArrowRightAltRoundedIcon fontSize="small" />

                    <Typography variant="body1" fontSize={14} color={green[600]}>
                      {nextLevel}
                    </Typography>
                  </>
                )}

                <MilitaryTechIcon fontSize={'small'} />
              </Stack>
            </Paper>
          </Box>

          {/* additional labels */}
          {children}
        </Stack>
      </Paper>
    </Box>
  )
}

export default ResearchCard
