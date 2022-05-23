CREATE DATABASE IF NOT EXISTS hello;
USE hello;

CREATE TABLE numbers(
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting VARCHAR(50) NOT NULL
);

INSERT INTO numbers(setting) VALUES("blah blash;");