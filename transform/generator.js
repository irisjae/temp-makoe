var auto = require ('__auto')
auto (() => {

var Oo = require ('o-o-o-o-o') .Oo;
var o = require ('o-o-o-o-o') .o;
var oO = require ('o-o-o-o-o') .oO;
var R = require ('ramda');

        var next = auto .frame ('next')
	next .querySelector ('title') .remove ()
        Array .from (next .querySelectorAll ('#hint[for="anchor"]')) .forEach (x => {
                x .outerHTML = auto .anchor_ify (x);
        })
        Array .from (next .querySelectorAll ('#hint[for=input]')) .forEach (x => {
                x .outerHTML = auto .input_ify (x)
        })
        Array .from (next .querySelectorAll ('#hint[for="text-area"]')) .forEach (x => {
                x .outerHTML = auto .textarea_ify (x)
        })
        Array .from (next .querySelectorAll ('#hint[for="select"]')) .forEach (x => {
                x .outerHTML = auto .select_ify (x);
        })
	Oo (Array .from (next .querySelectorAll ("[href]:not([tabindex='-1']),"
			+ "area[href]:not([tabindex='-1']),"
			+ "input:not([disabled]):not([tabindex='-1']),"
			+ "select:not([disabled]):not([tabindex='-1']),"
			+ "textarea:not([disabled]):not([tabindex='-1']),"
			+ "button:not([disabled]):not([tabindex='-1']),"
			+ "iframe:not([tabindex='-1']),"
			+ "[tabindex]:not([tabindex='-1']),"
			+ "[contentEditable=true]:not([tabindex='-1'])"
		)),
		o (R .reverse),
		o (R .toPairs),
		oO (R .forEach (x => {
			var afters = x [0]
			var node = x [1]
			node .setAttribute ('tabindex', (+ afters + 1))
		})))
        return next
})
