const request = require('supertest');
const axios = require('axios');
const app = require('./app');
const {
  pool, createTables, cleanTables, dropTables,
} = require('../database');

describe('app', () => {
  beforeAll(async () => {
    await createTables(pool);
  });

  // beforeEach(async () => {
  // });

  afterEach(async () => {
    await cleanTables(pool);
  });

  afterAll(async () => {
    await dropTables(pool);
    await pool.end();
  });

  describe('GET / to test db connection', () => {
    test('should respond with 200', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
    });
  });

  describe('/customers', () => {
    const name = 'bob';
    const email = 'bob@business.com';
    const password = 'supersecret';

    describe('POST', () => {
      test('should create customer', async () => {
        const data = { name, email, password };
        const res = await request(app).post('/customers').send(data);
        expect(res.statusCode).toBe(201);
        expect(res.body.customerId).toBeDefined();
      });
    });

    describe('DELETE', () => {
      test('should delete customer', async () => {
        const data = { name, email, password };
        const res = await request(app).post('/customers').send(data);
        const { customerId } = res.body;

        const res2 = await request(app).delete('/customers').send({ customerId });
        expect(res2.body.customerId).toBe(customerId);
      });
    });
  });

  describe('/certificates', () => {
    let customerId;
    beforeEach(async () => {
      const name = 'bob';
      const email = 'bob@business.com';
      const password = 'supersecret';
      const data = { name, email, password };
      const res = await request(app).post('/customers').send(data);
      customerId = res.body.customerId;
    });

    describe('POST', () => {
      test('should create certificate', async () => {
        const isActive = true;
        const certPrivateKey = 'pk';
        const certBody = 'body';
        const data = {
          customerId, isActive, certPrivateKey, certBody,
        };
        const res = await request(app).post('/certificates').send(data);
        expect(res.statusCode).toBe(201);
        expect(res.body.certificateId).toBeDefined();
      });
    });

    describe('GET', () => {
      test('should get active certificates by customerId', async () => {
        const isActive = true;
        const certPrivateKey = 'base64encodedstrPrivtKey';
        const certBody = 'base64encodedstrBody';
        const data = {
          customerId, isActive, certPrivateKey, certBody,
        };
        const res = await request(app).post('/certificates').send(data);
        const { certificateId } = res.body;

        const data1 = {
          customerId, isActive: false, certPrivateKey, certBody,
        };
        await request(app).post('/certificates').send(data1);

        const res2 = await request(app).get(`/certificates?customerId=${customerId}`);
        expect(res2.statusCode).toBe(200);
        expect(res2.body.certificates.length).toBe(1);
        expect(res2.body.certificates[0].certificateId).toBe(certificateId);
        expect(res2.body.certificates[0].privateKey).toBe(certPrivateKey);
        expect(res2.body.certificates[0].body).toBe(certBody);
      });
    });


    describe('PUT', () => {
      let certificateId;
      beforeEach(async () => {
        const isActive = true;
        const certPrivateKey = 'pk';
        const certBody = 'body';
        const data = {
          customerId, isActive, certPrivateKey, certBody,
        };
        const res = await request(app).post('/certificates').send(data);
        certificateId = res.body.certificateId;
      });

      test('should update certificate', async () => {
        const data1 = { certificateId, isActive: false };
        const res1 = await request(app).put('/certificates').send(data1);

        expect(res1.statusCode).toBe(200);
      });

      test('should notify webhook when updating certificates', async () => {
        const webhookURL = 'http://www.test.com';
        const isActive = false;
        const data1 = { certificateId, isActive, webhookURL };
        const res1 = await request(app).put('/certificates').send(data1);

        expect(res1.statusCode).toBe(200);
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(webhookURL,
          { certificateId, isActive });
      });
    });
  });
});
