const mongoose = require('mongoose')

//Publication Schema

const publicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String]
})

//Creating Model
const publicationModel = mongoose.model('publications', publicationSchema)

//Export
module.exports = publicationModel