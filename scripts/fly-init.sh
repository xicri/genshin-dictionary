#!/usr/bin/env bash

set -eu

DIRNAME="$(dirname -- "$0")"

type flyctl > /dev/null

# Create production server
flyctl launch --name=genshin-dictionary --now
fly scale count 1 --region=nrt --app=genshin-dictionary
fly scale count 1 --region=hkg --app=genshin-dictionary
fly scale count 1 --region=bos --app=genshin-dictionary

# Create staging server
cp Dockerfile Dockerfile_staging
sed -i -e 's/production/staging/g' Dockerfile_staging
flyctl launch --name=genshin-dictionary-staging --dockerfile=Dockerfile_staging --now
