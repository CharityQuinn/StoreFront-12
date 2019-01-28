DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  PRIMARY KEY (item_id),
  product_name VARCHAR(40),
  department_name VARCHAR(40),
  price INTEGER(10),
  stock_quantity INTEGER(20);
);

-- Create values into the table of the database headings
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('Aunt Mabel Mops', "Cleaning Supplies", 5.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)  
VALUES ('Dr. Martens shoes', "Footware",100, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('Wannamaker hats', 'Headware', 25, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('Bezos Umbrellas', 'Outerware', 15, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('Dr. Martens Socks', 'Footware', 11, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('Lifefactory Water Bottles', 'Housewares', 13, 39);

INSERT INTO products (product_name, department_name, price, stock_quantity)  
VALUES ('Lifefactory', 'Lunch Boxes', 'Housewares', 12, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('TSL Televisions', 'AudioVisual', 300, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('Lifefactory Laundry Basket', 'Housewares', 8, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('Unicare Vitamins', 'Groceries', 15, 200);


SELECT * FROM products;

-- show ALL books with products
-- INNER JOIN will only return all matching VALUES from both tables
SELECT products, department_name, price, stock_quantity
FROM products

