const request = require('supertest');
const app = require('../app');

describe('testing customer api', () => {
  let ID = null;
  beforeAll(() => {
  
  });
  afterAll(() => {

  });

  describe('GET /customers', () => {
    it('should return array and 200', async () => {
      const res = await request(app).get('/customers');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
    });
  });
  describe('POST /customers', () => {
    it('should return a customer and 200', async () => {
      const data = {
        firstName: 'Jorgito',
        lastName: 'Valderrama',
        nroDoc: '78989',
      };
      const res = await request(app).post('/customers').send(data);
      expect(res.statusCode).toEqual(201);
      ID = res.body.id;
      expect(res.body.firstName).toEqual(data.firstName);
    });
  });
  describe('GET /customers/:id', () => {
    it('should return a customer and 200', async () => {
      const res = await request(app).get('/customers/'+ ID);
      expect(res.statusCode).toEqual(200);
    });
  });
  describe('DELETE /customers/:id', () => {
    it('should return a  200', async () => {
      const res = await request(app).delete('/customers/'+ ID);
      expect(res.statusCode).toEqual(200);
    });
  });
});





