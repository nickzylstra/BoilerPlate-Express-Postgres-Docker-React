const express = require('express');
const cors = require('cors');
const indexRouter = require('./routes/index');
const customersRouter = require('./routes/customers');
const certificatesRouter = require('./routes/certificates');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/customers', customersRouter);
app.use('/certificates', certificatesRouter);

module.exports = app;
