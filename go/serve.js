var fs = require ('fs-extra')
var http = require("http");
var https = require('https');

var app = require ('./server')	

http .createServer (app .callback ()) .listen (80)
https .createServer ({
	key: fs .readFileSync ('/etc/letsencrypt/live/www.lovehistory.tech/privkey.pem') .toString (),
	cert: fs .readFileSync ('/etc/letsencrypt/live/www.lovehistory.tech/fullchain.pem') .toString ()
}, app .callback ()) .listen (443)
