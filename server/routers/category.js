const express = require('express');
const router = express.Router();
const CategoryModel = require('../models/category')
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
router.post('/set',async (req,res)=>{
    try {
    let removed = req.body.removed;
    let updated = req.body.updated;
    let added = req.body.added;
    let data = {};
    if(!added.length && !updated.length && !removed.length){
        throw new Error("Didn't find any changes")
    }
    else{
        // data.added  = await CategoryModel.insertMany(added)

        // res.json({data})
    }
    } catch (error) {
        console.log(error)
    }
    
})
module.exports = router;