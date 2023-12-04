const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = require('../config/db');

router.patch('/users/edit/:userId', (req, res) => {
  const userId = req.params.userId;
  const newDetails = req.body;

  const checkUserQuery = 'SELECT * FROM users WHERE id = ?';

  db.query(checkUserQuery, [userId], (checkError, checkSuccess) => {
    if (checkError) {
      console.log('Error checking user:', checkError);
      res.status(500).send('Error confirming user');
    } else {
      if (checkSuccess.length === 0) {
        console.log('User not found');
        res.status(404).send('User not found');
      } else {
        const updateQuery = 'UPDATE users SET ? WHERE id = ?';

        db.query(updateQuery, [newDetails, userId], (err, success) => {
          if (err) {
            console.log('Failed to update user details', err);
            res.status(500).send('Failed to update user details');
          } else {
            console.log('User details updated successfully');
            res.status(200).send('Update successful');
          }
        });
      }
    }
  });
});

module.exports = router;

