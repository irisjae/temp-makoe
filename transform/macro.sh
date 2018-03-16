#!/usr/bin/env bash
cd "$(dirname $0)"

cd ..

next="$1"

rm src/*
cp scenes/base.html src/base.html
find scenes -name "$next.*" | while read file; do
	cp "$file" "src/next.${file##*.}"
done

./transform/page.sh > dist/next.html

mv "assets/liquefied/" "go/assets/$next"
cat dist/next.html | sed s,assets/liquefied,assets/$next, > "go/$next.html"
