-- Table for Reviews
-- create a database called DailyTracker
-- use DailyTracker
-- create a table called events
-- insert a record into the events table

CREATE DATABASE IF NOT EXISTS DailyTracker;

USE DailyTracker; 

CREATE TABLE IF NOT EXISTS reviews (
	reviews_id INT PRIMARY KEY AUTO_INCREMENT,
	user_id VARCHAR(36),
	rating INT,
	comment TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);