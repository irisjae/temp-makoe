var fs = require ('fs-extra')
var { R, T, so, go } = require ('metamorphoses')

var debug = true;

//TODO
var substring = sub => string => R .split (sub, string) .length > 1
var slot_capacity = slot =>
!! (! substring ('13/5/2018') (slot))?
	!! (substring ('Morning') (slot)) ?  4
	: !! (substring ('Noon') (slot)) ?  4
	: !! (substring ('Afternoon') (slot)) ?  2
	: 0
:
	!! (substring ('Morning') (slot)) ?  2
	: !! (substring ('Noon') (slot)) ?  2
	: !! (substring ('Afternoon') (slot)) ?  2
	: 0
var path_of = xs => require ('path') .join .apply (require ('path'), xs)
var get_timetable = () => 
	fs .readFile (path_of ( [ __dirname, 'submissions.json' ] ))
	. then (x => JSON . parse (x))
var add_to_timetable = request => {;
	;var timetable = JSON . parse (fs .readFileSync (path_of ( [ __dirname, 'submissions.json' ] )))

	var primary_competitors = timetable [request .first] .first
	var secondary_competitors = timetable [request .second] .second
	var tertiary_competitors = timetable [request .third] .third

	if (primary_competitors .length >= slot_capacity (request .first)
	&& (! R .contains (request .team_id, primary_competitors))) {
		; throw new Error ('first') }
	else if (secondary_competitors .length >= slot_capacity (request .second)
	&& (! R .contains (request .team_id, secondary_competitors))) {
		; throw new Error ('second') }
	else if (tertiary_competitors .length >= slot_capacity (request .third)
	&& (! R .contains (request .team_id, tertiary_competitors))) {
		; throw new Error ('third') }

	;T (timetable
	) (
	[ remove_team_traces (request .team_id)
	, add_team_requests (request .team_id) (request)
	, x => { ;fs .outputJSONSync (path_of ( [ __dirname, 'submissions.json' ] ), x) } ])
}
var then = fn => p => p .then (fn)
var timetable_to_occupations = timetable => T (timetable) ([
	R .toPairs,
	R .map (_x_ => T (R .last (_x_)) ([
		R .map (x => (x .length >= slot_capacity (R .head (_x_)))),
		x => !! (x .first) ? 'first'
			: !! (x .second) ? 'second'
			: !! (x .third) ? 'third'
			: null,
		x => [R .head (_x_), x] ])),
	R .fromPairs ])
var remove_team_traces = id => slots => T (slots) (R .map (R .map (R .without ([ id ]))))
var add_team_requests = id => stuff => slots => T (slots) ([
	R .assoc (stuff .first, R .assoc ('first', R .union (slots [stuff .first] .first, [ id ]), slots [stuff .first])),
	R .assoc (stuff .second, R .assoc ('second', R .union (slots [stuff .second] .second, [ id ]), slots [stuff .second])),
	R .assoc (stuff .third, R .assoc ('third', R .union (slots [stuff .third] .third, [ id ]), slots [stuff .third])) ])
var authenticate = x => y =>
	fs .readFile ( path_of ([ __dirname , 'applicants.json' ]) )
	.then (x => JSON .parse (x))
	.then (applicants => {;
		if (applicants [x] && R .contains (y, applicants [x] .teacher_email)) {}
		else {
			;throw new Error ('Could not recognize team ID ' + x + ' and teacher email ' + y + '!') } })

var filename_extension = filename =>
	so ((_=_=>
	!! parts .length > 0 ? '.' + R .last (parts)
	: '',
	where
	, parts = filename .split ('.') )=>_)
var filename_name = filename =>
	so ((_=_=>
	!! parts .length > 0 ? T (parts) ([ R .slice (0) (-1), R .join ('.') ])
	: filename,
	where
	, parts = filename .split ('.') )=>_)





