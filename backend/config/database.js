// MongoDB Database Configuration
// TODO: Add your MongoDB connection details

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // TODO: Replace with your MongoDB connection string
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/salon';
    
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
