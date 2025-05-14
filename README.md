# Galactic Commander Game

[![Coverage Status](https://coveralls.io/repos/github/DaniSomoza/galactic-commander/badge.svg?branch=main)](https://coveralls.io/github/DaniSomoza/galactic-commander?branch=main)

This is the repository of the Galactic Commander Game monorepo.

## Run the project locally

### Requisites

Install Docker

### Create `.env` file

create `.env` file, you can copy the `.env.example` file.

```bash
cp .env.example .env
```

### Run the containers

#### build containers

```bash
docker-compose build
```

#### run images

```bash
docker-compose up
```

### Tests

#### run tests

```bash
yarn test
```

#### generate coverage report

```bash
yarn coverage
```

## Roadmap

- [ ] **Authentication flows**: Create Users and update user flows.
  - [ ] Register User
  - [ ] Validate User (email verification)
  - [ ] Login User
  - [ ] Auto Refresh session token
  - [ ] Change Password
  - [ ] Forgot Password
  - [ ] Delete User
  - [ ] Change User email
  - [ ] Change User data
- [ ] **Create Players**: Player Creation flow.
  - [ ] Select player universe.
  - [ ] Select race.
  - [ ] Show player dashboard.
  - [ ] Universes as a code.
  - [ ] Races as a code.
  - [ ] Units as a code.
- [ ] **Build Units**: Players build units:
  - [ ] Build race Troops
  - [ ] Build race Spaceships
  - [ ] Build race Defenses
  - [ ] Build race Heroes
  - [ ] Build special Units
  - [ ] Build special Heroes
- [ ] **Fleets**: Players can crate fleets:
  - [ ] Explore planet fleets (create explore reports)
  - [ ] Establish planetary base fleets
  - [ ] Deploy units fleets (move units and resources) => see all visible fleets in real time in the planet
  - [ ] collect resources fleets
  - [ ] transport resources/troops/star fighters fleets
  - [ ] attack planet fleets
  - [ ] conquer planet fleets
  - [ ] counter-attack planet fleets
  - [ ] pirate attack fleets
- [ ] **Battles**: Players can crate fleets:
  - [ ] Battle reports
  - [ ] Implement battles
  - [ ] Capture units feature
- [ ] **Extra frontend features**: Frontend sections:
  - [ ] schedule tasks feature
  - [ ] notifications feature
  - [ ] favorite planets feature
  - [ ] snackbars feature
  - [ ] messages in game feature (add a chat?)
  - [ ] Game alerts in game feature (example: news, maintenance, bugs etc)
  - [ ] Exploration reports feature
  - [ ] Battle reports feature
  - [ ] Points section
  - [ ] Player Task section
- [ ] **Active Specials**: Players enable/disable specials
  - [ ] race Specials (researches?)
  - [ ] heroe Specials
  - [ ] planet Specials
- [ ] **CDN for images and assets**: Add CDN to store assets like images (player profile pics ???)
- [x] **translations**: Add translate support in the Frontend:
  - [ ] spanish translations
  - [ ] english translations
  - [ ] galician translations
  - [ ] french translations
  - [ ] italian translations
  - [ ] german translations
- [ ] **Content**: all content via game migrations
  - [ ] Races
  - [ ] Units
  - [ ] Heroes
  - [ ] Specials
  - [ ] Planets
  - [ ] Special Planets
  - [ ] Special Units
- [x] **Auth microservice**: Create users, validate email, retrieve user info, and create user sessions (JWT)
- [ ] **Github actions**: Add Github actions
  - [ ] Linter Action
  - [ ] Test Action
  - [ ] Coverage Action
  - [ ] Sonar Action
  - [ ] Deploy test branch Action
- [x] **Tests**: Add unit tests with jest
- [ ] **First release**: Release system & dev & prod environments (GitHub actions).
- [ ] **Badges**: Add badges in the README.md
