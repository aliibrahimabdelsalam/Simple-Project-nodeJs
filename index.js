const express = require('express')
const app = express()
const morgan = require('morgan');
// const redisMiddleware = require('./middleware/redisMiddlewar');

const productRouter=require('./routes/productRoute')
const categoryRouter=require('./routes/categoryRoute')
const connect=require('./connectDb/connection')
app.use(express.json());
app.use(morgan('dev'));
// await redisMiddleware.connect();

app.use('/products',productRouter)
app.use('/categorys',categoryRouter)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!'+err.stack);
});
connect();
app.listen(3000)