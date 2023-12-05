# Stage 1: Build
FROM node:20 as builder

WORKDIR /usr/src/app

COPY package.json yarn.lock tsconfig.json ./
COPY packages/auth-microservice/package.json packages/auth-microservice/tsconfig.json ./packages/auth-microservice/
COPY packages/game-engine/package.json packages/game-engine/tsconfig.json ./packages/game-engine/


RUN yarn install --frozen-lockfile

COPY . .

RUN yarn workspace auth-microservice build

# Stage 2: Auth Image
FROM node:20-slim

WORKDIR /app

COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules

# game-engine
COPY --from=builder /usr/src/app/packages/game-engine ./packages/game-engine

# auth-microservice
COPY --from=builder /usr/src/app/packages/auth-microservice ./packages/auth-microservice

EXPOSE 3000

CMD ["node", "packages/auth-microservice/dist/index"]
