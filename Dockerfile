FROM node:18-slim as builder

WORKDIR /app

COPY . .

ENV SERVER_ENV production

RUN npm ci --prefer-offline --omit=dev
RUN npm run build

FROM node:18-slim

WORKDIR /app

RUN apt-get update -qq && apt-get upgrade --yes

COPY --from=builder /app .

ENV HOST 0.0.0.0
ENV PORT 8080
ENV SERVER_ENV production

CMD [ "npm", "start" ]
