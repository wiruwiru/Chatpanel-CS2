FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY .next ./.next
COPY public ./public
COPY next.config.js ./
COPY .env.example ./.env

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "start"]