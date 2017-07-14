const mysql = require('mysql');
function BaseDao(database, env) {
	this['db'] = database;
	this['env'] = env;
}

BaseDao.prototype.connect = function (env) {
	const suffix = [env?'_':null, env].join('');
	this['db'].createConnection({
		host: 'localhost',
		database: 'cdcnode'+suffix,
		user: 'root',
		password: ''
	});
};
BaseDao.prototype.query = function (query, params, callback) {
	let connection = connect(this['env']);
	connection.query(query, params, callback);
	connection.on('error', function(error) {});
	connection.end();
};

module.exports = function() {
	const env = process.env.NODE_ENV;
	console.info("Using environment", (env || 'development').toUpperCase());

	return new BaseDao(mysql, env);
};
