-- Table for users
-- create a database called DailyTracker
-- use DailyTracker
-- create a table called events
-- insert a record into the events table

CREATE DATABASE IF NOT EXISTS DailyTracker;

USE DailyTracker;

CREATE TABLE IF NOT EXISTS users (
	user_id VARCHAR(36) PRIMARY KEY,
	fullname VARCHAR(255) NOT NULL,
	username VARCHAR(255) NOT NULL UNIQUE,
	email VARCHAR(255) NOT NULL UNIQUE,
	password_hash VARCHAR(255) NOT NULL,
	phone VARCHAR(15),
	phone2 VARCHAR(15),
	location VARCHAR(100),
	profile_pic VARCHAR(255),
	is_email_verified BOOLEAN DEFAULT FALSE,
	is_phone_verified BOOLEAN DEFAULT FALSE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO users (
		user_id,
		fullname,
		username,
		email,
		password_hash,
		phone,
		phone2,
		location,
		profile_pic
)

VALUES (
		'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
		'John Doe',
		'johndoe',
		'8Jb0S@example.com',
		'password',
		'+1234567890',
		'+1234567891',
		'New York, NY',
		'profile_pic.jpg'
	)