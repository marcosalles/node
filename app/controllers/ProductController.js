function ProductController(app) {
	const products = app.daos.ProductDao;

	app.get(this.list(), function (req, res) {
		products.all(function(error, result) {
			const productList = result;
			res.render('product/list', {products: productList});
		});
	});

	app.get(this.form(), function (req, res) {
		console.log('id: ',req.get('id'));
		const product = {};
		res.render('product/form', {product: product, error: undefined});
	});

	app.post(this.save(), function (req, res) {
		const product = req.body;
		products.save(product, function(error, result) {
			if (error) res.render('product/form', {product: product, error: error});
			if (result) res.redirect(this.list());
		});
	});
}

ProductController.prototype.path = function (path) {
	return "/products" + ( path ? path : '');
}
ProductController.prototype.list = function () {
	return this.path('/');
}
ProductController.prototype.form = function () {
	return this.path('/form');
}
ProductController.prototype.save = function () {
	return this.path('/save');
}


module.exports = function(app) {
	new ProductController(app);
}