FROM node:20-bullseye-slim

WORKDIR /app
COPY . .

EXPOSE 3000

RUN npm ci
RUN npx tsc

ENTRYPOINT ["node", "dist/index.js"]