function BaseDao(database) {

	this.query = function (query, params, callback) {
		database.query(query, params, callback);
	};

	this.name = function () {
		return database.info().database;
	};
}

module.exports = function (app) {
	return new BaseDao(app.daos.Database);
};