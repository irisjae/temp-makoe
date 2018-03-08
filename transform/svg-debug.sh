#!/usr/bin/env bash
cd "$(dirname $0)"
cd ..

cat transform/generator.js | node --inspect-brk transform/svg.js 
