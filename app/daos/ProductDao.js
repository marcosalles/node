function ProductDao(baseDao) {
	this['base'] = baseDao;
}

ProductDao.prototype.all = function (callback) {
	this['base'].query('select * from product', callback);
}

ProductDao.prototype.load = function (id, callback) {
	this['base'].query('select * from product where id = ?', [id], callback);
}

ProductDao.prototype.save = function (product, callback) {
	if (product.id) {
		this['base'].query('update product set ?', product, callback);
	} else {
		this['base'].query('insert into product set ?', product, callback);
	}
}

ProductDao.prototype.delete = function (id, callback) {
	this['base'].query('delete from product where id = ?', [id], callback);
}

module.exports = function(app) {
	return new ProductDao(app.daos.BaseDao);
}