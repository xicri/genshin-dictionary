#!/usr/bin/env bash

set -eu

DIRNAME="$(dirname -- "$0")"
PROJECT_ROOT="${DIRNAME}/.."

git fetch origin

export HASH_PROD="$(git rev-parse origin/main)"
export HASH_PR="${GITHUB_SHA:-$(git rev-parse HEAD)}"

if [[ "${HASH_PROD}" == "${HASH_PR}" ]]; then
  echo "[ERROR] This PR has no change against main branch"
  exit 1
fi

node "${PROJECT_ROOT}/scripts/vrt-reg-cleanup-r2.mjs"

#
# upload current screenshots
#
rm -rf "${PROJECT_ROOT}/tmp/reg-suit/actual"
mv "${PROJECT_ROOT}/tmp/reg-suit/current" "${PROJECT_ROOT}/tmp/reg-suit/actual"

export EXPECTED_KEY=""
export ACTUAL_KEY="${HASH_PROD}"

npx reg-suit compare
npx reg-suit publish

#
# compare new screenshots and current ones
#
rm -rf "${PROJECT_ROOT}/tmp/reg-suit/workspace"
rm -rf "${PROJECT_ROOT}/tmp/reg-suit/actual"
mv "${PROJECT_ROOT}/tmp/reg-suit/new" "${PROJECT_ROOT}/tmp/reg-suit/actual"

export EXPECTED_KEY="${HASH_PROD}"
export ACTUAL_KEY="${HASH_PR}"

npx reg-suit run
