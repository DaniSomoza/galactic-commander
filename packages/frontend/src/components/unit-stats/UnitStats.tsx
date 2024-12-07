import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import ShieldIcon from '@mui/icons-material/Shield'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SpeedIcon from '@mui/icons-material/Speed'
import InventoryIcon from '@mui/icons-material/Inventory'
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive'
import AirplanemodeInactiveIcon from '@mui/icons-material/AirplanemodeInactive'
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import MonetizationOn from '@mui/icons-material/MonetizationOn'
import BugReportIcon from '@mui/icons-material/BugReport'
import ChurchIcon from '@mui/icons-material/Church'
import ParaglidingIcon from '@mui/icons-material/Paragliding'
import LocalPoliceIcon from '@mui/icons-material/LocalPolice'

import { UnitType } from 'game-api-microservice/src/types/Unit'
import { PlayerType } from 'game-api-microservice/src/types/Player'
import computedBonus from 'game-engine/src/engine/bonus/computedBonus'

import { useTranslations } from '../../store/TranslationContext'
import formatNumber from '../../utils/formatNumber'

type UnitStatsProps = {
  unit: UnitType
  player: PlayerType
}

// TODO: ADD TRANSLATIONS

function UnitStats({ unit, player }: UnitStatsProps) {
  const { translate } = useTranslations()

  const attackBonus = computedBonus(player.perks, 'TROOPS_ATTACK_BONUS')
  const attack = unit.stats.attack * (attackBonus / 100)

  const shieldBonus = computedBonus(player.perks, 'TROOPS_SHIELD_BONUS')
  const shield = unit.stats.shield * (shieldBonus / 100)

  const healthBonus = computedBonus(player.perks, 'TROOPS_HEALTH_BONUS')
  const health = unit.stats.health * (healthBonus / 100)

  const speedBonus = computedBonus(player.perks, 'FLEET_SPEED_BONUS')
  const speed = unit.stats.speed * (speedBonus / 100)

  const cargoBonus = computedBonus(player.perks, 'FLEET_CARGO_BONUS')
  const cargo = unit.stats.cargo * (cargoBonus / 100)

  return (
    <Paper>
      <Stack direction={'row'} gap={1}>
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexBasis: '50%' }}>
          {/* Attack */}
          <ListItem disablePadding>
            <Tooltip title={translate('ATTACK_UNIT_TOOLTIP', attack, unit.stats.attack)} arrow>
              <Stack direction={'row'} gap={1} paddingLeft={1} alignItems={'center'}>
                <GpsFixedIcon fontSize="small" />
                <Typography fontSize={14}>{formatNumber(attack, true)}</Typography>
              </Stack>
            </Tooltip>
          </ListItem>

          {/* Health */}
          <ListItem disablePadding>
            <Tooltip title={translate('HEALTH_UNIT_TOOLTIP', health, unit.stats.health)} arrow>
              <Stack direction={'row'} gap={1} paddingLeft={1} alignItems={'center'}>
                <FavoriteIcon fontSize="small" />
                <Typography fontSize={14}>{formatNumber(health, true)}</Typography>
              </Stack>
            </Tooltip>
          </ListItem>

          {/* Shield */}
          <ListItem disablePadding>
            <Tooltip title={translate('SHIELD_UNIT_TOOLTIP', shield, unit.stats.shield)} arrow>
              <Stack direction={'row'} gap={1} paddingLeft={1} alignItems={'center'}>
                <ShieldIcon
                  fontSize="small"
                  color={unit.type === 'SPACESHIP' ? 'action' : 'disabled'}
                />
                <Typography
                  fontSize={14}
                  color={unit.type === 'SPACESHIP' && unit.stats.shield ? 'action' : '#ffffff4d'}
                >
                  {formatNumber(shield, true)}
                </Typography>
              </Stack>
            </Tooltip>
          </ListItem>

          {/* Speed */}
          <ListItem disablePadding>
            <Tooltip title={translate('SPEED_UNIT_TOOLTIP', speed, unit.stats.speed)} arrow>
              <Stack direction={'row'} gap={1} paddingLeft={1} alignItems={'center'}>
                <SpeedIcon
                  fontSize="small"
                  color={unit.type === 'SPACESHIP' ? 'inherit' : 'disabled'}
                />
                <Typography
                  fontSize={14}
                  color={unit.type === 'SPACESHIP' && unit.stats.speed ? 'action' : '#ffffff4d'}
                >
                  {formatNumber(speed, true)}
                </Typography>
              </Stack>
            </Tooltip>
          </ListItem>
        </List>

        <List sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexBasis: '50%' }}>
          {/* Cargo */}
          <ListItem disablePadding>
            <Tooltip title={translate('CARGO_UNIT_TOOLTIP', cargo, unit.stats.cargo)} arrow>
              <Stack direction={'row'} gap={1} paddingRight={1} alignItems={'center'}>
                <InventoryIcon
                  fontSize="small"
                  color={unit.type === 'SPACESHIP' ? 'action' : 'disabled'}
                />
                <Typography
                  fontSize={14}
                  color={unit.type === 'SPACESHIP' && unit.stats.cargo ? 'action' : '#ffffff4d'}
                >
                  {formatNumber(cargo, true)}
                </Typography>
              </Stack>
            </Tooltip>
          </ListItem>

          {/* Starfighter cargo */}
          <ListItem disablePadding>
            <Tooltip
              title={translate(
                'STARFIGHER_CAPACITY_UNIT_TOOLTIP',
                unit.stats.starFighterCapacity,
                unit.stats.starFighterCapacity
              )}
              arrow
            >
              <Stack direction={'row'} gap={1} paddingRight={1} alignItems={'center'}>
                {unit.stats.starFighterCapacity ? (
                  <AirplanemodeActiveIcon fontSize="small" />
                ) : (
                  <AirplanemodeInactiveIcon
                    fontSize="small"
                    color={unit.type === 'SPACESHIP' ? 'action' : 'disabled'}
                  />
                )}
                <Typography
                  fontSize={14}
                  color={
                    unit.type === 'SPACESHIP' && unit.stats.starFighterCapacity
                      ? 'action'
                      : '#ffffff4d'
                  }
                >
                  {formatNumber(unit.stats.starFighterCapacity, true)}
                </Typography>
              </Stack>
            </Tooltip>
          </ListItem>

          {/* Troops cargo */}
          <ListItem disablePadding>
            <Tooltip
              title={translate(
                'TROOPS_CAPACITY_UNIT_TOOLTIP',
                unit.stats.troopsCapacity,
                unit.stats.troopsCapacity
              )}
              arrow
            >
              <Stack direction={'row'} gap={1} paddingRight={1} alignItems={'center'}>
                <AirlineSeatReclineNormalIcon
                  fontSize="small"
                  color={unit.type === 'SPACESHIP' ? 'action' : 'disabled'}
                />
                <Typography
                  fontSize={14}
                  color={
                    unit.type === 'SPACESHIP' && unit.stats.troopsCapacity ? 'action' : '#ffffff4d'
                  }
                >
                  {formatNumber(unit.stats.troopsCapacity, true)}
                </Typography>
              </Stack>
            </Tooltip>
          </ListItem>

          <ListItem disablePadding>
            <Tooltip
              title={translate('GAME_BUILD_UNITS_PAGE_BUILD_RESOURCE_COST', unit.resourceCost)}
              arrow
            >
              <Stack direction={'row'} gap={1} paddingRight={1} alignItems={'center'}>
                <MonetizationOn fontSize="small" />
                <Typography fontSize={14}>{formatNumber(unit.resourceCost)}</Typography>
              </Stack>
            </Tooltip>
          </ListItem>
        </List>
      </Stack>

      <Divider />

      {/* Special traits */}
      <Stack direction={'row'} gap={1} padding={1}>
        {hasSpecialTraits(unit) ? (
          <>
            {unit.isInvisible && <VisibilityOffIcon fontSize="small" />}
            {unit.isOrganic && <BugReportIcon fontSize="small" />}
            {!unit.isCapturable && <ChurchIcon fontSize="small" />}
            {unit.isAirborne && <ParaglidingIcon fontSize="small" />}
            {unit.hasShieldPiercing && <LocalPoliceIcon fontSize="small" />}
          </>
        ) : (
          <Typography variant="caption" color="#ffffff4d">
            {/* TODO: Add translations and tooltip */}
            Unit with no especial traits.
          </Typography>
        )}
      </Stack>
    </Paper>
  )
}

export default UnitStats

function hasSpecialTraits(unit: UnitType) {
  return (
    unit.isInvisible ||
    unit.isOrganic ||
    !unit.isCapturable ||
    unit.isAirborne ||
    unit.hasShieldPiercing
  )
}
