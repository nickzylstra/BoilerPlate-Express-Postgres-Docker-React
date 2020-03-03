const request = require('supertest');
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

    describe('POST', () => {
      test('should create customer', async () => {
        const data = { name, email };
        const res = await request(app).post('/customers').send(data);
        expect(res.statusCode).toBe(201);
        expect(res.body.customerId).toBeDefined();
      });
    });
  });
});
