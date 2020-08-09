const express = require('express');

const router = express.Router();
const MovieModel = require('../models/movie');

router.get('/:id', (req, res) => {
  MovieModel.findById(req.params.id)
    .populate('category')
    .then((movie) => res.json(movie))
    .catch((err) => res.status(500).json(err));
});
router.put('/change-status/:id', (req, res) => {
  const watched = {
    watched: !req.body.watched,
  };
  MovieModel.findOneAndUpdate({ _id: req.params.id }, watched)
    .then((movie) => res.json(movie));
});
router.put('/update/:id', (req, res) => {
  const data = req.body.newData;
  MovieModel.findOneAndUpdate({ _id: req.params.id }, data)
    .then((movie) => res.json(movie));
});
router.post('/add', (req, res) => {
  const data = { ...req.body };
  const newMovie = new MovieModel(data);
  newMovie.save()
    .then((movie) => res.json({ data: movie }));
});

module.exports = router;
