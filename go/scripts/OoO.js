var OoO = (function () {
	try {
		var hole_marker = R .__
	}
	catch (e) {
		var hole_marker = {}
	}

	var fill_holes = function (args, holes) {
		return function () {
			args = args .slice (0);
			holes = holes .slice (0);
			var i;

			if (arguments .length >= holes .length) {
				for (i = 0; i < holes .length; i ++) {
					args [holes [i]] = arguments [i];
				}
				for (i = 1; i < args .length; i ++) {
					args [0] = args [i] (args [0]);
				}
				return args [0];
			}
			else {
				for (i = 0; i < arguments .length; i ++) {
					args [holes [0]] = arguments [i];
					holes .shift ();
				}
				return fill_holes (args, holes);
			}
		};
	}

	var OoO = function () {
		var i;
		var args = new Array (arguments .length);
		var holes = [];

		for (i = 0; i < arguments .length; i ++) {
			args [i] = arguments [i];
			if (args [i] === hole_marker)
				holes .push (i);
		}
		if (! holes .length) {
			for (i = 1; i < args .length; i ++) {
				args [0] = args [i] (args [0]);
			}
			return args [0];
		}
		else {
			return fill_holes (args, holes);
		}
	};
	OoO .Oo = OoO;
	OoO .o = function (x) {return x;};
	OoO .oO = function (x) {return x;};

	return OoO;
}) ()

window .Oo = OoO .Oo;
window .o = OoO .o;
window .oO = OoO .oO;
