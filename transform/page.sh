#!/usr/bin/env bash
cd "$(dirname $0)"

cd ..

./transform/svg.sh > dist/next.svg

cat src/base.html
echo
echo "<script>"
cat src/next.js
echo "</script>"
echo
cat dist/next.svg
