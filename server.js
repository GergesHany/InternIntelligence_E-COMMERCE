const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const hpp = require('hpp');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');


dotenv.config({ path: '.env' }); // Load environment variables from .env file
const morgan = require('morgan'); // Logger middleware to log requests to the console (development only)

const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

const { webhookCheckout } = require('./controllers/orderController');


const app = express();
app.use(cors());

app.use(express.json({ limit: '20kb' }));
app.use(mongoSanitize()); // Data sanitization against NoSQL query injection
app.options('*', cors());
app.use(compression()); // Enable gzip compression for all responses
app.use(hpp({whitelist: ['price', 'sold', 'quantity', 'ratingsAverage', 'ratingsQuantity',], }));

// Checkout webhook
app.post('/webhook-checkout', express.raw({ type: 'application/json' }), webhookCheckout);


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});


app.use("/api", limiter); // Apply rate limiter middleware to all requests

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';


// Database connection
connectDB();

// middlewares
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