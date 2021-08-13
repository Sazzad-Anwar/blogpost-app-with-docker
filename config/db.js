const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        let conn = await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGO_PORT}/?authSource=admin`, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB is connected to ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline);
        process.exit(1);
    }

}

module.exports = connectDb;