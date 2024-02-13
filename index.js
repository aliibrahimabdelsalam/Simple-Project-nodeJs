const express = require('express')
const app = express()
const morgan = require('morgan');
const productRouter=require('./routes/productRoute')
const categoryRouter=require('./routes/categoryRoute')
const connect=require('./connectDb/connection')
app.use(express.json());
app.use(morgan('dev'));
app.use('/products',productRouter)
app.use('/categorys',categoryRouter)

connect();
app.listen(3000)