module .exports = require ('koa-qs') (new (require ('koa')) ())
	.use (require ('koa-compress') ())
	.use (require ('koa-cors') ())
	.use (function (ctx, next) {
		return next ()
			.catch (function (err) {
				console .error (err)
				
				;ctx .type = 'application/json'
				;ctx .status = /*err .code || */500
				//ctx .message = err .message || 'Internal Server Error'
				;ctx .body = {
					error:	err .message
				}
				if (debug) {
					;ctx .body .stack = err .stack; }
			});
	})
	.use (require ('koa-morgan') ('combined'))
	.use (require ('koa-body') ({ multipart: true, formidable: { maxFileSize: 20 * 1024 * 1024 * 1024 } }))
	.use (require ('koa-json') ())
	.use (require ('koa-router') ()
		.post ('/send-final', (ctx, next) => 
			go
			.then (_ => {
				var body = ctx .request .body
				var team_id = body .team_id
				var teacher_email = body .teacher_email
				var file = ctx .request .files .upload

				return authenticate (team_id) (teacher_email)
				.then (_ => {
					var timestamp = (new Date) .toLocaleString ()
					var filename = team_id + '-' + timestamp + filename_extension (file .name)
					;fs .createReadStream (file .path) .pipe (fs .createWriteStream (path_of ( [ __dirname, 'final', filename ] )))
					;console.log('uploading ' + file .name + ' as ' + filename) })
				.then (_ => ({ ok: true }))
				.catch (_x => ({ error: _x .message }))})
			.then (x => { ;ctx .body = x })
			//.then (next)
		)
		.post ('/send-submit', (ctx, next) => 
			go
			.then (() => {
				var requests = ctx .request .body

				return authenticate (requests .team_id) (requests .teacher_email)
				.then (get_timetable)
				.then (slot => {;
					var requests = ctx .request .body

					try {
						;add_to_timetable (requests)
						return { ok: true } }
					catch (e) {
						if (e .message == 'first') {
							return { error: 'Your first choice is full' } }
						else if (e .message == 'second') {
							return { error: 'Your second choice is full' } }
						else if (e .message == 'third') {
							return { error: 'Your third choice is full' } }
						else {
							console .error (e)
							return { error: 'An unexpected error occured' } }}

				})
				.catch (x => {
					return { error: x .message } })})
			.then (x => {
				;ctx .body = x
			})
			//.then (next)
		)
		.post ('/send-apply', (ctx, next) => 
			go
			.then (x => ctx .request .body)
			.then (x => {
				var uuid = require ('uuid/v4') ()
				var path = path_of ( [ __dirname, 'applications', uuid ] )
				return fs .outputJSON (path, x)
			})
			.then (x => ({ ok: true }))
			.catch (x => {
				console .error (x)
				return { error: 'An unexpected error occured' }
			})
			.then (x => {
				;ctx .body = x
			})
			//.then (next)
		)
		.get ('/applications.csv', (ctx, next) => 
			go
			.then (x => fs .readdir (path_of ( [ __dirname, 'applications' ] )))
			.then (x => Promise .all (x .map (x => fs .readFile (path_of ( [ __dirname, 'applications', x ] )))))
			.then (R .map (x => JSON .parse (x)))
			.then (R .uniq)
			.then (apps => apps .map (app => {
				var students_info = app .students_info
				app = R .omit (['students_info'], app)
				; [1, 2, 3, 4, 5] .forEach (num => {
					; ['name', 'grade', 'mobile', 'email'] .forEach (attribute => {
						if (! students_info [num - 1])
							app ['student_' + num + '_' + attribute] = ''
						else if (! students_info [num - 1] [attribute])
							app ['student_' + num + '_' + attribute] = ''
						else
							app ['student_' + num + '_' + attribute] = students_info [num - 1] [attribute]
					})
				})
				return app
			}))
			.then (apps => {
				if (! apps .length)
					return []
				var index = R .sort ((a, b) => !! (a > b) ? 1 : !! (a < b) ? -1 : 0, R .keys (R .head (apps)))
				return R .concat ([index], apps .map (app => index .map (key => app [key])))})
			.then (arrays =>
				'\uFEFF' + arrays .map (array => array .map (x => '"' + x .split ('"') .join ('""') + '"') .join (',')) .join ('\r'))
			.then (x => { ;ctx .body = x })
			//.then (next)
		)
		.get ('/(chi|eng)/workshop', (ctx, next) => 
			go
			.then (x => Promise .all ([
				fs .readFile (path_of ( [ __dirname, ctx .url + '.html' ] )) ,
				get_timetable ()
			]))
			.then (_x_ => T (R .head (_x_)) ([
				x => x . toString (),
				R .split ('...dynamic code...'),
				R .join (
					'slot_occupations (' + T (R .last (_x_)) ([
						timetable_to_occupations,
						JSON .stringify ])
						+ ')' ) ]))
			.then (x => { ;ctx .body = x })
			//.then (next)
		)
		.routes ()
	)
	.use (require ('koa-static') (__dirname, { extensions: ['html'] }))
