var debug = true;

var hostname = process .env .C9_HOSTNAME || 'localhost';
var port = process .env .PORT || 8080;


require ('koa-qs') (new (require ('koa')) ())
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
	.use (require ('koa-router') () .post ('/send-apply', (ctx, next) => {
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
	}) .routes ())
	
	.listen (port);

console .log ('Listening at ' + hostname + ':' + port + '...')
