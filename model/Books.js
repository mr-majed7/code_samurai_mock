const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
})

const Books = mongoose.model('Books', bookSchema);

module.exports = Books;