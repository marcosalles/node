const mysql = require('mysql');
function BaseDao(database) {
	this['db'] = database;
}

BaseDao.prototype.query = function (query, entity, callback) {
	let connection = this['db'].createConnection({
		host: 'localhost',
		database: 'cdcnode',
		user: 'root',
		password: ''
	});
	connection.query(query, entity, callback);
	connection.on('error', function(error) {});
	connection.end();
}

module.exports = function() {
	return new BaseDao(mysql);
};
