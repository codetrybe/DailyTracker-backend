CREATE TABLE IF NOT EXISTS otp (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	user_id VARCHAR(36),
	otp VARCHAR(6),
	status ENUM('pending', 'active', 'expired'),
	expired_at DATETIME,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
)