const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv/config');
// const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler');

app.use(cors())
app.options('*', cors())

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
// app.use(authJwt());
app.use(errorHandler);

//routers
const categoriesRouter = require('./routers/categories')
const productsRouter = require('./routers/products')
const usersRouter = require('./routers/users')
const ordersRouter = require('./routers/orders');

 
const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRouter)
app.use(`${api}/products`, productsRouter)
app.use(`${api}/users`, usersRouter)
app.use(`${api}/orders`, ordersRouter)

//database
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Database connected successfully!')
})
.catch((err)=>{
    console.log(err);
})

//sever
app.listen(3000, ()=>{
    console.log(api);
    console.log("Server running port 3000......");
});


