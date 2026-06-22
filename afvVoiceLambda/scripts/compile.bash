#!/bin/bash
source ./scripts/scriptLib.bash

LAMBDA_NAME="invokeAfvGlobalPstnRouting"
OUTPUT_DIR="dist"

echo "${mag}Compiling ${LAMBDA_NAME} lambda function...${white}"

# Install production dependencies
echo "${blu}Installing production dependencies...${white}"
yarn install --ignore-engines --production --silent

# Run unit tests
echo "${blu}Running unit tests...${white}"
yarn install --ignore-engines --silent
yarn test

# Create output directory
echo "${blu}Creating deployment package...${white}"
rm -rf ${OUTPUT_DIR}
mkdir -p ${OUTPUT_DIR}

# Package lambda (source + node_modules only)
zip -r ${OUTPUT_DIR}/${LAMBDA_NAME}.zip \
  handler.js \
  config.js \
  globalPstnRoutingApi.js \
  secretUtils.js \
  utils.js \
  axiosWrapper.js \
  SCVLoggingUtil.js \
  node_modules/ \
  -x "node_modules/.cache/*" \
  -x "node_modules/jest*" \
  -x "node_modules/rewire*" \
  -x "node_modules/selfsigned*" \
  -x "node_modules/dotenv*"

echo "${grn}Deployment package created: ${OUTPUT_DIR}/${LAMBDA_NAME}.zip${white}"
echo "${grn}Package size: $(du -sh ${OUTPUT_DIR}/${LAMBDA_NAME}.zip | cut -f1)${white}"
