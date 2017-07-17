function HomeController(app) {
	const self = this;
	const products = app.daos.ProductDao;

	self.home = '/';

	app.get(self.home, function (req, res, next) {
		products.all(function (error, products) {
			if (error) return next(error);

			res.render('home/home', {products: products});
		});
	});
}

module.exports = function(app) {
	return new HomeController(app);
};