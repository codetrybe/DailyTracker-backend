DROP DATABASE IF EXISTS sql_tracker;

CREATE DATABASE sql_tracker;

USE sql_tracker;

CREATE TABLE user (
  user_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL, 
  password_hash VARCHAR(60) NOT NULL,
  mobile_number VARCHAR(15) NOT NULL,
  is_email_verified boolean,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
  );

  INSERT INTO user (username, email, password_hash, mobile_number, is_email_verified) VALUES ('harry', 'harry@email.com', 'try234563', '12345678912', true);
  INSERT INTO user (username, email, password_hash, mobile_number, is_email_verified) VALUES ('daniel', 'daniel@email.com', 'dan6763', '1234321912', false)

  )

CREATE TABLE todo(
  list_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  user_id INTEGER NOT NULL,
  list_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

INSERT INTO todo ( user_id, list_name ) VALUES (1, 'todays plan');
INSERT INTO todo ( user_id, list_name ) VALUES (2, ' work out');


CREATE TABLE task(
  task_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  list_id INTEGER NOT NULL,
  task_name VARCHAR(255) NOT NULL,
  status ENUM('not done', 'done', 'carry over'),
  time_scheduled TIMESTAMP NOT NULL,
  reminder_option ENUM('none', '15 minutes', '30 minutes', 'exact time'),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (list_id) REFERENCES todo(list_id)
);

INSERT INTO task ( list_id, task_name, time_scheduled ) VALUES (1, 'walk upandown', now());
INSERT INTO task ( list_id, task_name, time_scheduled ) VALUES (2, ' go to the jim house', now());






INSERT INTO user (username, email, password_hash, mobile_number, is_email_verified) VALUES ('ginika', 'garry@email.com', 'try234563', '12345678912', true);
INSERT INTO user (username, email, password_hash, mobile_number, is_email_verified) VALUES ('ihe', 'daniel@email.com', 'dan6763', '1234321912', false);

INSERT INTO todo ( user_id, list_name ) VALUES (3, 'shopping');
INSERT INTO todo ( user_id, list_name ) VALUES (4, 'business');

INSERT INTO task ( list_id, task_name, time_scheduled ) VALUES (11, 'buy markets from china', now());
INSERT INTO task ( list_id, task_name, time_scheduled ) VALUES (14, 'visit paris in france for paris shopping', now());
INSERT INTO task ( list_id, task_name, time_scheduled ) VALUES (11, 'import containers from hong kong', now());
INSERT INTO task ( list_id, task_name, time_scheduled ) VALUES (14, 'weekend in london', now());
INSERT INTO task ( list_id, task_name, time_scheduled ) VALUES (11, 'deliver on massive contract with fedral governemt', now());
INSERT INTO task ( list_id, task_name, time_scheduled ) VALUES (14, 'enjoy the most of life while every works for good in uk', now());


INSERT INTO todo ( user_id, list_name ) VALUES (3, 'MAKE money');

INSERT INTO task ( list_id, task_name, time_scheduled ) VALUES (15, 'sell 1k product to 100 people in 10 days', now());



INSERT INTO user (username, email, password_hash, mobile_number, is_email_verified) VALUES ('Test1', 'test1@email.com', 'try234563', '12345678912', true);
INSERT INTO user (username, email, password_hash, mobile_number, is_email_verified) VALUES ('test2', 'daniel@email.com', 'dan6763', '1234321912', false);

INSERT INTO todo ( user_id, list_name ) VALUES (6, 'MAKE plenty money');
INSERT INTO todo ( user_id, list_name ) VALUES (6, 'MAKE big progress');
INSERT INTO todo ( user_id, list_name ) VALUES (6, 'next todo list');

INSERT INTO task ( list_id, task_name, time_scheduled ) VALUES (19, 'sell 1k product to 100 people in 10 days', now());
INSERT INTO task ( list_id, task_name, time_scheduled ) VALUES (19, 'run advert to 100 people in 10 days', now());

INSERT INTO task ( list_id, task_name, time_scheduled ) VALUES (20, 'dig deeper in 10 days', now());

INSERT INTO task ( list_id, task_name, time_scheduled ) VALUES (21, 'random in 10 days', now());