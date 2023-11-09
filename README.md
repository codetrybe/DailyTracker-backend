# DailyTracker Backend

This is the backend for the DailyTracker application. It is built using Node.js and Express, with MySQL as the database management system.

## Getting Started

### Prerequisites

- Node.js
- MySQL

### Installation

1. Clone the repository. ```git clone <repository_url>```

2. Install dependencies. ```npm install```

3. Setup environment variable - `cp .env.example .env`

4. Run the server. ```npm run dev```

The server will start on port 3000 by default. You can change the port in the `index.js` file if necessary.

## Database Setup

Create a MySQL database with the following credentials:

- Database name: your_database_name
- Username: your_username
- Password: your_password

Ensure that your MySQL server is running, and update the database configuration in `.env` with your database credentials.

## API Endpoints

- `POST /users/signup`: Create a new user
- `POST /users/login`: Login the user
- `POST /todo/`: Create a todo list
- `POST /events`: Create an event
- `POST /notify/push`: Send push notification
- `POST /notify/email`: Send email
- `POST /notify/SMS`: Send SMS
- `GET /users/:id`: Get user details and information
- `GET /todo/:id`: Get all todo lists belonging to the user
- `PATCH /users/:id`: Update the user
- `PATCH /todo/:list-id`: Alter and update the todo list
- `PATCH /events/:event-id`: Update event
- `DELETE /users/:id`: Delete the user and all associated data
- `DELETE /todo/`: Delete all todo lists for the user
- `DELETE /todo/:list-id`: Delete the todo list belonging to the user
- `DELETE /event`: Delete all events belonging to the user
- `DELETE /event/:event-id`: Delete an event
- `DELETE /clear`: Clear all data if due 30 days ago

## Contributors

- [Abiodun Shittu](https://github.com/Abiodun-Shittu)