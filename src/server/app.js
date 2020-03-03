const express = require('express');
const cors = require('cors');
const rootRouter = require('./routes/root');
const customersRouter = require('./routes/customers');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', rootRouter);
app.use('/customers', customersRouter);

module.exports = app;
