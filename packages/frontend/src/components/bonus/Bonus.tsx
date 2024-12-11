import Tooltip from '@mui/material/Tooltip'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { PlayerPerkType, PlayerType } from 'game-api-microservice/src/types/Player'
import {
  percentageBonusType,
  numericBonusType,
  activatableBonusType
} from 'game-engine/src/engine/bonus/computedBonus'
import { IBonus } from 'game-engine/dist/types/IBonus'

import { useTranslations } from '../../store/TranslationContext'
import getBonusImage from '../../utils/getBonusImage'
import { usePlayer } from '../../store/PlayerContext'
import Image from '../image/Image'
import getResearchImage from '../../utils/getResearchImage'
import getRaceImage from '../../utils/getRaceImage'

type BonusProps = {
  size?: 'small' | 'large'
  bono: string
  bonusValue: number | boolean
  isLoading?: boolean
  sources?: PlayerPerkType[]
}

function Bonus({ size = 'small', bono, bonusValue, isLoading, sources = [] }: BonusProps) {
  const { translate } = useTranslations()

  const bonusImg = getBonusImage(bono)

  const bonusLabel = getBonusLabel(bono, bonusValue as number)
  const showBonusLabel = isBonusLabelVisible(bono, bonusValue as number)
  const showSources = sources.length > 0

  return (
    <Paper variant="outlined">
      <Box sx={{ position: 'relative' }}>
        <Tooltip
          title={
            <div>
              {translate(`${bono}_TOOLTIP`, bonusLabel)}

              {showSources && (
                <Stack direction={'row'} gap={1} justifyContent="center" alignItems="center">
                  {sources.map((source) => (
                    <BonusSourceImage key={source.sourceName} source={source} bono={bono} />
                  ))}
                </Stack>
              )}
            </div>
          }
          arrow
        >
          <Stack justifyContent="flex-end" alignItems="center">
            <Image
              src={bonusImg}
              disabled={!isDisabled(bono, bonusValue as number) || isLoading}
              alt={translate(bono, bonusLabel)}
              height={sizes[size]}
              width={sizes[size]}
              border
            />

            {showBonusLabel && (
              <Box position={'absolute'}>
                <Typography
                  variant="h5"
                  component={'p'}
                  padding={'0 4px'}
                  color={getBonusLabelColor(bono, bonusValue as number)}
                  fontSize={fontSizes[size]}
                  fontWeight={fontWeights[size]}
                  sx={{
                    textShadow:
                      '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, -1px 0px 0 #000, 1px 0px 0 #000, 0px -1px 0 #000, 0px 1px 0 #000;'
                  }}
                  textAlign={'center'}
                >
                  {bonusLabel}
                </Typography>
              </Box>
            )}
          </Stack>
        </Tooltip>
      </Box>
    </Paper>
  )
}

export default Bonus

const sizes = {
  small: '42px',
  large: '68px'
}

const fontSizes = {
  small: '1rem',
  large: '1.3rem'
}

const fontWeights = {
  small: 400,
  large: 400
}

function getBonusLabel(bono: string, bonusValue: number): string {
  const isPercentageBonus = !!percentageBonusType[bono as keyof typeof percentageBonusType]

  if (isPercentageBonus) {
    const isNegative = bonusValue < 0

    if (isNegative) {
      return `${bonusValue}%`
    }

    const showMultiplier = bonusValue >= 100

    return showMultiplier ? `x${bonusValue / 100 + 1}` : `+${bonusValue}%`
  }

  const isNumericBonus = !!numericBonusType[bono as keyof typeof numericBonusType]

  if (isNumericBonus) {
    return bonusValue < 0 ? `${bonusValue}` : `+${bonusValue}`
  }

  return ''
}

const GREEN_LABEL = 'success'
const RED_LABEL = 'error'

function getBonusLabelColor(bono: string, bonusValue: number): string {
  const isPercentageBonus = !!percentageBonusType[bono as keyof typeof percentageBonusType]

  if (isPercentageBonus) {
    return bonusValue < 0 ? RED_LABEL : GREEN_LABEL
  }

  const isNumericBonus = !!numericBonusType[bono as keyof typeof numericBonusType]

  if (isNumericBonus) {
    return bonusValue < 0 ? RED_LABEL : GREEN_LABEL
  }

  return GREEN_LABEL
}

function isBonusLabelVisible(bono: string, bonusValue: number): boolean {
  const isPercentageBonus = !!percentageBonusType[bono as keyof typeof percentageBonusType]

  if (isPercentageBonus) {
    return bonusValue !== 0
  }

  const isNumericBonus = !!numericBonusType[bono as keyof typeof numericBonusType]

  if (isNumericBonus) {
    return bonusValue > 0
  }

  return false
}

function isDisabled(bono: string, bonusValue: number): boolean {
  const isPercentageBonus = !!percentageBonusType[bono as keyof typeof percentageBonusType]

  if (isPercentageBonus) {
    return bonusValue !== 0
  }

  const isNumericBonus = !!numericBonusType[bono as keyof typeof numericBonusType]

  if (isNumericBonus) {
    return bonusValue > 0
  }

  const isActivatableBonus = !!activatableBonusType[bono as keyof typeof activatableBonusType]

  if (isActivatableBonus) {
    return !!bonusValue
  }

  return true
}

type BonusSourceImage = {
  source: PlayerPerkType
  bono: string
}

function BonusSourceImage({ source, bono }: BonusSourceImage) {
  const { player } = usePlayer()

  const bonusValue = source.bonus[bono as keyof IBonus] as number
  const bonusLabel = getBonusLabel(bono, bonusValue)

  return (
    <Paper variant="outlined">
      <Box sx={{ position: 'relative' }}>
        <Stack justifyContent="flex-end" alignItems="center">
          <Image
            src={getBonusSourceImg(source.type, source.sourceName, player)}
            alt={`bonus source ${bonusLabel} from ${source.sourceName}`}
            height={sizes.small}
            width={sizes.small}
            border
          />

          {bonusLabel && (
            <Box position={'absolute'}>
              <Typography
                padding={'0 4px'}
                color={getBonusLabelColor(bono, bonusValue)}
                sx={{
                  textShadow:
                    '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, -1px 0px 0 #000, 1px 0px 0 #000, 0px -1px 0 #000, 0px 1px 0 #000;'
                }}
                textAlign={'center'}
              >
                {bonusLabel}
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>
    </Paper>
  )
}

function getBonusSourceImg(
  sourceType: PlayerPerkType['type'],
  sourceName: PlayerPerkType['sourceName'],
  player?: PlayerType
): string {
  if (sourceType === 'Race') {
    return getRaceImage(player?.race.name || '')
  }

  if (sourceType === 'Research') {
    const research = player?.race.researches.find((research) => research.name === sourceName)

    return getResearchImage(research?.name || '')
  }

  // TODO: implement all source sourceTypes

  return ''
}
