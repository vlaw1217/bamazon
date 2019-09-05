-- Drops the bamazon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;

-- Create a MySQL Database called bamazon --
CREATE DATABASE bamazon_db;

-- Make it so all of the following code will affect bamazon_db --
USE bamazon_db;

-- Creates the table "products" within favorite_db --
CREATE TABLE products (

-- Unique id for each product --
ID INTEGER auto_increment NOT NULL,
Name_of_Product VARCHAR(100) NOT NULL,
Department_Name VARCHAR(100) NOT NULL,
Price DECIMAL (10,2),
Stock_Quantity INTEGER,
Product_Sales DECIMAL (10,2),
PRIMARY KEY (id)

);

-- Products data --
INSERT INTO products (Name_of_Product, Department_Name, Price, Stock_Quantity)
VALUE ('Foundation', 'Mississauga', 56, 70);

INSERT INTO products (Name_of_Product, Department_Name, Price, Stock_Quantity)
VALUE ('Mascara', 'Richmond Hill', 17, 44);

INSERT INTO products (Name_of_Product, Department_Name, Price, Stock_Quantity)
VALUE ('Lipstick', 'Milton', 42, 102);

INSERT INTO products (Name_of_Product, Department_Name, Price, Stock_Quantity)
VALUE ('Eyeshadow', 'Oakville', 86, 119);

INSERT INTO products (Name_of_Product, Department_Name, Price, Stock_Quantity)
VALUE ('Blush', 'Brampton', 32, 63);

INSERT INTO products (Name_of_Product, Department_Name, Price, Stock_Quantity)
VALUE ('Concealer', 'Guelph', 42, 144);

INSERT INTO products (Name_of_Product, Department_Name, Price, Stock_Quantity)
VALUE ('Lip Gloss', 'Hamilton', 28, 29);

INSERT INTO products (Name_of_Product, Department_Name, Price, Stock_Quantity)
VALUE ('Nail Polish', 'Burlington', 26, 70);

INSERT INTO products (Name_of_Product, Department_Name, Price, Stock_Quantity)
VALUE ('Eyelash Curlers', 'Oakville', 20, 50);

INSERT INTO products (Name_of_Product, Department_Name, Price, Stock_Quantity)
VALUE ('Makeup Remover', 'Mississauga', 36, 121);


-- Create departments table --
CREATE TABLE departments (

-- Unique id for each product --
ID INTEGER auto_increment NOT NULL,
Department_id VARCHAR(100) NOT NULL,
Department_Name VARCHAR(100) NOT NULL,
Over_Head_Costs DECIMAL (10,2),
PRIMARY KEY (id)

);

