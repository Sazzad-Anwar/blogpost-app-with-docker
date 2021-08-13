const express = require('express');
const connectDb = require('./config/db');
const app = express();
require('dotenv').config();
require('colors');
const redis = require('redis')
const cors = require('cors');
const session = require('express-session');
const { notFound } = require('./middleWares/notFound');
const errorHandler = require('./middleWares/errorHandler');
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient({
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT
})

if (process.env.NODE_ENV !== 'production') {
    let morgan = require('morgan')
    app.use(morgan('tiny'));
}

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1)
}
app.use(cors());
app.use(express.json());
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SESSION_SECRET,
        secure: false,
        saveUninitialized: false,
        resave: false,
        cookie: {
            secure: false,
            saveUninitialized: false,
            resave: false,
            httpOnly: true,
            maxAge: 1 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production' ? true : false
        }
    })
)

//@Description: Connection to database
connectDb();

//@Description: Application's routes declarations
app.use('/api/v1/user', require('./routes/user'))
app.use('/api/v1/posts', require('./routes/post'))
app.use(errorHandler)
app.use(notFound)


app.listen(process.env.PORT || 5000, () => {
    console.log(`Example app listening in ${process.env.NODE_ENV} mode on port ${process.env.PORT ?? 5000}`)
});