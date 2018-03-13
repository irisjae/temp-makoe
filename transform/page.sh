#!/usr/bin/env bash
cd "$(dirname $0)"

cd ..

cat transform/generator.js | node transform/svg.js > dist/next.svg
cat transform/generator.js | node transform/assets.js ./assets/liquefied

cat src/base.html
echo
echo "<script>"
cat src/next.js 2> /dev/null
echo "</script>"
echo
cat dist/next.svg
