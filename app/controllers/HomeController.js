function HomeController(app) {
	const products = app.daos.ProductDao;

	app.get(this.home(), function (req, res) {
		products.all(function (error, products) {
			res.render('home/home', {products: products});
		});
	});
}

HomeController.prototype.home = function() {
	return '/';
};

module.exports = function(app) {
	return new HomeController(app);
};