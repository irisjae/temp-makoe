#!/usr/bin/env bash
cd "$(dirname $0)"
cd ..

cat next.js | node --inspect-brk transform/svg.js 
