CREATE TABLE product (
  id int(11) NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  sku varchar(255) NOT NULL,
  price decimal(11,2) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY sku (sku)
);