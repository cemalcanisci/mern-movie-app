const CategoryModel = require('../Models/category');
const MovieModel = require('../Models/movie');

async function add(req, res, next) {
  try {
    const addedData = req.body.added;
    const data = await CategoryModel.insertMany(addedData);
    req.addedData = data;
    next();
  } catch (error) {
    res.sendStatus(500);
  }
}
async function update(req, res, next) {
  try {
    const updatedData = req.body.updated;
    let response = false;
    if (updatedData.length) {
      response = true;
      updatedData.forEach(async (element) => {
        await CategoryModel.updateOne({ _id: element._id }, { $set: { title: element.title } });
      });
    }
    req.updatedData = response;
    next();
  } catch (error) {
    res.sendStatus(500);
  }
}
async function remove(req, res, next) {
  try {
    const removedData = req.body.removed;
    let response = false;
    if (removedData.length) {
      response = true;
      removedData.forEach(async (element) => {
        await CategoryModel.deleteOne({ _id: element._id }).then(async () => {
          await MovieModel.deleteMany({ category: element._id });
        });
      });
    }

    req.removedData = response;
    next();
  } catch (error) {
    res.sendStatus(500);
  }
}
module.exports = { add, update, remove };
