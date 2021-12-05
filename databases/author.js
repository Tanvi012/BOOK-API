const mongoose = require('mongoose')

//Author Schema

const authorSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String]
})

//Creating Model
const authorModel = mongoose.model('author', authorSchema)

//Export
module.exports = authorModel