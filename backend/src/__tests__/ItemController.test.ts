import request from 'supertest';
import { app } from '../index';
import { AppDataSource } from '../data-source';
import { Item } from '../models/ItemEntity';

// Array to track IDs of items created during tests
const testCreatedItemIds: number[] = [];

beforeAll(async () => {
    // Initialize DB for testing
    await AppDataSource.initialize();
});

afterAll(async () => {
    // Delete items created during tests
    for (const id of testCreatedItemIds) {
        try {
            await request(app).delete(`/items/${id}`);
        } catch (error: any) {
            // If the item was already deleted during the test, ignore the error
            if (error.response && error.response.status !== 404) {
                console.error(
                    `Failed to delete test item with ID ${id}:`,
                    error
                );
            }
        }
    }
    // Close DB connection after tests
    await AppDataSource.destroy();
});

describe('GET /items', () => {
    it('should return 200 and an empty array initially', async () => {
        const res = await request(app).get('/items');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
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
        testCreatedItemIds.push(res.body.id);
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

describe('DELETE /items/:id', () => {
    let itemId: number;

    beforeAll(async () => {
        // Add an item to delete
        const newItem = { name: 'Bananas' };
        const res = await request(app).post('/items').send(newItem);
        expect(res.status).toBe(201);
        itemId = res.body.id;
        testCreatedItemIds.push(itemId);
    });

    it('should remove an existing item and return 204 status', async () => {
        const res = await request(app).delete(`/items/${itemId}`);
        expect(res.status).toBe(204);
        // Verify the item is removed
        const getRes = await request(app).get('/items');
        expect(
            getRes.body.find((item: Item) => item.id === itemId)
        ).toBeUndefined();
    });

    it('should return 404 when trying to remove a non-existent item', async () => {
        const nonExistentId = 9999;
        const res = await request(app).delete(`/items/${nonExistentId}`);
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error', 'Item not found');
    });

    it('should return 400 for invalid item IDs', async () => {
        const invalidId = 'abc';
        const res = await request(app).delete(`/items/${invalidId}`);
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error', 'Invalid item ID');
    });
});

describe('PATCH /items/:id/purchased', () => {
    let itemId: number;

    beforeAll(async () => {
        // Add an item to update
        const newItem = { name: 'Oranges' };
        const res = await request(app).post('/items').send(newItem);
        expect(res.status).toBe(201);
        itemId = res.body.id;
        testCreatedItemIds.push(itemId);
    });

    it('should mark an existing item as purchased and return the updated item', async () => {
        const res = await request(app)
            .patch(`/items/${itemId}/purchased`)
            .send({ purchased: true });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', itemId);
        expect(res.body).toHaveProperty('purchased', true);
    });

    it('should mark an existing item as not purchased and return the updated item', async () => {
        const res = await request(app)
            .patch(`/items/${itemId}/purchased`)
            .send({ purchased: false });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', itemId);
        expect(res.body).toHaveProperty('purchased', false);
    });

    it('should return 404 when trying to update a non-existent item', async () => {
        const nonExistentId = 9999;
        const res = await request(app)
            .patch(`/items/${nonExistentId}/purchased`)
            .send({ purchased: true });
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error', 'Item not found');
    });

    it('should return 400 for invalid item IDs', async () => {
        const invalidId = 'abc';
        const res = await request(app)
            .patch(`/items/${invalidId}/purchased`)
            .send({ purchased: true });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error', 'Invalid item ID');
    });

    it('should return 400 for invalid purchased status', async () => {
        const res = await request(app)
            .patch(`/items/${itemId}/purchased`)
            .send({ purchased: 'yes' });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error', 'Invalid purchased status');
    });
});
