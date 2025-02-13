const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = dbConnection;