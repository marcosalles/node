function ProductControllerTest(request, databaseCleaner, productDao) {
	const self = this;
	const products = productDao;

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

		it('should access product list in json', function (done) {
			request.get('/products')
				.set('Accept', 'application/json')
				.expect(200)
				.expect('Content-Type', /application\/json/)
				.end(done);
		});
		it('should access product list in html', function (done) {
			request.get('/products')
				.expect(200)
				.expect('Content-Type', /text\/html/)
				.end(done);
		});

		it('should create a new product', function (done) {
			request.post('/products/save')
				.send(self.product())
				.expect(302)
				.end(done);
		});

		it('should delete a product', function (done) {
			products.save(self.product(), function (error, result) {
				if (!error) {
					request.get('/products/delete')
						.send({id: result.insertId})
						.expect(302)
						.end(done);
				}
			});
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

module.exports = function (request, databaseCleaner, productDao) {
	return new ProductControllerTest(request, databaseCleaner, productDao);
};