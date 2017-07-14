const mysql = require('mysql');
function BaseDao(database, databaseName) {
	this['db'] = database;
	this['databaseName'] = databaseName;
}

BaseDao.prototype.connect = function () {
	return this['db'].createConnection({
		database: this.name(),
		host: 'localhost',
		user: 'root',
		password: ''
	});
};
BaseDao.prototype.query = function (query, params, callback) {
	const connection = this.connect(this['env']);
	connection.query(query, params, callback);
	connection.on('error', function(error) {});
	connection.end();
};
BaseDao.prototype.name = function () {
	return this['databaseName'];
};

module.exports = function() {
	const env = process.env.NODE_ENV;
	console.info("Using environment", (env || 'development').toUpperCase());

	const suffix = [env?'_':null, env].join('');
	const databaseName = 'cdcnode'+suffix;

	return new BaseDao(mysql, databaseName);
};
