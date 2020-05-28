const mongoose = require('mongoose');
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
module.exports = Movie;