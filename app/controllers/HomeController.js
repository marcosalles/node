function HomeController(app) {
	const productController = app.controllers.ProductController;

	app.get('/', function (req, res) {
		res.render('home/home', {title: 'Ayoo silver'});
	});
}

module.exports = function(app) {
	return new HomeController(app);
}