//EXTERNAL IMPORTS
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//INTERNAL IMPORTS
const {notFoundHandler,errorHandler} = require('./middlewares/errorHandler');
const routers = require('./routes/routers');

const app = express();
dotenv.config();

//JSON PARSER
app.use(express.json());
//URL ENCODED PARSER
app.use(express.urlencoded({extended: true}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

//ROUTES
app.use('/api/books', routers);

//HANDLER ERRORS
app.use(notFoundHandler);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}...`);
});

