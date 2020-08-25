const CategoryModel = require('../Models/category');
const MovieModel = require('../Models/movie');

const add = async function (req, res, next) {
  const addedData = req.body.added;
  const data = await CategoryModel.insertMany(addedData);
  req.addedData = data;
  next();
};
const update = async function (req, res, next) {
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
};
const remove = async function (req, res, next) {
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
};
module.exports = { add, update, remove };
