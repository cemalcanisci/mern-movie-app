const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const moviesRouter = require('./Routers/movies');
const movieRouter = require('./Routers/movie');
const apiRouter = require('./Routers/api');
const categoryRouter = require('./Routers/category');

app.use(bodyParser.json());

app.use('/api/movies', moviesRouter);
app.use('/api/movie', movieRouter);
app.use('/api', apiRouter);
app.use('/api/category', categoryRouter);
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/mymovieapp', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then((res) => console.log('Mongoose connect successfully'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`App listening on ${PORT} : PORT`);
});

process.on('SIGINT', () => {
  console.log('Quitting');
  process.exit();
});
