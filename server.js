const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const compression = require('compression');

dotenv.config({ path: '.env' }); // Load environment variables from .env file
const morgan = require('morgan'); // Logger middleware to log requests to the console (development only)

const app = express();
app.use(cors());
app.options('*', cors());
app.use(compression()); // Enable gzip compression for all responses

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';


// Database connection
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

connectDB();

// middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
const Routes = require('./routes/index');

Routes(app); // Load all routes


app.get('/', (req, res) => {
    res.send('Hello World');
})


// error hanling middleware 
const ApiError = require("./utils/apiError");
const globalError = require("./middleware/errorMiddleware");

app.use('*', (req, res, next) => {
  const message = `Can't find this route ${req.originalUrl}`;
  next(new ApiError(message, 400));
})

app.use(globalError);


// Database connection and server start
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


// Handle rejection outside express
process.on('unhandledRejection', (err) => {
    console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
    console.error(`Shutting down....`);
    process.exit(1);
});