const express = require("express");
const mysql = require("mysql");
const session = require("express-session");

const app = express();

// Logout route
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.send("Logged out successfully");
    res.end();
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
