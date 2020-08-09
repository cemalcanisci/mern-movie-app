const express = require('express');

const router = express.Router();
const etag = require('etag');
const MovieModel = require('../models/movie');

router.get('/', (req, res) => {
  const query = {
    page: req.query.page,
    limit: Number(req.query.limit),
  };

  let offset = 0;
  if (query.page > 1) {
    offset = (query.page - 1) * query.limit;
  }
  const movies = MovieModel.find()
    .sort({ order: 1 })
    .limit(query.limit)
    .skip(offset)
    .populate('category');
  const date = new Date().toString();
  movies.then(async (movie) => {
    let body = '';
    for (const i of movie) {
      body += i.title;
    }
    const total = await MovieModel.countDocuments({});
    res.setHeader('ETag', etag(body + date));
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
