FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm install -g next

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000
ENV HOSTNAME="0.0.0.0"

CMD ["sh", "-c", "PORT=$(grep PORT .env | cut -d '=' -f2) && npx next start -p ${PORT:-3000}"]