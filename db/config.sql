CREATE DATABASE garden;

USE garden;

CREATE TABLE flowers(
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  name VARCHAR(20),
  color VARCHAR(15),
  region VARCHAR(15)
);

CREATE TABLE weeds(
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  name VARCHAR(20),
  color VARCHAR(15),
  region VARCHAR(15)
);

CREATE TABLE petals(
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  number_of_petals INT,
  texture VARCHAR(10)
);
