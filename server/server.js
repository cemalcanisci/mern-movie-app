const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/mymovieapp',{useNewUrlParser:true,useUnifiedTopology: true})
.then(res=>console.log('Mongoose connect successfully'))
.catch(err=>console.log(err));
let Schema = mongoose.Schema;
let movieSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false,
        default:'Henüz içerik eklenmemiştir.'
    },
    author:{
        type:String,
        required:false,
        default:'Henüz yazar bilgisi eklenmemiştir.'
    },
    watched:{
        type:Boolean,
        default:false
    },
    addedBy:{
        type:String,
        required:true
    },
    order:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    }
})

let Movie = mongoose.model('Movie',movieSchema)

app.get('/api/movies',(req,res)=>{
    Movie.find()
    .then(movie=>res.json(movie))
})
app.post('/api/movie/add',(req,res)=>{
    const newMovie = new Movie({
        title:req.body.title,
        description:req.body.description,
        author:req.body.author,
        watched:req.body.watched,
        addedBy:req.body.addedBy,
        order:req.body.order,
        category:req.body.category,
    })
    newMovie.save()
    .then(movie=>res.json(movie))
})


app.listen(PORT,()=>{
    console.log(`App listening on ${PORT} : PORT`);
})