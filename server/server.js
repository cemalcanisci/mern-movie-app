const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const history = require('connect-history-api-fallback');
require('dotenv').config();

const app = express();

const moviesRouter = require('./Routers/movies');
const movieRouter = require('./Routers/movie');
const apiRouter = require('./Routers/api');
const categoryRouter = require('./Routers/category');

app.use(bodyParser.json());
const staticFileMiddleware = express.static(path.join(`${__dirname}/public`));
app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  verbose: true,
}));
app.use(staticFileMiddleware);

app.use('/api/movies', moviesRouter);
app.use('/api/movie', movieRouter);
app.use('/api', apiRouter);
app.use('/api/category', categoryRouter);

mongoose.connect(process.env.DB_HOST,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then((res) => console.log('Mongoose connect successfully'))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 5000, () => {
  console.log('App listening on 5000 : PORT');
});

process.on('SIGINT', () => {
  console.log('Quitting');
  process.exit();
});
