const express = require('express');
const log = require('fancy-log');
const controller = require('../controller');

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    const customerId = await controller.createCustomer(name, email);
    res.status(201).json({ customerId });
  } catch (error) {
    log(error);
    res.status(400).end('error');
  }
});

module.exports = router;
