var read_stdin = require ('get-stdin');

var scene = require ('../.nephyrite/transform/ui/scenes/scenes');
var auto = require ('../.nephyrite/transform/ui/scenes/auto');

var read_rehydrator = x => {
	if (!x) return;
	return x .split ('`') [1]
}

read_stdin () .then (x => {
	var transformed = scene ('next', x);
	console .log (read_rehydrator (auto .js_dehydration .rehydrators [0]) || transformed)
}) .catch (x => {
	console .error (x)
})
