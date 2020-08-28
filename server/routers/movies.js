const express = require('express');

const router = express.Router();
const MovieModel = require('../Models/movie');

router.get('/', async (req, res) => {
  try {
    const query = {};
    query.page = req.query && req.query.page ? req.query.page : undefined;
    query.limit = req.query && req.query.limit ? Number(req.query.limit) : 0;
    let offset = 0;
    if (query.page && query.page > 1) {
      offset = (query.page - 1) * query.limit;
    }
    const movies = await MovieModel.find()
      .sort({ order: 1 })
      .limit(query.limit)
      .skip(offset)
      .populate('category');
    const total = await MovieModel.countDocuments({});
    res.json({
      data: movies,
      total,
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/search', async (req, res) => {
  try {
    const title = req.query.key;
    const query = {};
    query.page = req.query && req.query.page ? req.query.page : undefined;
    query.limit = req.query && req.query.limit ? Number(req.query.limit) : 0;
    let offset = 0;
    if (query.page && query.page > 1) {
      offset = (query.page - 1) * query.limit;
    }
    const movies = await MovieModel.find({ title: { $regex: `.*${title}.*`, $options: 'ig' } })
      .sort({ order: 1 })
      .limit(query.limit)
      .skip(offset)
      .populate('category');
    const total = await MovieModel.countDocuments({ title: { $regex: `.*${title}.*`, $options: 'ig' } });
    res.json({
      data: movies,
      total,
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/order', async (req, res) => {
  try {
    const movies = await MovieModel.find()
      .sort({ order: 1 });
    const total = await MovieModel.countDocuments({});
    res.status(200).json({ data: movies, total });
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put('/order', (req, res) => {
  try {
    const movies = req.body;
    movies.forEach(async (q) => {
      await MovieModel.updateOne({ _id: q._id }, { $set: { order: q.order } });
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
