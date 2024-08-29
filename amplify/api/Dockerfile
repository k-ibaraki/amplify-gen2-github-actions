FROM node:20-bullseye-slim

WORKDIR /app
COPY . .

EXPOSE 3000

RUN npm ci
RUN npx tsc --noEmit --project tsconfig.json

ENTRYPOINT ["node", "dist/index.js"]