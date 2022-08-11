FROM node:lts as builder

WORKDIR /app

COPY . .

ENV SERVER_ENV production

RUN npm ci --prefer-offline --omit=dev
RUN npm run build

FROM node:lts

WORKDIR /app

COPY --from=builder /app .

ENV HOST 0.0.0.0
ENV PORT 8080

CMD [ "npm", "start" ]
