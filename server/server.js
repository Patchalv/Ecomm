const express = require('express');
const app = express();
require('dotenv').config();
const pool = require("./db/db");
const cors = require("cors");
const passport = require('passport');

// Set server port
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Create initial GET for when we go to http://localhost:PORT/
app.get("/", (req, res) => {
    res.send("Ecomm project");
});


// Routes
const productRouter = require('./routes/product');
const userRouter = require('./routes/users');

app.use('/products', productRouter);
app.use('/users', userRouter);












// Make server listen to the port
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
});





