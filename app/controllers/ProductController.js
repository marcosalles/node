function ProductController(app) {
	const products = app.daos.ProductDao;
	const Product = app.models.Product;
	const self = this;

	app.get(self.list(), function (req, res, next) {
		products.all(function (error, result) {
			if (error) {
				return next(error);
			}
			const productList = result || [];
			res.format({
				html: function () {
					res.render('product/list', {products: productList});
				},
				json: function () {
					res.json(productList);
				}
			});

		});
	});

	app.get(self.form(), function (req, res) {
		const id = req.query.id;
		products.load(id, function(error, result) {
			let product = new Product();
			if (result && result[0]) {
				product = result[0];
			}
			res.render('product/form', {product: product, errors: []});
		});
	});

	app.post(self.save(), function (req, res) {
		const product = req.body;
		req.assert('title', 'Title can\'t be empty').notEmpty();
		req.assert('sku', 'SKU can\'t be empty').notEmpty();

		const validationErrors = req.validationErrors();
		if (validationErrors) {
			res.status(400).render('product/form', {product: product, errors: validationErrors});
			return;
		}
		products.save(product, function (error, result) {
			if (error) res.status(400).render('product/form', {product: product, errors: [error]});
			if (result) res.redirect(self.list());
		});
	});

	app.get(self.delete(), function (req, res, next) {
		const id = req.query.id;
		products.delete(id, function(error, result) {
			if (error) {
				return next(error);
			}
			res.redirect(self.list());
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
ProductController.prototype.delete = function () {
	return this.path('/delete');
}


module.exports = function (app) {
	return new ProductController(app);
}