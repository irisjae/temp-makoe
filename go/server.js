var R = require ('ramda')
var debug = true;

module .exports = require ('koa-qs') (new (require ('koa')) ())
	.use (require ('koa-compress') ())
	.use (require ('koa-cors') ())
	.use (function (ctx, next) {
		return next ()
			.catch (function (err) {
				console .error (err)
				
				ctx .type = 'application/json'
				ctx .status = /*err .code || */500
				//ctx .message = err .message || 'Internal Server Error'
				ctx .body = {
					error:	err .message
				}
				if (debug)
					ctx .body .stack = err .stack;
			});
	})
	.use (require ('koa-morgan') ('combined'))
	.use (require ('koa-bodyparser') ())
	.use (require ('koa-json') ())
	.use (require ('koa-static') (__dirname, { extensions: ['html'] }))
	.use (require ('koa-router') ()
		.post ('/send-apply', (ctx, next) => {
			return Promise .resolve ()
			.then (x => ctx .request .body)
			.then (x => {
				var uuid = require ('uuid/v4') ()
				var path = require ('path') .join (__dirname, 'applications', uuid)
				return require ('fs-extra') .outputJSON (path, x)
			})
			.then (x => ({ ok: true }))
			.catch (x => {
				console .error (x)
				return { error: 'An unexpected error occured' }
			})
			.then (x => {
				ctx .body = x
			})
			.then (next)
		})
		.get ('/applications.csv', (ctx, next) => {{
			return Promise .resolve ()
			.then (x => require ('fs-extra') .readdir (require ('path') .join (__dirname, 'applications')))
			.then (x => Promise .all (x .map (x => require ('fs-extra') .readFile (require ('path') .join (__dirname, 'applications', x)))))
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
			.then (x => { ctx .body = x })
			.then (next)
		}})
		.routes ()
	)
