function getResearchImage(researchName: string) {
  return researchImages[researchName]
}

export default getResearchImage

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
