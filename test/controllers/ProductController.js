const http = require('http');
const assert = require('assert');

describe('ProductController', function () {
	it('should list products as json', function (done) {
		var configuracoes = {
			hostname: 'localhost',
			port: 3000,
			path: '/products',
			headers: {
				'Accept': 'application/json'
			}
		};
		http.get(configuracoes, function (res) {
			assert.equal(res.statusCode, '200');
			assert.contains(res.headers['content-type'], 'application/json');
			done();
		});
	});
});