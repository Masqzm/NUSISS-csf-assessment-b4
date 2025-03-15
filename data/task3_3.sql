-- Task 3
DROP DATABASE IF EXISTS ecommerce;
CREATE DATABASE ecommerce;
USE ecommerce;

CREATE TABLE orders (
	order_id char(26) NOT NULL,
	order_date date,
	name varchar(255) NOT NULL,
	address varchar(255) NOT NULL,
	priority boolean NOT NULL,
	comments text,
	
	primary key(order_id)
	);

CREATE TABLE order_details (			# cart line item details linked to orders table
	id int NOT NULL AUTO_INCREMENT,		# PK
	order_id char(26) NOT NULL,			# FK
	product_id varchar(32) NOT NULL,
	name varchar(255) NOT NULL,
	quantity int NOT NULL,
	price DECIMAL(10, 2) NOT NULL,		# for accurate price representation to 2dp
	
	primary key(id),
	foreign key (order_id) references orders(order_id)
);



# INSERT INTO orders(order_id, order_date, name, address, priority, comments) VALUES (?, ?, ?, ?, ?, ?)
# INSERT INTO order_details(order_id, product_id, name, quantity, price) VALUES (?, ?, ?, ?, price)

SELECT * FROM orders;

SELECT * FROM order_details;

GRANT ALL PRIVILEGES ON csf_assessment.* 
TO 'fred' @'%';

flush PRIVILEGES;