import request from 'supertest';
import { app } from '../index'; // Just the app, no server

describe('GET /', () => {
    it('should return 200 and "Server is running"', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.text).toContain('Server is running');
    });
});
