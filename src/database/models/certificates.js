/* eslint-disable camelcase */
const { pool } = require('../index');
const { convertBase64toBinary, convertBinarytoBase64 } = require('../../utils');

async function removeByCustomerId(customerId) {
  const text = 'DELETE FROM certificates WHERE customer_id = $1';
  const values = [customerId];
  await pool.query({ text, values });
}

async function create(customerId, isActive, certPrivateKey, certBody) {
  const certPrivateKeyBuffer = convertBase64toBinary(certPrivateKey);
  const certBodyBuffer = convertBase64toBinary(certBody);

  const text = 'INSERT INTO certificates(customer_id, is_active, private_key, body) VALUES($1, $2, $3, $4) RETURNING certificate_id';
  const values = [customerId, isActive, certPrivateKeyBuffer, certBodyBuffer];
  const { certificate_id } = (await pool.query({ text, values })).rows[0];

  return certificate_id;
}

async function getActiveByCustomerId(customerId) {
  const text = 'SELECT * FROM certificates WHERE customer_id = $1';
  const values = [customerId];
  const certificates = (await pool.query({ text, values })).rows
    .filter((cert) => cert.is_active)
    .map((cert) => {
      const {
        certificate_id, is_active, private_key, body,
      } = cert;

      return {
        certificateId: certificate_id,
        isActive: is_active,
        body: convertBinarytoBase64(body),
        privateKey: convertBinarytoBase64(private_key),
      };
    });

  return certificates;
}

async function get(certificateId) {
  const text = 'SELECT is_active FROM certificates WHERE certificate_id = $1';
  const values = [certificateId];
  const certificates = await pool.query({ text, values });
  return certificates.rows[0];
}


async function updateActiveStatus(certificateId, isActive) {
  const text1 = 'UPDATE certificates SET is_active = $2 WHERE certificate_id = $1 RETURNING is_active';
  const values1 = [certificateId, isActive];
  return pool.query({ text: text1, values: values1 });
}

module.exports = {
  removeByCustomerId,
  create,
  getActiveByCustomerId,
  get,
  updateActiveStatus,
};
