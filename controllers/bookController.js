const Books = require('../model/Books');


//GET ALL BOOKS
async function getBooks(req,res,next){
    try {
        const { title, author, genre, price, sorting_field, order } = req.query;

        if (title || author || genre || price) {
            const sortOptions = {};
            sortOptions[sorting_field] = order === 'ASC' ? 1 : -1;
            let books = [];
            if (title){
                books = await Books.find({ title: title } ).sort(sortOptions);
            }else if (author){
                books = await Books.find({ author: author } ).sort(sortOptions);
            }else if (genre){
                books = await Books.find({ genre: genre } ).sort(sortOptions);
            }else if (price){
                books = await Books.find({ price: Number(price) } ).sort(sortOptions);
            }

            res.status(200).json({ books });
        } else {
            const allBooks = await Books.find();
            res.status(200).json({ allBooks });
        }
    } catch (error) {
        next(error);
    }

}

//GET BOOK BY ID
async function getBookById(req,res,next){
    try{
        const {id} = req.params
        const book = await Books.findOne({id}) 
        if (!book){
            const error = new Error(`books with id: {${req.params.id}} was not found`);
            error.status = 404;
            throw error;
        }
        res.status(200).json({
            book: book}) 
    } catch(err) { 
        next(err);

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
        if (!book) {
            const error = new Error(`books with id: {${req.params.id}} was not found`);
            error.status = 404;
            throw error;
        } else {
            book.title = req.body.title;
            book.author = req.body.author;
            book.genre = req.body.genre;
            book.price = req.body.price;
            const updatedBook = await book.save();

            res.status(200).json(updatedBook);
        }
    } catch (error) {
        next(error);
    }
}


module.exports = {
    addBook,
    updateBook,
    getBooks,
    getBookById
}