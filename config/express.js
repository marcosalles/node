const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const load = require('express-load');
const validator = require('express-validator');

module.exports = function() {
	app.use(express.static('app/public'));

	app.set('view engine', 'ejs');
	app.set('views', 'app/views')

	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(validator());

	load('models', {cwd: 'app'})
		.then('daos/Database')
		.then('daos')
		.then('controllers')
		.into(app);

	app.use(function(req, res, next) {
		res.status(404).render("error/404");
		return next();
	});

	app.use(function(error, req, res, next) {
		res.status(500).render('error/500', {error: error});
		return next(error);
	});

	return app;
}