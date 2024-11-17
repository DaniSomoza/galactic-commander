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

import { useTranslations } from '../../store/TranslationContext'
import Image from '../image/Image'
import { usePlayer } from '../../store/PlayerContext'
import { IBonus } from 'game-engine/dist/types/bonus'

type BonusProps = {
  size?: 'small' | 'large'
  bono: keyof typeof bonusImages
  bonusValue: number | boolean
  isLoading?: boolean
  sources?: PlayerPerkType[]
}

function Bonus({ size = 'small', bono, bonusValue, isLoading, sources = [] }: BonusProps) {
  const { translate } = useTranslations()

  const bonusImg = bonusImages[bono]

  const bonusLabel = getBonusLabel(bono, bonusValue as number)
  const showBonusLabel = isBonusLabelVisible(bono, bonusValue as number)
  const showSources = sources.length > 0

  // TODO: SHOW NEGATIVE RED LABEL

  return (
    <Paper variant="outlined">
      <Box sx={{ position: 'relative' }}>
        <Tooltip
          title={
            <div>
              {translate(bono, bonusLabel)}

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
                {/* <Paper variant="outlined"> */}
                <Typography
                  variant="h5"
                  component={'p'}
                  padding={'0 4px'}
                  color="success"
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
                {/* </Paper> */}
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
  small: '48px',
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
    return bonusValue >= 100 ? `x${bonusValue / 100}` : `+${bonusValue}%`
  }

  const isNumericBonus = !!numericBonusType[bono as keyof typeof numericBonusType]

  if (isNumericBonus) {
    return `+${bonusValue}`
  }

  return ''
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

  if (source.type === 'Research') {
    return (
      <Bonus size="small" bono={bono} bonusValue={source.bonus[bono as keyof IBonus] as number} />
    )
  }

  // TODO: show percentage labels

  return (
    <Image
      src={getBonusSourceImg(source.type, source.sourceName, player)}
      // TODO: CREATE PROPER ALT
      alt=""
      height={'48px'}
      width={'48px'}
      border
    />
  )
}

function getBonusSourceImg(
  sourceType: PlayerPerkType['type'],
  sourceName: PlayerPerkType['sourceName'],
  player?: PlayerType
): string {
  if (sourceType === 'Race') {
    return player?.race.imgUrl || ''
  }

  if (sourceType === 'Research') {
    return player?.race.researches.find((research) => research.name === sourceName)?.imgUrl || ''
  }

  // TODO: implement all source sourceTypes

  return ''
}

const bonusImages: Record<string, string> = {
  RESEARCH_BONUS: '/bonus/research_bonus.jpg',
  RESOURCE_PRODUCTION_BONUS: '/bonus/resource_production_bonus.jpg',
  STEALTH_FLEETS_BONUS: '/bonus/stealth_fleet_bonus.jpg',
  STEALTH_FLEETS_DETECTION_BONUS: '/bonus/stealth_fleet_detection_bonus.jpg',
  EXTRA_PLANETS_BONUS: '/bonus/extra_planets_bonus.jpg',
  INTERGALACTIC_TRAVEL_BONUS: '/bonus/intergalactic_travel_bonus.jpg',
  FLEET_ATTACK_BONUS: '/bonus/fleet_attack_bonus.jpg',
  FLEET_HULL_BONUS: '/bonus/fleet_hull_bonus.jpg',
  FLEET_HULL_REGENERATION_BONUS: '/bonus/fleet_hull_regeneration_bonus.jpg',
  FLEET_SHIELD_BONUS: '/bonus/fleet_shield_bonus.jpg',
  FLEET_SHIELD_PIERCING_BONUS: '/bonus/fleet_shield_piercing_bonus.jpg',
  FLEET_SHIELD_REGENERATION_BONUS: '/bonus/fleet_shield_regeneration_bonus.jpg',
  FLEET_SPEED_BONUS: '/bonus/fleet_speed_bonus.jpg',
  FLEET_CARGO_BONUS: '/bonus/fleet_cargo_bonus.jpg',
  FLEET_BUILDING_BONUS: '/bonus/fleet_building_bonus.jpg',
  MAX_FLEETS_ALLOWED_BONUS: '/bonus/max_fleet_allowed_bonus.jpg',
  TROOPS_ATTACK_BONUS: '/bonus/troops_attack_bonus.jpg',
  TROOPS_HEALTH_BONUS: '/bonus/troops_health_bonus.jpg',
  TROOPS_HEALTH_REGENERATION_BONUS: '/bonus/troops_health_regeneration_bonus.jpg',
  TROOPS_SHIELD_BONUS: '/bonus/troops_shield_bonus.jpg',
  TROOPS_SHIELD_PIERCING_BONUS: '/bonus/troops_shield_piercing_bonus.jpg',
  TROOPS_SHIELD_REGENERATION_BONUS: '/bonus/troops_shield_regeneration_bonus.jpg',
  TROOPS_TRAINING_BONUS: '/bonus/troops_training_bonus.jpg',
  DEFENSES_ATTACK_BONUS: '/bonus/defenses_attack_bonus.jpg',
  DEFENSES_HULL_BONUS: '/bonus/defenses_hull_bonus.jpg',
  DEFENSES_SHIELD_BONUS: '/bonus/defenses_shield_bonus.jpg',
  DEFENSES_SHIELD_PIERCING_BONUS: '/bonus/defenses_shield_piercing_bonus.jpg',
  DEFENSES_SHIELD_REGENERATION_BONUS: '/bonus/defenses_shield_regeneration_bonus.jpg',
  DEFENSES_BUILDING_BONUS: '/bonus/defenses_building_bonus.jpg',
  FLEET_CAPTURE_BONUS: '/bonus/fleet_capture_bonus.jpg',
  FLEET_STARFIGHTER_CAPTURE_BONUS: '/bonus/fleet_starfigther_capture_bonus.jpg',
  RESEARCH_ENERGY_BONUS: '/bonus/energy_bonus.jpg',
  RESEARCH_POPULATION_BONUS: '/bonus/population_bonus.jpg'
  // }

  // // DELETE THIS
  // RESEARCH_BONUS: '/bonus/research_bonus.jpg',
  // RESOURCE_PRODUCTION_BONUS: '/bonus/resource_production_bonus.jpg',
  // STEALTH_FLEETS_BONUS: '/bonus/research_bonus.jpg',
  // STEALTH_FLEETS_DETECTION_BONUS: '/bonus/research_bonus.jpg',
  // EXTRA_PLANETS_BONUS: '/bonus/research_bonus.jpg',
  // INTERGALACTIC_TRAVEL_BONUS: '/bonus/research_bonus.jpg',
  // FLEET_ATTACK_BONUS: '/bonus/fleet_attack_bonus.jpg',
  // FLEET_HULL_BONUS: '/bonus/fleet_hull_bonus.jpg',
  // FLEET_HULL_REGENERATION_BONUS: '/bonus/research_bonus.jpg',
  // FLEET_SHIELD_BONUS: '/bonus/fleet_shield_bonus.jpg',
  // FLEET_SHIELD_PIERCING_BONUS: '/bonus/research_bonus.jpg',
  // FLEET_SHIELD_REGENERATION_BONUS: '/bonus/research_bonus.jpg',
  // FLEET_SPEED_BONUS: '/bonus/fleet_speed_bonus.jpg',
  // FLEET_CARGO_BONUS: '/bonus/fleet_cargo_bonus.jpg',
  // FLEET_BUILDING_BONUS: '/bonus/research_bonus.jpg',
  // MAX_FLEETS_ALLOWED_BONUS: '/bonus/research_bonus.jpg',
  // TROOPS_ATTACK_BONUS: '/bonus/research_bonus.jpg',
  // TROOPS_HEALTH_BONUS: '/bonus/research_bonus.jpg',
  // TROOPS_HEALTH_REGENERATION_BONUS: '/bonus/research_bonus.jpg',
  // TROOPS_SHIELD_BONUS: '/bonus/research_bonus.jpg',
  // TROOPS_SHIELD_PIERCING_BONUS: '/bonus/research_bonus.jpg',
  // TROOPS_SHIELD_REGENERATION_BONUS: '/bonus/research_bonus.jpg',
  // TROOPS_TRAINING_BONUS: '/bonus/research_bonus.jpg',
  // DEFENSES_ATTACK_BONUS: '/bonus/defenses_attack_bonus.jpg',
  // DEFENSES_HULL_BONUS: '/bonus/research_bonus.jpg',
  // DEFENSES_SHIELD_BONUS: '/bonus/research_bonus.jpg',
  // DEFENSES_SHIELD_PIERCING_BONUS: '/bonus/research_bonus.jpg',
  // DEFENSES_SHIELD_REGENERATION_BONUS: '/bonus/research_bonus.jpg',
  // DEFENSES_BUILDING_BONUS: '/bonus/research_bonus.jpg',
  // FLEET_CAPTURE_BONUS: '/bonus/research_bonus.jpg',
  // FLEET_STARFIGHTER_CAPTURE_BONUS: '/bonus/research_bonus.jpg',

  // // TODO: review this energy + troops pop
  // RESEARCH_ENERGY_BONUS: '/bonus/research_bonus.jpg',
  // RESEARCH_POPULATION_BONUS: '/bonus/research_bonus.jpg'
}
