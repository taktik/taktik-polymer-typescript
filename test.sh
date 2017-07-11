#!/bin/bash

##################
#
# This script bootstrap the project,
# run unit test on browserstack and build that application
#
##################

echo "Default Bootstrap action"
npm install
bower install --allow-root
gulp clean

gulp ts

echo "Run unit test"
gulp test:browserstack


echo 'build frontend'
gulp build