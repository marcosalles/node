const http = require('http');

http.get({
	hostname: 'localhost',
	port: 3000,
	path: '/products',
	headers: {
		'Accept': 'application/json'
	}
}, function (res) {
	res.on('data', function (body) {
		console.log(res.statusCode, body.toString());
	})
});