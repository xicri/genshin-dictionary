#!/usr/bin/env bash

set -eu

DIRNAME="$(dirname -- "$0")"
PROJECT_ROOT="${DIRNAME}/.."

if [[ -f "${PROJECT_ROOT}/.env" ]]; then
  eval "$(cat "${PROJECT_ROOT}/.env" <(echo) <(declare -x))"
fi

if [[ -z "${AWS_ACCESS_KEY_ID:-}" ]]; then
  echo "AWS_ACCESS_KEY_ID is empty"
  exit 1
elif [[ -z "${AWS_SECRET_ACCESS_KEY:-}" ]]; then
  echo "AWS_SECRET_ACCESS_KEY is empty"
  exit 1
elif [[ -z "${REG_SUIT_GITHUB_CLIENT_ID:-}" ]]; then
  echo "REG_SUIT_GITHUB_CLIENT_ID is empty"
  exit 1
fi

git fetch origin

export HASH_PROD="$(git rev-parse origin/main)"

if [[ -z "${HASH_PR:-}" ]]; then
  if [[ -n "${CI:-}" ]]; then
    echo "[ERROR] An environment variable HASH_PR is not set."
    exit 1
  else
    export HASH_PR="$(git rev-parse HEAD)"
  fi
fi

if [[ "${HASH_PROD}" == "${HASH_PR}" ]]; then
  echo "[ERROR] This PR has no change against main branch"
  exit 1
fi

AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID}" AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY}" pnpm exec jiti "${PROJECT_ROOT}/scripts/vrt-reg-cleanup-r2.ts"

#
# upload current screenshots
#
rm -rf "${PROJECT_ROOT}/tmp/reg-suit/actual"
mv "${PROJECT_ROOT}/tmp/reg-suit/current" "${PROJECT_ROOT}/tmp/reg-suit/actual"

export EXPECTED_KEY=""
export ACTUAL_KEY="${HASH_PROD}"

pnpm exec reg-suit compare
pnpm exec reg-suit publish

#
# compare new screenshots and current ones
#
rm -rf "${PROJECT_ROOT}/tmp/reg-suit/workspace"
rm -rf "${PROJECT_ROOT}/tmp/reg-suit/actual"
mv "${PROJECT_ROOT}/tmp/reg-suit/new" "${PROJECT_ROOT}/tmp/reg-suit/actual"

export EXPECTED_KEY="${HASH_PROD}"
export ACTUAL_KEY="${HASH_PR}"

pnpm exec reg-suit run
