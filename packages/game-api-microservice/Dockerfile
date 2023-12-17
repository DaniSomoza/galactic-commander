# Stage 1: Build
FROM node:20 as builder

WORKDIR /usr/app

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn build

# Stage 2: Game Api Image
FROM node:20-slim

WORKDIR /app

# dependencies
COPY --from=builder /usr/app/package.json ./
COPY --from=builder /usr/app/node_modules ./node_modules

# code
COPY --from=builder /usr/app/packages ./packages

EXPOSE 3000

CMD ["node", "packages/game-api-microservice/dist/index"]
