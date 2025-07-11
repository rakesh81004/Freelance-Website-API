CREATE DATABASE freelancer_db;

USE freelancer_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  role ENUM('client', 'freelancer')
);

CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT,
  title VARCHAR(255),
  description TEXT,
  budget INT,
  status ENUM('open', 'hired') DEFAULT 'open'
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT,
  freelancer_id INT
);
