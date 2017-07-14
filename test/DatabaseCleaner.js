function DatabaseCleaner(database) {
	this['database'] = database;
}

DatabaseCleaner.prototype.clean = function(table, callback) {
	console.log("table: ",table);
	const db = this['database'];

	db.query('set foreign_key_checks = 0');
	db.query('truncate table '+table, callback);
	db.query('set foreign_key_checks = 1');
};

DatabaseCleaner.prototype.cleanAll = function(callback) {
	const self = this;
	const db = self['database'];
	const dbName = 'Tables_in_'+db.name();

	db.query('show tables', function (error, result) {
		if (!error) {
			for (i in result) {
				self.clean(result[i][dbName], callback);
			}
		} else {
			callback(error);
		}
	});
};

module.exports = function (database) {
	return new DatabaseCleaner(database);
};