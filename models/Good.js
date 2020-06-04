const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2');
const GoodSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    salePrice: {
        type: Number,
        default: 0
    },
    goodNumber: {
        type: Number,
        required: true,
        unique: true
    },
    images: {
        type: [String],
        default: 'uploads/default/default.jpg'
    },
    date: {
        type: Date,
        default: Date.now
    }
})
GoodSchema.plugin(mongoosePaginate);

module.exports = Good = mongoose.model('good', GoodSchema)