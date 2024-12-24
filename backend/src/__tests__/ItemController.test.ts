import request from 'supertest';
import { app } from '../index';
import { AppDataSource } from '../data-source';

beforeAll(async () => {
    // Initialize DB for testing
    await AppDataSource.initialize();
});

afterAll(async () => {
    // Close DB connection after tests
    await AppDataSource.destroy();
});

describe('GET /items', () => {
    it('should return 200 and an array of items', async () => {
        const res = await request(app).get('/items');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
