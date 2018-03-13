var Oo = require ('o-o-o-o-o') .Oo
var o = require ('o-o-o-o-o') .o
var oO = require ('o-o-o-o-o') .oO

var fs = require ('fs-extra')
var path = require ('path')
var read_stdin = require ('get-stdin');

var scene = require ('../.nephyrite/transform/ui/scenes/scenes');
var auto = require ('../.nephyrite/transform/ui/scenes/auto');

var read_rehydrator = x => {
	if (!x) return;
	return x .split ('`') [1]
}

var dist = path .resolve (process .argv [2]);
read_stdin () .then (x => {
	var transformed = scene ('next', x);

	fs .emptyDirSync (dist)

	auto .image_url_dehydration .rehydrators .forEach ((x, i) => {
		fs .outputFileSync (path .join (dist, i + '.' + x .type), x .data)
	})
}) .catch (x => {
	console .error (x)
})
