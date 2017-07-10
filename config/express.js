const app = require('express')();
const bodyParser = require('body-parser');
const load = require('express-load');
const validator = require('express-validator');

module.exports = function() {
	app.set('view engine', 'ejs');
	app.set('views', 'app/views')

	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(validator());

	load('daos', {cwd: 'app'})
		.then('controllers')
		.into(app);
	return app;
}