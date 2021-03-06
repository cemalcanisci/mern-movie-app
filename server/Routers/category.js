const express = require('express');

const router = express.Router();
const CategoryModel = require('../Models/category');
const { add, update, remove } = require('../Middlewares/category');

const setMiddlewares = [update, add, remove];
router.get('/', (req, res) => {
  const categories = CategoryModel.find();
  categories.then((category) => res.json(category))
    .catch((err) => res.status(500).json(err));
});
router.post('/', (req, res) => {
  const data = { ...req.body };
  const newCategory = new CategoryModel(data);
  newCategory.save()
    .then((category) => res.json({ data: category }))
    .catch((err) => res.status(500).json(err));
});
router.post('/set', setMiddlewares, async (req, res) => {
  try {
    const added = !req.addedData.length;
    const updated = req.updatedData;
    const removed = req.removedData;
    res.json({
      add: added,
      update: updated,
      remove: removed,
    });
  } catch (error) {
    res.send(500).json(error);
  }
});
module.exports = router;
