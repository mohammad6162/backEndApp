const mongoose = require('mongoose');
const AppError = require('../error/error')

const connectMongo = async () => {
    try {
        const conn = await mongoose.connect(process.env.mongodb, {});

        console.log(`Connect mongo ${conn.connection.host}`);
    } catch (error) {
        return next(new AppError(e.message, 404, '100'));
    }
}


module.exports = connectMongo;