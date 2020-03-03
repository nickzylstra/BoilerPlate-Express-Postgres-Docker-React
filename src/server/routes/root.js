const express = require('express');
const log = require('fancy-log');
const controller = require('../controller');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    await controller.testDb();
    res.end('API server running');
  } catch (error) {
    log(error);
    res.status(500).end('error with server or database connection');
  }
});

module.exports = router;
