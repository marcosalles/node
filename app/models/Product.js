function Product(title, sku, price = 0) {
	return {
		id: null,
		title: title,
		sku: sku,
		price: parseFloat(price)
	}
}

module.exports = function() {
	return Product;
}