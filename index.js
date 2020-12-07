const express = require('express');
const app = express();
const con = require('./database/conf');
const port = process.env.PORT || 4000;

// MIDDLEWARES
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// GET

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

app.get('/api/users', (req, res) => {
  let sql = 'SELECT * FROM user';

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

// POST

// MOVIES
app.post('/api/movies', (req, res) => {
  const { title, director, year, color, duration } = req.body;
  let sql =
    'INSERT INTO movies(title, director, year, color, duration) VALUES(?, ?, ?, ?, ?)';

  con.query(sql, [title, director, year, color, duration], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error saving a movie');
    } else {
      res.status(200).send('Successfully saved');
    }
  });
});

//USERS
app.post('/api/users', (req, res) => {
  const data = req.body;
  let sql = 'INSERT INTO user SET ?';

  con.query(sql, data, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error saving a user');
    } else {
      res.status(200).send('Successfully saved');
    }
  });
});

// PUT
app.put('/api/users/:id', (req, res) => {
  const idUser = req.params.id;
  const newUser = req.body;

  con.query(
    'UPDATE user SET ? WHERE id = ?',
    [newUser, idUser],
    (err, results) => {
      if (err) {
        res.status(500).send('Error updating a user');
      }
      res.status(200).send('User updated successfully 🎉');
    }
  );
});

app.put('/api/movies/:id', (req, res) => {
  const { id } = req.params;
  const newMovie = req.body;

  con.query(
    'UPDATE movies SET ? WHERE id = ?',
    [newMovie, id],
    (err, results) => {
      if (err) {
        res.status(500).send('Error updating a user');
      }
      res.status(200).send('User updated successfully 🎉');
    }
  );
});

// DELETE

app.delete('/api/users/:id', (req, res) => {
  const idUser = req.params.id;

  con.query('DELETE FROM user WHERE id = ?', [idUser], (err, results) => {
    if (err) {
      res.status(500).send('😱 Error deleting an user');
    } else {
      res.status(200).send('🎉 User deleted!');
    }
  });
});

app.delete('/api/movies/:id', (req, res) => {
  const idMovie = req.params.id;
  let sql = 'DELETE FROM movies WHERE id = ?';

  con.query(sql, [idMovie], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreu lors da la suppression du film');
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error(err);
  } else {
    console.log(`server listening on port ${port}`);
  }
});
