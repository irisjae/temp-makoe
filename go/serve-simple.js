var hostname = process .env .C9_HOSTNAME || 'localhost';
var port = process .env .PORT || 8080;

require ('./server') .listen (port)

console .log ('Listening at ' + hostname + ':' + port + '...')
