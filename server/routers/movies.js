const express = require('express');

const router = express.Router();
const MovieModel = require('../models/movie');

router.get('/', (req, res) => {
  const query = {};
  query.page = req.query && req.query.page ? req.query.page : undefined;
  query.limit = req.query && req.query.limit ? Number(req.query.limit) : 0;

  let offset = 0;
  if (query.page && query.page > 1) {
    offset = (query.page - 1) * query.limit;
  }
  const movies = MovieModel.find()
    .sort({ order: 1 })
    .limit(query.limit)
    .skip(offset)
    .populate('category');
  movies.then(async (movie) => {
    const total = await MovieModel.countDocuments({});
    res.json({
      data: movie,
      total,
    });
  });
});
router.get('/order', (req, res) => {
  const movies = MovieModel.find()
    .sort({ order: 1 });

  movies.then(async (movie) => {
    const total = await MovieModel.countDocuments({});
    res.status(200).json({ data: movie, total });
  });
});
router.put('/order', (req) => {
  const movies = req.body;
  movies.forEach(async (q) => {
    await MovieModel.updateOne({ _id: q._id }, { $set: { order: q.order } });
  });
});
module.exports = router;
