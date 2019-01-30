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

-- Create values int7o the table of the database headings
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('Aunt Mabel Mops', "Cleaning Supplies", 5.00, 50),
('Dr. Martens shoes', "Footware",100, 20),
('Wannamaker hats', 'Headware', 25, 40),
('Bezos Umbrellas', 'Outerware', 15, 50),
('Dr. Martens Socks', 'Footware', 11, 100),
('Lifefactory Water Bottles', 'Housewares', 13, 39),
('Lifefactory Lunch Boxes', 'Housewares', 12, 70),
('TSL Televisions', 'AudioVisual', 300, 15),
('Lifefactory Laundry Basket', 'Housewares', 8, 100),
('Unicare Vitamins', 'Groceries', 15, 200);


SELECT * FROM products;

-- show ALL books with products
-- INNER JOIN will only return all matching VALUES from both tables
SELECT products, department_name, price, stock_quantity
FROM products

