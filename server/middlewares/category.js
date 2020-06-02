
const CategoryModel = require('../models/category');
const add = async function(req,res,next){
    const addedData = req.body.added;
    let data = await CategoryModel.insertMany(addedData);
    req.addedData = data;
    next()
}
const update = async function(req,res,next){
    const updatedData = req.body.updated;
    let response = false;
    if(updatedData.length){
        response = true
        updatedData.forEach(async function(element){
                await CategoryModel.updateOne({_id:element._id},{$set:{title:element.title}})
        });
    }
    req.updatedData = response;
    next()
}
const remove = async function(req,res,next){
    const removedData = req.body.removed;
    let response = false;
    if(removedData.length){
        response = true;
        removedData.forEach(async function(element){
                await CategoryModel.deleteOne({_id:element._id})
        });
    }

    req.removedData = response;
    next()
}
module.exports={add,update,remove}