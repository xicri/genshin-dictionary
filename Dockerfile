FROM node:18-slim

WORKDIR /app

COPY . .

ENV SERVER_ENV production
ENV HOST 0.0.0.0
ENV PORT 8080

RUN apt-get update -qq && apt-get upgrade --yes && \
  npm ci --prefer-offline && \
  npm run build && \
  rm -rf ./node_modules && \
  npm ci --prefer-offline --omit=dev

CMD [ "npm", "start" ]
