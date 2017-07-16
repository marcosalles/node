function PromotionController(app) {
	const self = this;
	const products = app.daos.ProductDao;

	app.get(self.form(), function (req, res) {
		products.all(function (error, products) {
			res.render('promotion/form', {products:products});
		});
	});

	app.post(self.change(), function (req, res, next) {
		const promotion = req.body;
		console.log(promotion);
		products.load(promotion.product.id, function (error, products) {
			if (error) {
				return next(error);
			}
			const product = products[0];
			promotion.product = product;
			app.io.emit('promotion', promotion);
			res.redirect(self.form());
		});
	});
}

PromotionController.prototype.path = function (path = '') {
	return '/promotions' + path;
};
PromotionController.prototype.change= function () {
	return this.path('/change');
};
PromotionController.prototype.form = function () {
	return this.path('/form');
};

module.exports = function(app) {
	return new PromotionController(app);
};