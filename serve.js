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
	
	.listen (port);

console .log ('Listening at ' + hostname + ':' + port + '...')
