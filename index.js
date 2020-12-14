const express = require('express');
const app = express();
const con = require('./database/conf');
const port = process.env.PORT || 4000;

// GET ALL
app.get('/api/movies', (req, res) => {
  let sql = 'SELECT * FROM movies';
  let sqlValues = [];

  if (req.query.rating && req.query.genre) {
    sql += ' WHERE rating = ? && genre = ?';
    sqlValues.push(req.query.rating, req.query.genre);
  } else if (req.query.rating) {
    sql += ' WHERE rating = ?';
    sqlValues.push(req.query.rating);
  } else if (req.query.genre) {
    sql += ' WHERE genre = ?';
    sqlValues.push(req.query.genre);
  }

  con.query(sql, sqlValues, (err, results) => {
    if (err) {
      res.json({ success: false, message: 'Error retrieving data' });
    }
    res.status(200).json({ success: true, data: results });
  });
});

// GET ONE
app.get('/api/movies/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * from movies WHERE id=?';

  con.query(sql, [id], (err, results) => {
    if (err) {
      res.json({ success: false, message: 'Error retrieving data' });
    }
    if (results.length === 0) {
      res.status(404).json({ success: false, message: 'Movie not found' });
    }
    res.status(200).json({ success: true, data: results });
  });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error(err);
  } else {
    console.log(`server listening on port ${port}`);
  }
});
