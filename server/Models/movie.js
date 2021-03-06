const mongoose = require('mongoose');

const { Schema } = mongoose;
const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: 'Henüz içerik eklenmemiştir.',
  },
  author: {
    type: String,
    required: false,
    default: 'Henüz yazar bilgisi eklenmemiştir.',
  },
  watched: {
    type: Boolean,
    default: false,
  },
  addedBy: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
  image: {
    type: String,
    default: '/default.jpg',
  },
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
