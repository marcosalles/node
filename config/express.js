const app = require('express')();
const bodyParser = require('body-parser');
const load = require('express-load');

module.exports = function() {
	app.set('view engine', 'ejs');
	app.set('views', 'app/views')

	app.use(bodyParser.urlencoded({extended:true}));

	load('daos', {cwd: 'app'})
		.then('controllers/ProductController')
		.then('controllers/userController')
		.into(app);
	return app;
}