export default {
    port: process.env.PORT || 3000,
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel-reservation-db',
    jwtSecret: process.env.JWT_SECRET || '48c36b709df04ce7a361',
};