# Stage 1: Build
FROM node:20 as builder

WORKDIR /usr/app

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn build

# Stage 2: Nginx
FROM nginx:alpine

COPY --from=builder /usr/app/packages/frontend/dist /usr/share/nginx/html

# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
