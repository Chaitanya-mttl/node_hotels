// importing the mongoose
const mongoose = require('mongoose');

// Define the mongoDB Connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'

// Setup MongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})


// Get the default connection
// Mongoose maintains a default connection object representing the mongodb connection  
const db = mongoose.connection;


// Define the event listners for the database connection

db.on('connected',() => {
    console.log('connected to mongoDB Server');
});

db.on('error', (err)=>{
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db;