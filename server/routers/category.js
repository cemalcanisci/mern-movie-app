const express = require('express');
const router = express.Router();
const CategoryModel = '../models/category';
router.get('/',(req,res)=>{
    let categories = CategoryModel.find();
    categories.then(category=>res.json(category));
})
router.post('/',(req,res)=>{
    const data = {...req.body}
    let newCategory = new CategoryModel(data);
    newCategory.save()
    .then(category=>res.json({data:category}))
})
module.exports = router;