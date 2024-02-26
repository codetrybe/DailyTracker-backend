#!/bin/bash

# Load environment variables from .env file
if [[ -f .env ]]; then
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

# MySQL command to create databases and tables
MYSQL_CMD="mysql -s -u$USER -p$PASSWORD"

# Create DailyTracker database if not exists
$MYSQL_CMD -e "CREATE DATABASE IF NOT EXISTS daily_tracker;"

# Define table creation queries
TABLE_QUERIES=(
"CREATE TABLE IF NOT EXISTS users (
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
);"
"CREATE TABLE IF NOT EXISTS events (
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
);"
"CREATE TABLE IF NOT EXISTS otp (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(36),
    otp VARCHAR(6),
    status ENUM('pending', 'active', 'expired') DEFAULT 'pending',
    expired_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);"
"CREATE TABLE IF NOT EXISTS reviews (
    reviews_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(36),
    rating INT,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);"
"CREATE TABLE IF NOT EXISTS todo_lists (
    list_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(36),
    list_name VARCHAR(255),
    time_scheduled DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);"
"CREATE TABLE IF NOT EXISTS tasks (
    tasks_id INT PRIMARY KEY AUTO_INCREMENT,
    list_id INT,
    task_name VARCHAR(75) NOT NULL,
    status ENUM('not_done', 'done', 'carry_over') DEFAULT 'not_done',
    time_scheduled TIME,
    reminder_option ENUM('none', '15_minutes', '30_minutes', 'exact_time') DEFAULT 'none',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (list_id) REFERENCES todo_lists (list_id) ON DELETE CASCADE
);"
)

# Execute table creation queries
for QUERY in "${TABLE_QUERIES[@]}"
do
    $MYSQL_CMD -e "USE daily_tracker; $QUERY"
done
