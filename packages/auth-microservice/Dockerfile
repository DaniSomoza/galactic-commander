# Stage 1: Build
FROM node:16 as builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY packages/auth-microservice/package.json ./packages/auth-microservice/

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Stage 2: Auth Image
FROM node:16-slim

WORKDIR /app

COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules

COPY --from=builder /usr/src/app/packages/auth-microservice/dist ./packages/auth-microservice/dist
COPY --from=builder /usr/src/app/packages/auth-microservice/package.json ./packages/auth-microservice/package.json

EXPOSE 3000

CMD ["node", "packages/auth-microservice/dist/index"]
