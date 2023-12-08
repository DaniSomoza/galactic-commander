# Galactic Commander Game

[![Coverage Status](https://coveralls.io/repos/github/DaniSomoza/galactic-commander/badge.svg)](https://coveralls.io/github/DaniSomoza/galactic-commander)

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

## Roadmap

- [x] **Auth microservice**: create users, validate email, get user info and create user sessions (JWT)
- [ ] **Other Auth microservice endpoints**: change password, forgot password, reset password and delete account
- [x] **Auth microservice**: add unit tests with jest
- [ ] **Auth microservice**: add Github actions (test, sonar, coverage reports with coveralls)
- [ ] **First version of the frontend**: register (create + validate email), login, forgot password, change password
- [ ] **game-api**: add migration support
- [ ] **game-engine**: Create Universe (define races, planets)
- [ ] **game-api microservice**: create a player (select race & select universe & principal planet)
- [ ] **game-engine**: Define task types & processing scheduler
- [ ] **game-api microservice**: Players can create tasks
- [ ] **first release**: Release system & dev & Prod environment (Github actions)
- [ ] **preview PR branches**: (Github actions)
- [ ] **Badges**: (badges in te README.md)
