//EXTERNAL IMPORTS
const express = require('express');

//INTERNAL IMPORTS
const {addBook,
    updateBook,
    getBooks,
    getBookById
    } = require('../controllers/bookController');

const router = express.Router();

//GET AND SEARCH BOOK
router.get('/', getBooks);


//GET BOOK BY ID
router.get('/:id', getBookById);

//ADD BOOK
router.post('/', addBook);

//UPDATE BOOK
router.put('/:id', updateBook);


module.exports = router;