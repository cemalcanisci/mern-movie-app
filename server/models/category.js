const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let categorySchema = new Schema({
    title:{
        type:String,
        required:true
    }
})
let Category = mongoose.model('Category',categorySchema);
module.exports = Category;