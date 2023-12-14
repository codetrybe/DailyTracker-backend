# Installation

This is the installation instructions for DailyTracker Backend, if you are looking for something else please check in the main README.md file for assistance.

## Prerequisites

To run the backend code, you need to have the following installed:

- [Node JS](https://nodejs.org/en)
- [MySQL](https://www.mysql.com/)

If you have not please visit their respective sites and install them.

## Get a copy of the source code

Unless you want to contribute, any method used should be fine.

The recommended method is cloning using git:

```sh
git clone https://github.com/codetrybe/DailyTracker-backend
```

This should clone the repo to your local environment.

Other methods to clone are:

```sh
git clone git@github.com:codetrybe/DailyTracker-backend.git # If you have ssh configured

gh repo clone codetrybe/DailyTracker-backend # If you are using gh cli
```

If for any reason you can't clone then you can either use codespaces or download a ZIP.

## Install project dependencies

The project requires some external dependencies to run properly, please refer to `package.json` for information about what packages are to be installed.

To install the packages you can run the command:

```sh
npm install # or npm ci
```

This installs all the required dependencies. If you encounter any error, please retry, if the error doesn't resolve itself, open an issue where you found this code describing the error.

## Setup environment variables

The project uses environment variables to store sensitive information, you can find the template in `.env.example` file.
Copy the template and create a new file called `.env` and paste the contents of the template into it.

```sh
cp .env.example .env
```

Then fill in the required information. This information is from your [MySQL database](#database-setup).

## Database Setup

Create a MySQL database with the following credentials:

- Database name: your_database_name
- Username: your_username
- Password: your_password

Ensure that your MySQL server is running, and update the database configuration in `.env` with your database credentials.

## Run the dev server

To run the server, ensure that everything is configured properly.
If not please refer to the above steps.

After everything is setup properly then run the following command:

```sh
npm run dev
```

The server will open in port 3000 by default, you can change this in the `index.js` file if necessary.
