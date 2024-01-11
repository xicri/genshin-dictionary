#!/usr/bin/env bash

set -eu

type flyctl > /dev/null

cp Dockerfile Dockerfile_staging
sed -i -e 's/production/staging/g' Dockerfile_staging
flyctl deploy --remote-only --app=genshin-dictionary-staging --dockerfile=Dockerfile_staging
