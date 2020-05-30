const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2');
const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
CategorySchema.plugin(mongoosePaginate);
module.exports = Category = mongoose.model('category', CategorySchema)