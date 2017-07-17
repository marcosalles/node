function PromotionController(app) {
	const self = this;
	const products = app.daos.ProductDao;

	self.form = '/promotions/form';
	self.change = '/promotions/change';

	app.get(self.form, function (req, res, next) {
		products.all(function (error, products) {
			res.render('promotion/form', {products: products});
		});
	});

	app.post(self.change, function (req, res, next) {
		const promotion = req.body;
		products.load(promotion.product.id, function (error, products) {
			if (error) return next(error);

			const product = products[0];
			promotion.product = product;
			app.io.emit('promotion', promotion);
			res.redirect(self.form);
		});
	});
}

module.exports = function(app) {
	return new PromotionController(app);
};