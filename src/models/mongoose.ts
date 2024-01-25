import mongoose from 'mongoose';
import config from '../config';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Add other options if needed
    });
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export default connectToDatabase;