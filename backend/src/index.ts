import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import { ItemController } from './controllers/ItemController';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (_req, res) => {
    res.send('Server is running');
});
// Story 1: View a list of items
app.get('/items', ItemController.getAllItems);
// Story 2: Add an item to the shopping list
app.post('/items', ItemController.addItem);
// Story 3: Remove stuff from the shopping list
app.delete('/items/:id', ItemController.removeItem);
// Story 4: Mark an item as purchased
app.patch('/items/:id/purchased', ItemController.updateItemPurchasedStatus);

// Error-handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(`Error: ${err.message}`);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    });
});

// Only start the server if this file is run directly
if (require.main === module) {
    AppDataSource.initialize()
        .then(() => {
            console.log('Database connected');
            const PORT = process.env.PORT || 3001;
            app.listen(PORT, () => {
                console.log(`Server listening on port ${PORT}`);
            });
        })
        .catch(err => {
            console.error('Error during DataSource initialization:', err);
        });
}

export { app };
