const mongoose = require('mongoose')

//Book Schema

const bookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    pubDate: String,
    language: String,
    numPage: Number,
    author: [Number],
    publications: Number,
    category: [String]
})

//Creating Model
const bookModel = mongoose.model('books', bookSchema)

//Export
module.exports = bookModel