import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import GroupIcon from '@mui/icons-material/Group'
import StarsIcon from '@mui/icons-material/Stars'
import RocketIcon from '@mui/icons-material/Rocket'
import FortIcon from '@mui/icons-material/Fort'

import { UnitType } from 'game-api-microservice/src/types/Unit'

import { useTranslations } from '../../store/TranslationContext'
import getImage from '../../utils/getImage'
import Image from '../image/Image'
import formatNumber from '../../utils/formatNumber'

type UnitCardProps = {
  showNameLabel?: boolean
  unit: UnitType
  amount: number
  height?: number
  width?: number
  children?: JSX.Element | JSX.Element[]
}

const DEFAULT_HEIGHT = 200
const DEFAULT_WIDTH = 200

const unitIcon = {
  TROOP: GroupIcon,
  SPACESHIP: RocketIcon,
  DEFENSE: FortIcon
}

function UnitCard({
  showNameLabel = true,
  unit,
  amount,
  height = DEFAULT_HEIGHT,
  width = DEFAULT_WIDTH,
  children
}: UnitCardProps) {
  const { translate } = useTranslations()

  const UnitIconComponent = unitIcon[unit.type]
  return (
    <Box sx={{ position: 'relative' }}>
      <Paper variant="outlined">
        <Stack justifyContent="center" alignItems="center">
          <Image
            src={getImage(unit.name)}
            alt={translate(unit.name)}
            height={`${height}px`}
            width={`${width}px`}
            border
          />

          {/* Unit name */}
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
                  {unit.isHero && <StarsIcon fontSize="small" color="info" />}
                  <Typography variant="body1" fontSize={13}>
                    {translate(unit.name)}
                  </Typography>
                </Stack>
              </Paper>
            </Box>
          )}

          {/* Amount of units */}
          <Box position={'absolute'} right={0} bottom={0} padding={0.5}>
            <Paper variant="outlined">
              <Tooltip
                title={translate('AMOUNT_OF_UNITS_TOOLTIP', formatNumber(amount, true))}
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
                  {unit.isHero && <StarsIcon fontSize="small" color="info" />}
                  <UnitIconComponent fontSize="small" />
                  <Typography fontSize={12}>{formatNumber(amount, true)}</Typography>
                </Stack>
              </Tooltip>
            </Paper>
          </Box>

          {/* additional labels */}
          {children}
        </Stack>
      </Paper>
    </Box>
  )
}

export default UnitCard
