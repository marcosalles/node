function ProductDao(baseDao) {

	this.all = function (callback) {
		baseDao.query('select * from product', callback);
	};

	this.load = function (id, callback) {
		baseDao.query('select * from product where id = ?', [id], callback);
	};

	this.save = function (product, callback) {
		if (product.id) {
			baseDao.query('update product set ?', product, callback);
		} else {
			baseDao.query('insert into product set ?', product, callback);
		}
	};

	this.delete = function (id, callback) {
		baseDao.query('delete from product where id = ?', [id], callback);
	};

}

module.exports = function(app) {
	return new ProductDao(app.daos.BaseDao);
};