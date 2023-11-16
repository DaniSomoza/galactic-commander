# Stage 1: Install deps
FROM node:16 as builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY packages/game-engine/package.json ./packages/game-engine/

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Stage 2: Final Image
FROM node:16-slim

WORKDIR /app

COPY --from=builder /usr/src/app/packages/game-engine/dist ./dist
COPY --from=builder /usr/src/app/packages/game-engine/node_modules ./node_modules
COPY --from=builder /usr/src/app/packages/game-engine/package.json .

EXPOSE 3000

CMD ["node", "dist/index"]
