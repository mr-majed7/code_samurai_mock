//EXTERNAL IMPORTS
const express = require('express');

//INTERNAL IMPORTS
const {addBook,
    updateBook,
    searchBook,
    getBooks,
    getBookById
    } = require('../controllers/bookController');

const router = express.Router();

//SEARCH BOOK
router.get('/', searchBook);

//GET ALL BOOKS
router.get('/', getBooks);

//GET BOOK BY ID
router.get('/:id', getBookById);

//ADD BOOK
router.post('/', addBook);

//UPDATE BOOK
router.put('/:id', updateBook);


module.exports = router;