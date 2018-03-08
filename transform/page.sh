#!/usr/bin/env bash
cd "$(dirname $0)"

cd ..

./transform/svg.sh > scenes/next.svg

cat scenes/base.html
echo
echo "<script>"
cat interact/next.js
echo "</script>"
echo
cat scenes/next.svg
