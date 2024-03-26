const mongoose = require('mongoose');
const mongoURI = "mongodb://0.0.0.0:27017/inotebook"; // it's a connection string obtained from MongoDB Compass note to replace localhost with 0.0.0.0

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

module.exports = connectToMongo;
