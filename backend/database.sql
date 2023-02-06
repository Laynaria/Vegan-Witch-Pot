DROP TABLE IF EXISTS recipe;

CREATE TABLE recipe (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  picture VARCHAR(250) NOT NULL DEFAULT 'grilled_peas.png',
  title VARCHAR(25) NOT NULL,
  difficulty INT NOT NULL,
  cooking_time VARCHAR(10) NOT NULL);

INSERT INTO recipe (picture, title, difficulty, cooking_time)
VALUES
('grilled_peas.png', 'Grilled Peas', 1, '30min'),
('grilled_peas.png', 'Super Grilled Peas', 2, '45min');