const express = require('express');
const app = express();
const con = require('./database/conf');
const port = process.env.PORT || 4000;

// GET ALL
app.get('/api/movies', (req, res) => {
  let sql = 'SELECT * FROM movies';

  con.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving data');
    }
    res.status(200).json(results);
  });
});

// GET ONE
app.get('/api/movies/:id', (req, res) => {
  const { id } = req.params;
  let sql = 'SELECT * from movies WHERE id=?';

  con.query(sql, [id], (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving data');
    } else {
      res.status(200).json(results);
    }
  });
});

//GET WITH QUERY
app.get('/api/search', (req, res) => {
  const { maxDuration } = req.query;
  let sql = 'SELECT * from movies WHERE duration <= ?';

  con.query(sql, [maxDuration], (err, results) => {
    if (err) {
      res.status(200).json({
        movies: moviezz,
        message: 'no movies found for this duration',
      });
    }
    res.status(200).json(results);
  });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error(err);
  } else {
    console.log(`server listening on port ${port}`);
  }
});
