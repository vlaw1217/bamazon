-- Drops the bamazon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;

-- Create a MySQL Database called bamazon --
CREATE DATABASE bamazon_db;

-- Make it so all of the following code will affect bamazon_db --
USE bamazon_db;

-- Creates the table "products" within favorite_db --
CREATE TABLE products (

-- Unique id for each product --
ID INTEGER Auto_increment NOT NULL,
Name_of_Product VARCHAR(100) NOT NULL,
Department_Name VARCHAR(100) NOT NULL,
Price DECIMAL(10,2),
Stock_Quantity INTEGER,
PRIMARY KEY (id)

);
