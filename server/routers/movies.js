const express = require('express');
const router = express.Router();
const MovieModel = require('./../models/movie');
const etag = require('etag');

router.get('/', (req, res) => {
    const query = {
        page: req.query.page,
        limit: Number(req.query.limit)
    }
    let offset = 0;
    if (query.page > 1) {
        offset = (query.page-1) * query.limit
    }
    const movies = MovieModel.find()
        .sort({ order: 1 })
        .limit(query.limit)
        .skip(offset)
        .populate('category')
    let date = new Date().toString();
    movies.then(async movie => {
        let body = '';
        for(let i of movie){
            body+=i.title;
        }
        const total = await MovieModel.countDocuments({});
        res.setHeader('ETag', etag(body + date))
        res.json({
            data: movie,
            total: total
        })
    }

    );
})
router.get('/order',(req,res)=>{
    const movies = MovieModel.find()
    .sort({order:1});
    
    movies.then(async movie=>{
        const total = await MovieModel.countDocuments({});
        res.status(200).json({data:movie,total:total})
        });
})
router.put('/order',(req,res)=>{
    console.log(req.body);
})
module.exports = router;