function ProductControllerTest(request, databaseCleaner) {
	console.log(databaseCleaner);
	const product = this.product();

	describe('ProductController', function () {

		afterEach(function (done) {
			databaseCleaner.cleanAll(function (error, result) {
				if (!error) {
					done();
				} else {
					console.log(error);
				}
			});
		});

		it('should list products as json', function (done) {
			request.get('/products')
				.set('Accept', 'application/json')
				.expect(200)
				.expect('Content-Type', /application\/json/)
				.end(done);
		});

		it('should create a new product', function (done) {
			request.post('/products/save')
				.send(product)
				.expect(302)
				.end(done);
		});

	});
}

ProductControllerTest.prototype.product = function () {
	return {
		title: 'Node.js',
		sku: 'node',
		price: 10.0
	};
};

module.exports = function (request, databaseCleaner) {
	return new ProductControllerTest(request, databaseCleaner);
};