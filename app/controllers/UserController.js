function UserController(app) {
	const productController = app.controllers.ProductController;

	app.get('/users', function (req, res) {
		res.redirect(productController.list());
	});
}

module.exports = function(app) {
	return new UserController(app);
}