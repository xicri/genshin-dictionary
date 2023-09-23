FROM node:20-slim

WORKDIR /app

COPY . .

ENV HOST 0.0.0.0
ENV PORT 8080
ENV SERVER_ENV production

RUN apt-get update -qq && apt-get upgrade --yes
RUN npm ci --prefer-offline --omit=dev
RUN npm run build

CMD [ "npm", "start" ]
