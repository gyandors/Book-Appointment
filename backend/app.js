const express = require("express");
const cors = require("cors");

const mysql = require("mysql2/promise");

const db = mysql.createPool({
  database: "node-app",
  user: "root",
  password: "root",
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/appointments", (req, res, next) => {
  db.execute("SELECT * FROM user")
    .then(([result]) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    });
});

app.post("/api/appointments", (req, res, next) => {
  const userName = req.body.userName;
  const userEmail = req.body.userEmail;
  const userPhone = req.body.userPhone;

  db.execute(
    `INSERT INTO user (userName, userEmail, userPhone) VALUES (?, ?, ?)`,
    [userName, userEmail, userPhone]
  )
    .then(([result]) => {
      res.status(201).json({ message: "Successful", _id: result.insertId });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    });
});

app.put("/api/appointments/:userId", (req, res, next) => {
  const userName = req.body.userName;
  const userEmail = req.body.userEmail;
  const userPhone = req.body.userPhone;

  db.execute(
    "UPDATE user SET userName = ?, userEmail = ?, userPhone = ? WHERE _id = ?",
    [userName, userEmail, userPhone, req.params.userId]
  )
    .then(([result]) => {
      res.status(201).json({ message: "Successful", _id: req.params.userId });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    });
});

app.delete("/api/appointments/:userId", (req, res, next) => {
  db.execute("DELETE FROM user WHERE _id = ?", [req.params.userId])
    .then(([result]) => {
      res.status(200).json();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    });
});

app.listen(3000, "localhost");
