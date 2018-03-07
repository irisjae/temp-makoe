var auto = require ('__auto')
auto (() => {
	var next = auto .frame ('next')
	Array .from (next .querySelectorAll ('[input]')) .forEach (x => {
		x .outerHTML = auto .input_ify (x)
	})
	return next
})
