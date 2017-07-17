function Database(database, info) {
	this.info = function () {
		return info;
	};

	this.query = function (queryString, params, callback) {
		const connection = database.createConnection(this.info());
		connection.query(queryString, params, callback);
		connection.on('error', function(error) {
			console.error('Database error: ', error);
		});
		connection.end();
	};
}

module.exports = function() {
	const env = process.env.NODE_ENV || 'development';
	console.info('Using environment', env.toUpperCase());

	let databaseInfo = {};
	if (env == 'production') {
		const dbUrl = process.env.CLEARDB_DATABASE_URL;
		let infoBreakdown = dbUrl.match(/mysql:\/\/([\w-]+):([\w-]+)@([\w.-]+)\/([\w-]+)/);

		databaseInfo = {
			user: infoBreakdown[1],
			password: infoBreakdown[2],
			host:  infoBreakdown[3],
			database: infoBreakdown[4]
		};
	} else {
		databaseInfo = {
			user: 'root',
			password: '',
			host: 'localhost',
			database: ['cdcnode', '_', env].join('')
		}
	}
	console.info('Using database information:', databaseInfo);
	return new Database(require('mysql'), databaseInfo);
};