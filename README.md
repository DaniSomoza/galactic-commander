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

- [ ] **First version of the frontend**: Register (create + validate email), login, create player, select race, and create research task. Track planet resources and active researches. Show player bonus in the UI
- [ ] **game-api microservice, game-engine & frontend**: Players can build units (research required to unlock units)
- [ ] **game-api microservice, game-engine & frontend**: Players can deploy fleets (only deploy spaceship units)
- [x] **Auth microservice**: Create users, validate email, retrieve user info, and create user sessions (JWT)
- [ ] **Pending Auth microservice endpoints**: Change password, forgot password, reset password, update user data and delete account
- [x] **Auth microservice**: Add unit tests with jest
- [x] **Github actions**: Add Github actions (test, coverage reports with coveralls)
- [ ] **Pending Github actions**: Add Sonar action
- [x] **game-api**: Add migration support
- [x] **game-engine**: Create Universe (define races, planets)
- [x] **game-api microservice**: Create a player (select race & select universe & principal planet)
- [x] **game-engine**: Define task types & processing scheduler
- [x] **game-api microservice**: Players can create tasks
- [ ] **first release**: Release system & dev & prod environments (GitHub actions).
- [ ] **preview PR branches**: (Github actions)
- [ ] **Badges**: Add badges in the README.md
