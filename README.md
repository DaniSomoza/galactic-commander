# Galactic Commander Game

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

- [ ] **Auth microservice**: create users, validate email, get user info, create user sessions (JWT), change password, forgot password, delete account?
- [ ] **Auth microservice**: add unit tests with jest
- [ ] **First version of the frontend**: register (create + validate email), login, forgot password, change password
- [ ] **game-engine**: Create Universe (define races, planets)
- [ ] **game-api microservice**: create a player (select race & select universe & principal planet)
- [ ] **game-engine**: Define task types & processing scheduler
- [ ] **game-api microservice**: Players can create tasks
