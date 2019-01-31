-- Create values into the table of the database headings
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('Aunt Mabel Mops', "Cleaning Supplies", 5.00, 50),
('Dr. Martens shoes', "Footware",100.00, 20),
('Wannamaker hats', 'Headware', 25.00, 40),
('Bezos Umbrellas', 'Outerware', 15.99, 50),
('Dr. Martens Socks', 'Footware', 11.00, 100),
('Lifefactory Water Bottles', 'Housewares', 13.99, 39),
('Lifefactory Lunch Boxes', 'Housewares', 12.00, 70),
('TSL Televisions', 'AudioVisual', 300.89, 15),
('Lifefactory Laundry Basket', 'Housewares', 8, 100),
('Unicare Vitamins', 'Groceries', 15.85, 200);


SELECT * FROM products;

-- show ALL books with products
-- INNER JOIN will only return all matching VALUES from both tables
SELECT products, department_name, price, stock_quantity
FROM products
