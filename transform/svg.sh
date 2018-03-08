#!/usr/bin/env bash
cd "$(dirname $0)"
cd ..

cat next.js | node transform/svg.js
