import request from 'supertest';
import { app } from '../index';
import { AppDataSource } from '../data-source';
import { Item } from '../models/ItemEntity';

beforeAll(async () => {
    // Initialize DB for testing
    await AppDataSource.initialize();
    // Clear the items table before tests
    await AppDataSource.getRepository(Item).clear();
});

afterAll(async () => {
    // Close DB connection after tests
    await AppDataSource.destroy();
});

describe('GET /items', () => {
    it('should return 200 and an empty array initially', async () => {
        const res = await request(app).get('/items');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(0);
    });
});

describe('POST /items', () => {
    it('should add a new item and return 201 status', async () => {
        const newItem = { name: 'Apples' };
        const res = await request(app).post('/items').send(newItem);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe(newItem.name);
        expect(res.body.purchased).toBe(false);
    });

    it('should not allow adding duplicate items and return 409 status', async () => {
        const duplicateItem = { name: 'Apples' };
        const res = await request(app).post('/items').send(duplicateItem);
        expect(res.status).toBe(409);
        expect(res.body).toHaveProperty('error', 'Item already exists');
    });

    it('should return 400 for invalid item names', async () => {
        const invalidItem = { name: '' };
        const res = await request(app).post('/items').send(invalidItem);
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error', 'Invalid item name');
    });
});
