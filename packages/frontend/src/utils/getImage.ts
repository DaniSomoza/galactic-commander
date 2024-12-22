function getImage(item: string) {
  return images[item] || placeholder
}

export default getImage

// TODO: rename to .jpeg

// TODO: add placeholder image
const placeholder = '/placeholder.jpeg'

const unitImages: Record<string, string> = {
  // troops
  TROOP_PIRATE_CADET_NAME: '/units/pirates/troops/pirate_cadet_unit.jpeg',
  TROOP_PIRATE_OFFICER_NAME: '/units/pirates/troops/pirate_officer_unit.jpeg',
  TROOP_PIRATE_CORSAIR_NAME: '/units/pirates/troops/pirate_corsair_unit.jpeg',
  TROOP_PIRATE_JACK_SPACEROW_HERO_NAME: '/units/pirates/troops/pirate_jack_spacerow_unit.jpeg',
  TROOP_PIRATE_BLACKBEARD_HERO_NAME: '/units/pirates/troops/pirate_blackbeard_unit.jpeg',
  TROOP_PIRATE_LUNA_BANE_HERO_NAME: '/units/pirates/troops/pirate_luna_bane_unit.jpeg',
  TROOP_PIRATE_HENRY_EVERY_HERO_NAME: '/units/pirates/troops/pirate_henry_every_unit.jpeg',
  // spaceships
  SPACESHIP_PIRATE_RECON_DRONE_NAME: '/units/pirates/spaceships/pirate_recon_drone_unit.jpeg',
  SPACESHIP_PIRATE_STAR_FIGHTER_NAME: '/units/pirates/spaceships/pirate_star_fighter_unit.jpeg',
  SPACESHIP_PIRATE_INTERCEPTOR_NAME: '/units/pirates/spaceships/pirate_interceptor_unit.jpeg',
  SPACESHIP_PIRATE_CRUISER_NAME: '/units/pirates/spaceships/pirate_cruiser_unit.jpeg',
  SPACESHIP_PIRATE_BRIGANTINE_NAME: '/units/pirates/spaceships/pirate_brigantine_unit.jpeg',
  SPACESHIP_PIRATE_IMPERIAL_CORSAIR_FRIGATE_NAME:
    '/units/pirates/spaceships/pirate_imperial_corsair_frigate_unit.jpeg',
  SPACESHIP_PIRATE_QUEEN_ANNES_REVENGE_HERO_NAME:
    '/units/pirates/spaceships/pirate_queen_annes_revenge_unit.jpeg',
  SPACESHIP_PIRATE_ROYAL_FORTUNE_HERO_NAME:
    '/units/pirates/spaceships/pirate_royal_fortune_unit.jpeg',
  SPACESHIP_PIRATE_THE_STELLAR_SPECTRE_HERO_NAME:
    '/units/pirates/spaceships/pirate_stellar_spectre_unit.jpeg',
  // defenses
  DEFENSE_PIRATE_LASER_CANNON_NAME: '/units/pirates/defenses/pirate_laser_cannon_unit.jpeg'
}

const researchImages: Record<string, string> = {
  PIRATE_COMPUTING_RESEARCH_NAME: '/researches/pirates/pirate_computing_research.jpg',
  PIRATE_DEFENSE_ATTACK_RESEARCH_NAME: '/researches/pirates/pirate_defense_attack_research.jpg',
  PIRATE_DEFENSE_BUILDING_RESEARCH_NAME: '/researches/pirates/pirate_defense_building_research.jpg',
  PIRATE_DEFENSE_HULL_RESEARCH_NAME: '/researches/pirates/pirate_defense_hull_research.jpg',
  PIRATE_DEFENSE_SHIELD_RESEARCH_NAME: '/researches/pirates/pirate_defense_shield_research.jpg',
  PIRATE_FLEET_ATTACK_RESEARCH_NAME: '/researches/pirates/pirate_fleet_attack_research.jpg',
  PIRATE_FLEET_BUILDING_RESEARCH_NAME: '/researches/pirates/pirate_fleet_building_research.jpg',
  PIRATE_FLEET_CARGO_RESEARCH_NAME: '/researches/pirates/pirate_fleet_cargo_research.jpg',
  PIRATE_FLEET_ENERGY_RESEARCH_NAME: '/researches/pirates/pirate_fleet_energy_research.jpg',
  PIRATE_FLEET_HULL_RESEARCH_NAME: '/researches/pirates/pirate_fleet_hull_research.jpg',
  PIRATE_FLEET_SHIELD_RESEARCH_NAME: '/researches/pirates/pirate_fleet_shield_research.jpg',
  PIRATE_FLEET_SPEED_RESEARCH_NAME: '/researches/pirates/pirate_fleet_speed_research.jpg',
  PIRATE_MINING_RESEARCH_NAME: '/researches/pirates/pirate_mining_research.jpg',
  PIRATE_RESEARCH_RESEARCH_NAME: '/researches/pirates/pirate_research_research.jpg',
  PIRATE_TROOPS_ATTACK_RESEARCH_NAME: '/researches/pirates/pirate_troops_attack_research.jpg',
  PIRATE_TROOPS_HEALTH_RESEARCH_NAME: '/researches/pirates/pirate_troops_health_research.jpg',
  PIRATE_TROOPS_POPULATION_RESEARCH_NAME:
    '/researches/pirates/pirate_troops_population_research.jpg',
  PIRATE_TROOPS_SHIELD_RESEARCH_NAME: '/researches/pirates/pirate_troops_shield_research.jpg',
  PIRATE_TROOPS_TRAINING_RESEARCH_NAME: '/researches/pirates/pirate_troops_training_research.jpg'
}

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

const raceImages: Record<string, string> = {
  PIRATES_RACE_NAME: '/races/pirates_race.jpg',
  CYBORGS_RACE_NAME: '/races/cyborgs_race.jpg',
  ELDERS_RACE_NAME: '/races/elders_race.jpg',
  FOTOX_RACE_NAME: '/races/fotox_race.jpg',
  GHOSTS_RACE_NAME: '/races/ghosts_race.jpg',
  HUMANS_RACE_NAME: '/races/humans_race.jpg',
  SAURIANS_RACE_NAME: '/races/saurians_race.jpg'
}

const images: Record<string, string> = {
  ...unitImages,
  ...researchImages,
  ...bonusImages,
  ...raceImages
}
