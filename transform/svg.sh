#!/usr/bin/env bash
cd "$(dirname $0)"
cd ..

cat transform/generator.js | node transform/svg.js
