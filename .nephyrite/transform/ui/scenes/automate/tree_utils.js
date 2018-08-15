var window = require ('__window');
var document = window .document;

var frag = function (html) {
	var container = document .createElement ('template');
	container .innerHTML = html;
	return container .content;
}; 
var svg_ = function (el) {
	while (el .tagName .toUpperCase () !== 'SVG') {
		el = el .parentElement;
	} 
	return el;
};
var clip_ = function (x) {
	var url = x .getAttribute ('clip-path');
	var id = url .match (/url\((.*)\)/) [1];
	return svg_ (x) .querySelector (id);
};
var path_ = function (x) {
	return x .querySelector ('path');
};
var hint_ = function (x) {
	return x .querySelector ('#hint');
};
var hint_bounds = function (hint) {
	return bound_rectangle (hint_path (hint));
};
var hint_path = function (hint) {
	return use_path (hint_use (hint))
};
var hint_use = function (hint) {
	return hint .querySelector ('use');
};
var use_bounds = function (use) {
	return bound_rectangle (use_path (use))
};
var use_path = function (use) {
	var id = use .getAttribute ('xlink:href') || use .getAttribute ('href');//console.log(id);
	return svg_ (use) .querySelector (id);
};
var hint_rect = function (hint) {
	return hint .querySelector ('rect') || (hint .tagName . toLowerCase () === 'rect' && hint);
}
var rect_bounds = function (rect) {
	return {
		x_min: 0,
		x_max: rect .getAttribute ('width'),
		y_min: 0,
		y_max: rect .getAttribute ('height'),
	}
};
var bound_rectangle = function (path) {
	var d = path .getAttribute ('d');
	var path_segments = require ('svg-path-parser') .makeAbsolute (require ('svg-path-parser') (d));
	var path_points = path_segments .map (function (segment) {
			return {
				x: segment .x,
				y: segment .y
			}
		});
	var point_xs = path_points .map (function (path) { return path .x })
	var point_ys = path_points .map (function (path) { return path .y })
	return {
		x_min: Math .min .apply (null, point_xs),
		x_max: Math .max .apply (null, point_xs),
		y_min: Math .min .apply (null, point_ys),
		y_max: Math .max .apply (null, point_ys),
	}
};

/*var isolated_step = function (i) {
	return function (dom, selector, depth) {
		if (depth === undefined)
			depth = dom_depth (dom);
		if (depth === 0)
			return null;
		else {
			
		}
	}
}

var dom_depth = function (x, depth) {
	depth = depth || 5;
	var max = Math .Infinity;
	var min = 0;
	while (max !== min) {
		if (max === Math .Infinity) depth = depth * 2;
		else depth = Math .ceiling ((max + min) / 2);
		var works = x .querySelector ((new Array (depth)) .fill ('*') .join ('>'));
		if (works) min = depth;
		else max = depth - 1;
	}
	return max;
}*/

var y_translation = function (g) {
	return + hint_use (g) .getAttribute ('transform') .match (/translate\(-?\d+ (-?\d+)\)/) [1]
}
var x_translation = function (g) {
	return + hint_use (g) .getAttribute ('transform') .match (/translate\((-?\d+) -?\d+\)/) [1]
}
var walk_dom = function (node, func) {
	var continue_ = (func (node) !== false);
	node = node .firstElementChild;
	while (continue_ && node) {
		walk_dom (node, func);
		node = node .nextElementSibling;
	}
};

module .exports = {
	frag: frag,
	svg_: svg_,
	clip_: clip_,
	path_: path_,
	hint_: hint_,
	hint_bounds: hint_bounds,
	hint_path: hint_path,
	hint_use: hint_use,
	use_bounds: use_bounds,
	use_path: use_path,
	bound_rectangle: bound_rectangle,
	hint_rect: hint_rect,
	rect_bounds: rect_bounds,
	y_translation: y_translation,
	x_translation: x_translation,
	walk_dom: walk_dom
};
