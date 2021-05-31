#!/bin/sh
dockerize --wait tcp://db:3306 -timeout 50s docker-entrypoint.sh && node index.js