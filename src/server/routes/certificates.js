const express = require('express');
const log = require('fancy-log');
const controller = require('../controller');

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const {
      customerId, isActive, certPrivateKey, certBody,
    } = req.body;
    const certificateId = await controller.createCertificate(
      customerId, isActive, certPrivateKey, certBody,
    );
    res.status(201).json({ certificateId });
  } catch (error) {
    log(error);
    res.status(400).end('error');
  }
});

router.get('/', async (req, res) => {
  try {
    const { customerId } = req.query;
    const certificates = await controller.getActiveCustomerCertificates(customerId);
    res.status(200).json({ certificates });
  } catch (error) {
    log(error);
    res.status(400).end('error');
  }
});

router.put('/', async (req, res) => {
  try {
    const { certificateId, isActive } = req.body;
    // eslint-disable-next-line prefer-destructuring
    const webhookURL = req.body.webhookURL;
    // eslint-disable-next-line max-len
    const updatedCertificateId = await controller.updateCertificate(certificateId, isActive, webhookURL);
    res.status(200).json({ certificateId: updatedCertificateId });
  } catch (error) {
    log(error);
    res.status(400).end('error');
  }
});

module.exports = router;
