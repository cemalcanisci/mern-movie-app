const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const etag = require('etag');
const app = express();
app.use(bodyParser.json());
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/mymovieapp', { useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify:false})
    .then(res => console.log('Mongoose connect successfully'))
    .catch(err => console.log(err));
let Schema = mongoose.Schema;
let movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: 'Henüz içerik eklenmemiştir.'
    },
    author: {
        type: String,
        required: false,
        default: 'Henüz yazar bilgisi eklenmemiştir.'
    },
    watched: {
        type: Boolean,
        default: false
    },
    addedBy: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }, image: {
        type: String,
        default: '/default.jpg'
    }
})

let Movie = mongoose.model('Movie', movieSchema)

app.get('/api/movies', (req, res) => {
    const query = {
        page: req.query.page,
        limit: Number(req.query.limit)
    }
    let offset = 0;
    if (query.page > 1) {
        offset = (query.page-1) * query.limit
    }
    const movies = Movie.find()
        .sort({ order: 1 })
        .limit(query.limit)
        .skip(offset)
    let date = new Date().toString();
    movies.then(async movie => {
        let body = '';
        for(let i of movie){
            body+=i.title;
        }
        const total = await Movie.countDocuments({});
        res.setHeader('ETag', etag(body + date))
        res.json({
            data: movie,
            total: total
        })
    }

    );
})
app.get('/api/movie/:id',(req,res)=>{
     Movie.findById(req.params.id)
     .then(movie=>res.json(movie))

})
app.put('/api/movie/change-status/:id',(req,res)=>{
    const watched = {
        watched: !req.body.watched
    }
    Movie.findOneAndUpdate({_id:req.params.id},watched)
    .then(movie=>res.json(movie))
})
app.post('/api/movie/add', (req, res) => {
    const newMovie = new Movie({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        watched: req.body.watched,
        addedBy: req.body.addedBy,
        order: req.body.order,
        category: req.body.category,
    })
    newMovie.save()
        .then(movie => res.json({data:movie}))
})


app.listen(PORT, () => {
    console.log(`App listening on ${PORT} : PORT`);
})