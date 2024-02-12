-- List Tables in the current database
-- cat src/models/list_databases.sql | mysql -hlocalhost -uyour_user -p

CREATE DATABASE IF NOT EXISTS DailyTracker;

USE DailyTracker;

SHOW TABLES;