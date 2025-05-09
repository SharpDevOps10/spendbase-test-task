FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS production
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY wait-for-it.sh ./

RUN chmod +x wait-for-it.sh

ENV NODE_ENV=production
EXPOSE 3000

CMD ["./wait-for-it.sh", "postgres", "5432", "--", "node", "dist/main.js"]