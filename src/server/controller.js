const log = require('fancy-log');
const axios = require('axios');
const db = require('../database/models');


async function testDb() {
  await db.testDb();
}

async function createCustomer(name, email, password) {
  return db.customers.create(name, email, password);
}

async function deleteCustomer(customerId) {
  await db.certificates.removeByCustomerId(customerId);
  return db.customers.remove(customerId);
}

async function createCertificate(customerId, isActive, certPrivateKey, certBody) {
  return db.certificates.create(customerId, isActive, certPrivateKey, certBody);
}

async function getActiveCustomerCertificates(customerId) {
  return db.certificates.getActiveByCustomerId(customerId);
}

async function notifyWebhook(url, data) {
  // TODO - santize url input
  try {
    await axios.post(url, data);
  } catch (error) {
    log(`failed to notify webhook at '${url}'`, error.message);
  }
}

async function updateCertificate(certificateId, isActive, webhookURL) {
  const preUpdateActiveState = (await db.certificates.get(certificateId)).is_active;

  const postUpdateActiveState = await db.certificates.updateActiveStatus(certificateId, isActive);

  const didUpdate = postUpdateActiveState !== preUpdateActiveState;

  if (webhookURL && didUpdate) {
    const webhookData = { certificateId, isActive };
    notifyWebhook(webhookURL, webhookData);
  }

  return didUpdate ? certificateId : null;
}

module.exports = {
  testDb,
  createCustomer,
  deleteCustomer,
  createCertificate,
  getActiveCustomerCertificates,
  updateCertificate,
};
