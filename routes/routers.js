//EXTERNAL IMPORTS
const express = require('express');
const Books = require("../model/Books")

//INTERNAL IMPORTS

const router = express.Router();

//ADD BOOK

router.get("/books", async(req, res, next)=> {
    try {
        const allBooks = await Books.find({})
        res.status(200).json({
            message: "Ok",
            books: allBooks
        })
    } catch(err) {
        res.status(404).json({
            message: "not found"
        })
    }

})

router.get("/books/:id" , async(req ,res, next)=> {
    try{
        const {id} = req.params
        const book = await Books.find({id}) 
        res.status(200).json({
            message: 'Ok',
            book: book}) 
        } catch(err) { 
            res.status(404).json({
                message: "not found"
            })

        }
})

module.exports = router;