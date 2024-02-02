const Books = require('../model/Books');


//GET ALL BOOKS
async function getBooks(req,res,next){
    try {
        const allBooks = await Books.find({})
        res.status(200).json({
            books: allBooks
        })
    } catch(err) {
        next(err)
    }

}

//GET BOOK BY ID
async function getBookById(req,res,next){
    try{
        const {id} = req.params
        const book = await Books.find({id}) 
        if (book.length === 0){
            const error = new Error(`books with id: {${req.params.id}} was not found`);
            error.status = 404;
            next(error);
        }
        res.status(200).json({
            book: book}) 
    } catch(err) { 
        next(error);

    }
}

//ADD BOOKS
async function addBook(req, res, next) {
   try {
        const book = new Books(req.body);
        await book.save();
        res.status(201).json(book);
   }
    catch (error) {
          next(error);
    }
}

//UPDATE BOOKS
async function updateBook(req, res, next) {
    try {
        const book = await Books.findOne({ id: Number(req.params.id) });

        // Book does not exist in the database
        if (!book) {
            const error = new Error(`books with id: {${req}} was not found`);
            error.status = 404;
            throw error;
        } else {
            // Update the book properties
            book.title = req.body.title;
            book.author = req.body.author;
            book.genre = req.body.genre;
            book.price = req.body.price;

            // Save the updated book
            const updatedBook = await book.save();

            res.status(200).json(updatedBook);
        }
    } catch (error) {
        next(error);
    }
}

//SEARCH BOOK
async function searchBook(req, res, next) {
    try {
        const { title,author,genre,price, sorting_field, order } = req.query;
        const sortOptions = {};
        sortOptions[sorting_field] = order === 'asc' ? 1 : -1;
        let books = []
        if (title){
            books = await Books.find({title: title}).sort(sortOptions);
        }
        if (author){
            books = await Books.find({author: author}).sort(sortOptions);
        }
        if (genre){
            books = await Books.find({genre: genre}).sort(sortOptions);
        }
        if (price){
            books = await Books.find({price: price}).sort(sortOptions);
        }
        res.status(200).json({ books });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    addBook,
    updateBook,
    searchBook,
    getBooks,
    getBookById
}