#!/usr/bin/env bash

set -eu

DIRNAME="$(dirname -- "$0")"

type flyctl > /dev/null

flyctl deploy --remote-only

npm ci --omit=dev
npm install esno
npx esno "${DIRNAME}/release-purge-cache.ts"
