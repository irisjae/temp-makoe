var auto = require ('__auto')
auto (() => {

var Oo = require ('o-o-o-o-o') .Oo;
var o = require ('o-o-o-o-o') .o;
var oO = require ('o-o-o-o-o') .oO;
var R = require ('ramda');
var embed = (x, y, z) =>
`<${x}></${x}>
<script>
	;(function () {
		var x = document .querySelector ('${x}') .parentElement .querySelector ('rect')
		var html = black_wrap (atob ('${Buffer.from(y).toString('base64')}'), ${JSON.stringify(z)})
		inject_rect (html, x)
	})()
</script> `

        var next = auto .frame ('next')
	;Oo (next .querySelector ('title'), oO (x => {{ x && x .remove () }}))
        ;Array .from (next .querySelectorAll ('taken')) .forEach (x => {{
                ;x .style .visibility = 'hidden' }})
        ;Array .from (next .querySelectorAll ('#hint[for="anchor"]')) .forEach (x => {{
                ;x .outerHTML = auto .anchor_ify (x) }})
        ;Array .from (next .querySelectorAll ('#hint[for=input]')) .forEach (x => {{
                ;x .outerHTML = auto .input_ify (x) .replace (/type=[^\s]+/g, '') }})
        ;Array .from (next .querySelectorAll ('#hint[for=text]')) .forEach (x => {{
                ;x .outerHTML = auto .text_ify (x) }})
        ;Array .from (next .querySelectorAll ('#hint[for="text-area"]')) .forEach (x => {{
                ;x .outerHTML = auto .textarea_ify (x) }})
        ;Array .from (next .querySelectorAll ('#hint[for="select"]')) .forEach (x => {{
                ;x .outerHTML = auto .select_ify (x) }})
	;Oo (Array .from (next .querySelectorAll ("[href]:not([tabindex='-1']),"
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
		oO (R .forEach (_x_ => {{
			var afters = _x_ [0]
			var node = _x_ [1]
			;node .setAttribute ('tabindex', (+ afters + 1))
		}})))
	//add to the base.html, the function to make black_box
	;Oo (next .querySelectorAll ('#launch-video #hint[for=video]rect, #launch-video #hint[for=video] rect'),
		oO (R .forEach (x => {{
			x .setAttribute ('fill', '#00000000')
			x .parentElement .innerHTML += embed ('launch-video', '<iframe width="560" height="315" src="https://www.youtube.com/embed/SogZCnmd7d0?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
		}})))
	;Oo (next .querySelectorAll ('#launch-photos #hint[for=album]rect, #launch-photos #hint[for=album] rect'),
		oO (R .forEach (x => {{
			x .parentElement .setAttribute ('fill', '#00000000')
			x .parentElement .innerHTML += embed ('launch-photos', '<iframe src="https://www.kodingkingdom.com/home/wp-admin/admin-ajax.php?action=h5p_embed&id=1" width="958" height="704" frameborder="0" allowfullscreen="allowfullscreen"></iframe><script src="https://www.kodingkingdom.com/home/wp-content/plugins/h5p/h5p-php-library/js/h5p-resizer.js" charset="UTF-8"></script>', 'padding-bottom: 10px;')
		}})))
	;Oo (next .querySelectorAll ('#red-cliff #hint[for=video]rect, #red-cliff #hint[for=video] rect'),
		oO (R .forEach (x => {{
			x .parentElement .setAttribute ('fill', '#00000000')
			x .parentElement .innerHTML += embed ('red-cliff', '<iframe width="560" height="315" src="https://www.youtube.com/embed/h_kqgzjSA4w?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
		}})))
	;Oo (next .querySelectorAll ('#interviews #hint[for=video]rect, #interviews #hint[for=video] rect'),
		oO (R .forEach (x => {{
			x .parentElement .setAttribute ('fill', '#00000000')
			x .parentElement .innerHTML += embed ('interviews', '<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PL-3gobmUv_5zn84HuoAFT65hTlhG0FHd4" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
		}})))
	;Oo (next .querySelectorAll ('#finalists #hint[for=video]rect, #finalists #hint[for=video] rect'),
		oO (R .forEach (x => {{
			x .parentElement .setAttribute ('fill', '#00000000')
			x .parentElement .innerHTML += embed ('finalists', '<iframe width="640" height="360" src="https://www.youtube.com/embed/wG5XjDhFFug?ecver=2" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
		}})))
        return next
})
