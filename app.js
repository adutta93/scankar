const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config({ path: './config.env' });

// DB Connection
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('DB CONNECTED SUCCESSFULLY');
  })
  .catch(() => {
    console.log('PROBLEM CONNECTING DB');
  });

// My routes
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const orderRouter = require('./routes/orderRouter');
const customerOrderRouter = require('./routes/customerOrderRouter');
const resturentDetailsRouter = require('./routes/resturantDetailsRoutes');
const authRoute = require('./routes/authRoute');
// const logInRoute = require('./routes/logInRoute');

const app = express();

app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(cookieParser());
app.use(express.json());

// middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/customer-order', customerOrderRouter);
app.use('/api/v1/info', resturentDetailsRouter);
app.use('/api/v1/', authRoute);

// server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Port is running at ${port}`);
});
