#!/bin/bash
source ./scripts/scriptLib.bash

LAMBDA_NAME="invokeAfvGlobalPstnRouting"

echo "${mag}Running tests for ${LAMBDA_NAME}...${white}"

yarn install --ignore-engines --silent
yarn test

echo "${grn}All tests passed for ${LAMBDA_NAME}${white}"
