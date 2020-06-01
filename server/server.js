const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const moviesRouter = require('./routers/movies');
const movieRouter = require('./routers/movie');
const apiRouter = require('./routers/api');
const categoryRouter = require('./routers/category');
const MovieModel = require('./models/movie');
app.use(bodyParser.json());

app.use('/api/movies',moviesRouter);
app.use('/api/movie',movieRouter);
app.use('/api',apiRouter);
app.use('/api/category',categoryRouter);
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/mymovieapp', { useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify:false})
    .then(res => console.log('Mongoose connect successfully'))
    .catch(err => console.log(err));
    
app.listen(PORT, () => {
    console.log(`App listening on ${PORT} : PORT`);
})