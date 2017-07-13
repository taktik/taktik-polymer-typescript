#!/bin/bash

##################
#
# This script distribute the project,
#
##################

echo "Default Bootstrap action"
npm install
bower install --allow-root

gulp clean

gulp ts

gulp dist