FROM node:18-slim as builder

WORKDIR /app

COPY . .

ENV SERVER_ENV production

# Workaround for a bug in Webpack 4. It is fixed in Webpack 5, but not in 4.
# This should be removed when I upgrade to Nuxt 3.
# See: https://github.com/webpack/webpack/issues/14532#issuecomment-947515866
ENV NODE_OPTIONS "--openssl-legacy-provider"

RUN npm ci --prefer-offline --omit=dev
RUN npm run build

FROM node:18-slim

WORKDIR /app

RUN apt-get update -qq && apt-get upgrade --yes

COPY --from=builder /app .

ENV HOST 0.0.0.0
ENV PORT 8080
ENV SERVER_ENV production

# Workaround for a bug in Webpack 4.
ENV NODE_OPTIONS "--openssl-legacy-provider"

CMD [ "npm", "start" ]
