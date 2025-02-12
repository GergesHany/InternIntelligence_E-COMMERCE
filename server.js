const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' }); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;


// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
});
