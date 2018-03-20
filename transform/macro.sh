#!/usr/bin/env bash
cd "$(dirname $0)"

cd ..

next="$1"

[ -f "scenes/$next.svg" ] || {
	echo "$next does not seem to be a page?"
	exit 1
}

rm src/*
cp scenes/base.html src/base.html
find scenes -path "*$next.*" | while read file; do
	cp "$file" "src/next.${file##*.}"
done

./transform/page.sh > dist/next.html

rm -rf "go/assets/$next"
mkdir -p "$(dirname "go/assets/$next")"
mv "assets/liquefied/" "go/assets/$next"
mkdir -p "$(dirname "go/$next.html")"
cat dist/next.html | sed s,assets/liquefied,/assets/$next, > "go/$next.html"
