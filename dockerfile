FROM hub.lumigame.com/base/node:lts-alpine-24h1.1 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM hub.lumigame.com/base/node:lts-alpine-24h1.1
WORKDIR /app
COPY --from=builder /app .
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "dist/index.js"]