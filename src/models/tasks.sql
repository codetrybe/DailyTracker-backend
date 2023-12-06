-- Table for Tasks

CREATE TABLE IF NOT EXISTS tasks (
	tasks_id INT PRIMARY KEY AUTO_INCREMENT,
	list_id INT,
	task_name VARCHAR(75) NOT NULL,
	status ENUM('not_done', 'done', 'carry_over') DEFAULT 'not_done',
	time_scheduled TIME,
	reminder_option ENUM('none', '15_minutes', '30_minutes', 'exact_time') DEFAULT 'none',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (list_id) REFERENCES todo_lists (list_id) ON DELETE CASCADE
);

INSERT INTO tasks (
		list_id,
		task_name,
		time_scheduled
	)
VALUES (
		1,
		'Walk the dog',
		'08:00:00'
	)

INSERT INTO tasks (
		list_id,
		task_name,
		time_scheduled
	)
VALUES (
		1,
		'Wash the car',
		'09:00:00'
	)

UPDATE tasks
SET reminder_option = '15_minutes'
WHERE tasks_id = 1