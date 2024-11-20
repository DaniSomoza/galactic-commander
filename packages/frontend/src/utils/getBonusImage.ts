function getBonusImage(bono: string) {
  return bonusImages[bono]
}

export default getBonusImage

const bonusImages: Record<string, string> = {
  RESEARCH_BONUS: '/bonus/research_bonus.jpeg',
  RESOURCE_PRODUCTION_BONUS: '/bonus/resource_production_bonus.jpeg',
  STEALTH_FLEETS_BONUS: '/bonus/stealth_fleet_bonus.jpeg',
  STEALTH_FLEETS_DETECTION_BONUS: '/bonus/stealth_fleet_detection_bonus.jpeg',
  EXTRA_PLANETS_BONUS: '/bonus/extra_planets_bonus.jpeg',
  INTERGALACTIC_TRAVEL_BONUS: '/bonus/intergalactic_travel_bonus.jpeg',
  FLEET_ATTACK_BONUS: '/bonus/fleet_attack_bonus.jpeg',
  FLEET_HULL_BONUS: '/bonus/fleet_hull_bonus.jpeg',
  FLEET_HULL_REGENERATION_BONUS: '/bonus/fleet_hull_regeneration_bonus.jpeg',
  FLEET_SHIELD_BONUS: '/bonus/fleet_shield_bonus.jpeg',
  FLEET_SHIELD_PIERCING_BONUS: '/bonus/fleet_shield_piercing_bonus.jpeg',
  FLEET_SHIELD_REGENERATION_BONUS: '/bonus/fleet_shield_regeneration_bonus.jpeg',
  FLEET_SPEED_BONUS: '/bonus/fleet_speed_bonus.jpeg',
  FLEET_CARGO_BONUS: '/bonus/fleet_cargo_bonus.jpeg',
  FLEET_BUILDING_BONUS: '/bonus/fleet_building_bonus.jpeg',
  MAX_FLEETS_ALLOWED_BONUS: '/bonus/max_fleet_allowed_bonus.jpeg',
  TROOPS_ATTACK_BONUS: '/bonus/troops_attack_bonus.jpeg',
  TROOPS_HEALTH_BONUS: '/bonus/troops_health_bonus.jpeg',
  TROOPS_HEALTH_REGENERATION_BONUS: '/bonus/troops_health_regeneration_bonus.jpeg',
  TROOPS_SHIELD_BONUS: '/bonus/troops_shield_bonus.jpeg',
  TROOPS_SHIELD_PIERCING_BONUS: '/bonus/troops_shield_piercing_bonus.jpeg',
  TROOPS_SHIELD_REGENERATION_BONUS: '/bonus/troops_shield_regeneration_bonus.jpeg',
  TROOPS_TRAINING_BONUS: '/bonus/troops_training_bonus.jpeg',
  DEFENSES_ATTACK_BONUS: '/bonus/defenses_attack_bonus.jpeg',
  DEFENSES_HULL_BONUS: '/bonus/defenses_hull_bonus.jpeg',
  DEFENSES_SHIELD_BONUS: '/bonus/defenses_shield_bonus.jpeg',
  DEFENSES_SHIELD_PIERCING_BONUS: '/bonus/defenses_shield_piercing_bonus.jpeg',
  DEFENSES_SHIELD_REGENERATION_BONUS: '/bonus/defenses_shield_regeneration_bonus.jpeg',
  DEFENSES_BUILDING_BONUS: '/bonus/defenses_building_bonus.jpeg',
  FLEET_CAPTURE_BONUS: '/bonus/fleet_capture_bonus.jpeg',
  RESEARCH_ENERGY_BONUS: '/bonus/energy_bonus.jpeg',
  FLEET_ENERGY_BONUS: '/bonus/energy_bonus.jpeg',
  TROOPS_POPULATION_BONUS: '/bonus/population_bonus.jpeg',
  RESEARCH_POPULATION_BONUS: '/bonus/population_bonus.jpeg'
}
