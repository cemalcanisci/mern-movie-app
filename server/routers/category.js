const express = require('express');
const router = express.Router();
const CategoryModel = require('../models/category');
const {add,update,remove} = require('../middlewares/category');
const setMiddlewares = [update,add,remove];
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
router.post('/set',setMiddlewares,async (req,res)=>{
    try {
        let add = req.addedData.length ? true : false;
        let update = req.updatedData;
        let remove = req.removedData;
        res.json({
            add,
            update,
            remove
        })
    }catch (error) {
        throw new Error(error)
    }
    
})
module.exports = router;