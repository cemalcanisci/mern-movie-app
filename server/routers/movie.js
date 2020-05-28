const express = require('express');
const router = express.Router();
router.get('/api/movie/:id',(req,res)=>{
    MovieModel.findById(req.params.id)
     .then(movie=>res.json(movie))

})
router.put('/change-status/:id',(req,res)=>{
    const watched = {
        watched: !req.body.watched
    }
    MovieModel.findOneAndUpdate({_id:req.params.id},watched)
    .then(movie=>res.json(movie))
})
router.put('/update/:id',(req,res)=>{
    let data = req.body.newData;
    MovieModel.findOneAndUpdate({_id:req.params.id},data)
    .then(movie=>res.json(movie))
})
router.post('/add', (req, res) => {
    const data = {...req.body,order:5}
    const newMovie = new MovieModel(data)
    newMovie.save()
        .then(movie => res.json({data:movie}))
})

module.exports = router;