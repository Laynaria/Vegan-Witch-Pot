DROP TABLE IF EXISTS menu_recipe;
DROP TABLE IF EXISTS menu;
DROP TABLE IF EXISTS recipe_ingredient_quantity;
DROP TABLE IF EXISTS ingredient;
DROP TABLE IF EXISTS quantity;
DROP TABLE IF EXISTS type;
DROP TABLE IF EXISTS recipe;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS role;

CREATE TABLE role (
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
role VARCHAR(80) NOT NULL);

CREATE TABLE user (
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
username VARCHAR(20) NOT NULL,
email VARCHAR(80) NOT NULL, 
password VARCHAR(150) NOT NULL,
role_id INT NOT NULL DEFAULT 1,
CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES role(id));

CREATE TABLE category (
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
name VARCHAR(80) NOT NULL);

CREATE TABLE recipe (
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
title VARCHAR(25) NOT NULL,
thumbnail VARCHAR(250) NOT NULL DEFAULT 'grilled_peas.png',
difficulty INT NOT NULL,
cooking_time VARCHAR(10) NOT NULL,
steps TEXT NOT NULL,
origin VARCHAR(150) NULL,
is_shared BOOLEAN NOT NULL DEFAULT FALSE,
is_approved BOOLEAN NOT NULL DEFAULT FALSE,
user_id INT NOT NULL,
CONSTRAINT fk_recipe_user FOREIGN KEY (user_id) REFERENCES user(id),
category_id INT NOT NULL,
CONSTRAINT fk_recipe_category FOREIGN KEY (category_id) REFERENCES category(id));

CREATE TABLE type (
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
type VARCHAR(10) NOT NULL,
unit VARCHAR(5) NOT NULL);

CREATE TABLE quantity(
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
value VARCHAR(10),
type_id INT NOT NULL,
CONSTRAINT fk_quantity_type FOREIGN KEY (type_id) REFERENCES type(id));

CREATE TABLE ingredient(
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
name VARCHAR(80) NOT NULL);

CREATE TABLE recipe_ingredient_quantity(
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
line TINYINT NOT NULL,
recipe_id INT NOT NULL,
CONSTRAINT fk_recipe_ingredient_recipe FOREIGN KEY (recipe_id) REFERENCES recipe(id),
ingredient_id INT NOT NULL,
CONSTRAINT fk_recipe_ingredient_ingredient FOREIGN KEY (ingredient_id) REFERENCES ingredient(id),
quantity_id INT NOT NULL,
CONSTRAINT fk_recipe_quantity_quantity FOREIGN KEY (quantity_id) REFERENCES quantity(id));

CREATE TABLE menu(
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
start_date DATE NOT NULL);

CREATE TABLE menu_recipe(
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
menu_id INT NOT NULL,
CONSTRAINT fk_menu_recipe_menu FOREIGN KEY (menu_id) REFERENCES menu(id),
recipe_id INT NOT NULL,
CONSTRAINT fk_menu_recipe_recipe FOREIGN KEY (recipe_id) REFERENCES recipe(id));

INSERT INTO role (role) VALUES 
('user'),
('cook'),
('admin');

INSERT INTO user (username, email, password, role_id) VALUES
('Layne', 'layne@layne.fr', '$argon2id$v=19$m=65536,t=5,p=1$MyY0DawU/Ud0gQYMIQudng$s8n5gxrjo/djdpUAWwjXozvEbKTKbwsCLYJFNbRBEfQ', 3),
('test', 'test@test.fr', '$argon2id$v=19$m=65536,t=5,p=1$HB7WoL7htUrpFQT+JnazCA$42lqJNUaTvY3+13akIRIDl6uCka5mzMp7xzRoOa0C0A', 1);

INSERT INTO category (name) VALUES
('Breakfasts'),
("Appetizers"),
('Soups'),
('Bites'),
('Main Course'),
('Desserts'),
('Snacks'),
('Sauces'),
('Beverages');

INSERT INTO recipe (thumbnail, title, difficulty, cooking_time, steps, origin, is_shared, is_approved, user_id, category_id) VALUES
('grilled_peas.png', 'Grilled Peas', 1, '30min', 'Faites griller les pois chiches', '', true, true, 1, 4),
('bowl.png', 'Supreme Buddha Bowl', 2, '25min', 'Mettez tout dans une assiette', '', true, true, 1, 4);

INSERT INTO type (type, unit) VALUES
('number', ''),
('teaspoon', 'tsp'),
('tablespoon', 'tbsp'),
('cup', 'cup'),
('ml', 'ml'),
('l', 'l'),
('g', 'g'),
('to taste', '');

INSERT INTO quantity (value, type_id) VALUES
('1', 1),
('2', 1),
('3', 1),
('4', 1),
('5', 1),
('6', 1),
('7', 1),
('8', 1),
('9', 1),
('10', 1),
('1/4', 2),
('1/2', 2),
('1', 2),
('1/2', 3),
('1', 3),
('1/8', 4),
('1/4', 4),
('1/3', 4),
('1/2', 4),
('1', 4),
('5', 5),
('10', 5),
('15', 5),
('20', 5),
('25', 5),
('30', 5),
('40', 5),
('50', 5),
('60', 5),
('70', 5),
('80', 5),
('90', 5),
('100', 5),
('125', 5),
('150', 5),
('175', 5),
('200', 5),
('250', 5),
('300', 5),
('350', 5),
('400', 5),
('450', 5),
('500', 5),
('550', 5),
('600', 5),
('600', 5),
('700', 5),
('800', 5),
('1', 6),
('2', 6),
('3', 6),
('1', 7),
('2', 7),
('3', 7),
('4', 7),
('5', 7),
('6', 7),
('7', 7),
('8', 7),
('9', 7),
('10', 7),
('15', 7),
('20', 7),
('25', 7),
('30', 7),
('35', 7),
('40', 7),
('45', 7),
('50', 7),
('60', 7),
('70', 7),
('80', 7),
('90', 7),
('100', 7),
('150', 7),
('200', 7),
('250', 7),
('300', 7),
('350', 7),
('400', 7),
('450', 7),
('500', 7),
('600', 7),
('700', 7),
('800', 7),
('', 8);


INSERT INTO ingredient (name) VALUES
('Peas'),
('Olive Oil'),
('Herbes de Provence'),
('Salt'),
('Pepper'),
('Sunflower Oil'),
('Salad'),
('Avocado'),
('Sweet Potatoe'),
('Small Tomatoes'),
('Purslane'),
('Red Cabbage'),
('Mangoe');

INSERT INTO recipe_ingredient_quantity (line, recipe_id, ingredient_id, quantity_id) VALUES
(1, 1, 1, 82),
(2, 1, 2, 20),
(3, 1, 3, 20),
(4, 1, 4, 86);

-- INSERT INTO menu (start_date) VALUES
-- ();

-- INSERT INTO menu_recipe (menu_id, recipe_id) VALUES
-- ();

SELECT u.id as user_id, r.id as recipe_id, riq.id as recipe_ingredient_quantity_id FROM user AS u INNER JOIN recipe as r ON u.id = r.user_id INNER JOIN recipe_ingredient_quantity as riq ON r.id = riq.recipe_id WHERE u.id = 1;