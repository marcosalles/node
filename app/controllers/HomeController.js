function HomeController(app) {
	const products = app.daos.ProductDao;

	app.get('/', function (req, res) {
		products.all(function (error, products) {
			res.render('home/home', {products:products});
		});
	});
}

module.exports = function(app) {
	return new HomeController(app);
}