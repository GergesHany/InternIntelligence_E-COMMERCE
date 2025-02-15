const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' }); // Load environment variables from .env file
const morgan = require('morgan'); // Logger middleware to log requests to the console (development only)

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;


// Database connection
const connectDB = require('./config/dbConn.js');
connectDB();

// middlewares
app.use(express.json());
if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
const categoryRoutes = require('./routes/categoryRoutes.js');

app.use('/api/categories', categoryRoutes);
app.get('/', (req, res) => {
    res.send('Hello World');
})


// Database connection and server start
const mongoose = require('mongoose');
mongoose.connection.once("open", () => {
    console.log("MongoDB connected successfully");    
    app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
    });
});
  
mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
});