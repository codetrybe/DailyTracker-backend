-- Table for Todo Lists
-- create a database called DailyTracker
-- use DailyTracker
-- create a table called events
-- insert a record into the events table

CREATE DATABASE IF NOT EXISTS DailyTracker;

USE DailyTracker;

CREATE TABLE IF NOT EXISTS todo_lists (
	list_id INT PRIMARY KEY AUTO_INCREMENT,
	user_id VARCHAR(36),
	list_name VARCHAR(255),
	time_scheduled DATE NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

INSERT INTO todo_lists (
		user_id,
		list_name,
		time_scheduled
	)
VALUES (
		'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
		'Personal',
		'2022-01-01'
	)

UPDATE todo_lists
SET list_name = 'Work'
WHERE list_id = 1