const express = require('express');
const path = require('path');
const cors = require('cors');
const customersRouter = require('./routes/customers');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static(path.resolve(__dirname, '..', '..', 'public')));
app.use('/customers', customersRouter);

module.exports = app;
