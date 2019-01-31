DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(40),
  department_name VARCHAR(40),
  price DECIMAL(10, 2),
  stock_quantity INTEGER(20)
  PRIMARY KEY (item_id);
);
