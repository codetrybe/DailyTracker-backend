-- Table for Events
-- create a database called DailyTracker
-- use DailyTracker
-- create a table called events
-- insert a record into the events table

CREATE DATABASE IF NOT EXISTS DailyTracker;

USE DailyTracker;

CREATE TABLE IF NOT EXISTS events (
	events_id INT PRIMARY KEY AUTO_INCREMENT,
	user_id VARCHAR(36),
	event_name VARCHAR(255) NOT NULL,
	event_photo_url VARCHAR(255),
	theme VARCHAR(255),
	description TEXT,
	event_date DATE,
	event_time TIME,
	reminders INT DEFAULT 0,
	reminder_method ENUM('email', 'sms', 'both'),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

INSERT INTO events (
		user_id,
		event_name,
		event_photo_url,
		theme,
		description,
		event_date,
		event_time,
		reminder_method
	)
VALUES (
		'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
		'Christmas',
		'christmas.jpg',
		'Christmas',
		'Christmas is coming!',
		'2022-12-25',
		'08:00:00',
		'both'
	);