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
import DiamondIcon from '@mui/icons-material/Diamond'
import BugReportIcon from '@mui/icons-material/BugReport'
import ParaglidingIcon from '@mui/icons-material/Paragliding'
import LocalPoliceIcon from '@mui/icons-material/LocalPolice'
import GroupIcon from '@mui/icons-material/Group'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import AlarmIcon from '@mui/icons-material/Alarm'
import StarsIcon from '@mui/icons-material/Stars'

import { UnitType } from 'game-api-microservice/src/types/Unit'
import { PlayerType } from 'game-api-microservice/src/types/Player'
import computedBonus from 'game-engine/src/engine/bonus/computedBonus'

import { useTranslations } from '../../store/TranslationContext'
import { useTheme } from '../../store/ThemeContext'
import formatNumber from '../../utils/formatNumber'
import formatTimer from '../../utils/formatTimer'
import millisToSeconds from '../../utils/millisToSeconds'

type UnitStatsProps = {
  unit: UnitType
  player: PlayerType
}

// TODO: ADD TRANSLATIONS

function UnitStats({ unit, player }: UnitStatsProps) {
  const { translate } = useTranslations()
  const { theme } = useTheme()

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

  const buildUnitBonus = computedBonus(player!.perks, 'TROOPS_TRAINING_BONUS')

  const buildUnitDuration = millisToSeconds(unit.buildBaseTime * (100 / buildUnitBonus))

  return (
    <Paper variant="outlined">
      <Stack direction={'row'} gap={1}>
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1 }}>
          {/* Attack */}
          <ListItem disablePadding>
            <Tooltip title={translate('ATTACK_UNIT_TOOLTIP', attack, unit.stats.attack)} arrow>
              <Stack direction={'row'} gap={1} paddingLeft={1} alignItems={'center'}>
                <GpsFixedIcon fontSize="small" />
                <Typography fontSize={12}>{formatNumber(attack, true)}</Typography>
              </Stack>
            </Tooltip>
          </ListItem>

          {/* Health */}
          <ListItem disablePadding>
            <Tooltip title={translate('HEALTH_UNIT_TOOLTIP', health, unit.stats.health)} arrow>
              <Stack direction={'row'} gap={1} paddingLeft={1} alignItems={'center'}>
                <FavoriteIcon fontSize="small" />
                <Typography fontSize={12}>{formatNumber(health, true)}</Typography>
              </Stack>
            </Tooltip>
          </ListItem>

          {/* Shield */}
          <ListItem disablePadding>
            <Tooltip title={translate('SHIELD_UNIT_TOOLTIP', shield, unit.stats.shield)} arrow>
              <Stack direction={'row'} gap={1} paddingLeft={1} alignItems={'center'}>
                <ShieldIcon fontSize="small" color={unit.stats.shield ? 'action' : 'disabled'} />
                <Typography fontSize={12} color={unit.stats.shield ? 'action' : '#ffffff4d'}>
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
                  fontSize={12}
                  color={unit.type === 'SPACESHIP' && unit.stats.speed ? 'action' : '#ffffff4d'}
                >
                  {formatNumber(speed, true)}
                </Typography>
              </Stack>
            </Tooltip>
          </ListItem>
        </List>

        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            flexGrow: 1
          }}
        >
          {/* Cargo */}
          <ListItem disablePadding>
            <Tooltip title={translate('CARGO_UNIT_TOOLTIP', cargo, unit.stats.cargo)} arrow>
              <Stack direction={'row'} gap={1} paddingRight={1} alignItems={'center'}>
                <InventoryIcon
                  fontSize="small"
                  color={unit.type === 'SPACESHIP' && unit.stats.cargo ? 'action' : 'disabled'}
                />
                <Typography
                  fontSize={12}
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
                  <AirplanemodeInactiveIcon fontSize="small" color={'disabled'} />
                )}
                <Typography
                  fontSize={12}
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
              title={translate('TROOPS_CAPACITY_UNIT_TOOLTIP', unit.stats.troopsCapacity)}
              arrow
            >
              <Stack direction={'row'} gap={1} paddingRight={1} alignItems={'center'}>
                <AirlineSeatReclineNormalIcon
                  fontSize="small"
                  color={
                    unit.type === 'SPACESHIP' && unit.stats.troopsCapacity ? 'action' : 'disabled'
                  }
                />
                <Typography
                  fontSize={12}
                  color={
                    unit.type === 'SPACESHIP' && unit.stats.troopsCapacity ? 'action' : '#ffffff4d'
                  }
                >
                  {formatNumber(unit.stats.troopsCapacity, true)}
                </Typography>
              </Stack>
            </Tooltip>
          </ListItem>
        </List>

        {/* Special traits */}
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            paddingRight: 1,
            paddingLeft: 1,
            borderLeft: `1px solid ${theme.palette.divider}`
          }}
        >
          <ListItem disablePadding>
            <Tooltip title={translate('INVISIBLE_UNIT_TOOLTIP')} arrow>
              <VisibilityOffIcon fontSize="small" color={unit.isInvisible ? 'info' : 'disabled'} />
            </Tooltip>
          </ListItem>

          <ListItem disablePadding>
            <Tooltip title={translate('ORGANIC_UNIT_TOOLTIP')} arrow>
              <BugReportIcon fontSize="small" color={unit.isOrganic ? 'info' : 'disabled'} />
            </Tooltip>
          </ListItem>

          {/* <ListItem disablePadding>
            <Tooltip title={translate('NO_CAPTURABLE_UNIT_TOOLTIP')} arrow>
              <ChurchIcon fontSize="small" color={!unit.isCapturable ? 'info' : 'disabled'} />
            </Tooltip>
          </ListItem> */}

          <ListItem disablePadding>
            <Tooltip title={translate('AIRBORNE_UNIT_TOOLTIP')} arrow>
              <ParaglidingIcon fontSize="small" color={unit.isAirborne ? 'info' : 'disabled'} />
            </Tooltip>
          </ListItem>

          <ListItem disablePadding>
            <Tooltip title={translate('SHIELD_PIERCING_UNIT_TOOLTIP')} arrow>
              <LocalPoliceIcon
                fontSize="small"
                color={unit.hasShieldPiercing ? 'info' : 'disabled'}
              />
            </Tooltip>
          </ListItem>
        </List>
      </Stack>

      <Divider />

      {/* Unit Cost */}
      <List
        sx={{ display: 'flex', flexDirection: 'row', padding: 1, justifyContent: 'space-between' }}
      >
        {/* is Hero label */}
        {unit.isHero && (
          <ListItem disablePadding sx={{ width: 'auto' }}>
            <Tooltip title={translate('UNIT_HERO_TOOLTIP')} arrow>
              <Stack direction={'row'} gap={0.5} alignItems={'center'} paddingRight={1}>
                <StarsIcon fontSize="small" color="info" />
              </Stack>
            </Tooltip>
          </ListItem>
        )}

        {/* Population cost */}
        <ListItem disablePadding sx={{ width: 'auto' }}>
          <Tooltip title={translate('TROOP_UNIT_POPULATION_COST_TOOLTIP')} arrow>
            <Stack direction={'row'} gap={0.5} alignItems={'center'}>
              <GroupIcon fontSize="small" color={unit.type == 'TROOP' ? 'action' : 'disabled'} />
              <Typography fontSize={12} color={unit.type == 'TROOP' ? 'action' : '#ffffff4d'}>
                {unit.type == 'TROOP' ? 1 : 0}
              </Typography>
            </Stack>
          </Tooltip>
        </ListItem>

        {/* Energy cost */}
        <ListItem disablePadding sx={{ width: 'auto' }}>
          <Tooltip title={translate('TROOP_UNIT_ENERGY_COST_TOOLTIP')} arrow>
            <Stack direction={'row'} gap={0.5} paddingLeft={1} alignItems={'center'}>
              <BoltRoundedIcon fontSize="small" color={unit.energyCost ? 'action' : 'disabled'} />
              <Typography fontSize={12} color={unit.energyCost ? 'action' : '#ffffff4d'}>
                {formatNumber(unit.energyCost, true)}
              </Typography>
            </Stack>
          </Tooltip>
        </ListItem>

        {/* Resource cost */}
        <ListItem disablePadding sx={{ width: 'auto' }}>
          <Tooltip title={translate('TROOP_UNIT_RESOURCES_COST_TOOLTIP')} arrow>
            <Stack direction={'row'} gap={0.5} paddingLeft={1} alignItems={'center'}>
              <DiamondIcon fontSize="small" />
              <Typography fontSize={12}>{formatNumber(unit.resourceCost, true)}</Typography>
            </Stack>
          </Tooltip>
        </ListItem>

        {/* Time */}
        <ListItem disablePadding sx={{ width: 'auto' }}>
          <Tooltip title={translate('TROOP_UNIT_TIME_COST_TOOLTIP')} arrow>
            <Stack direction={'row'} gap={0.5} paddingLeft={1} alignItems={'center'}>
              <AlarmIcon fontSize="small" />
              <Typography fontSize={12}>{formatTimer(buildUnitDuration)}</Typography>
            </Stack>
          </Tooltip>
        </ListItem>
      </List>
    </Paper>
  )
}

export default UnitStats
