const express = require('express');
const log = require('fancy-log');
const controller = require('../controller');

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const customerId = await controller.createCustomer(name, email, password);
    res.status(201).json({ customerId });
  } catch (error) {
    log(error);
    res.status(400).end('error');
  }
});

router.delete('/', async (req, res) => {
  try {
    const { customerId } = req.body;
    const deletedCustomerId = await controller.deleteCustomer(customerId);
    res.status(202).json({ customerId: deletedCustomerId });
  } catch (error) {
    log(error);
    res.status(400).end('error');
  }
});

module.exports = router;
