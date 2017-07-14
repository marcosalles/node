function Product(title, sku, price = 0) {
	return {
		title: title,
		sku: sku,
		price: parseFloat(price)
	}
}

module.exports = function() {
	return Product;
}