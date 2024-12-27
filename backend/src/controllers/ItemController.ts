import { Request, Response, NextFunction } from 'express';
import { ItemService } from '../services/ItemService';
import { AppError } from '../utils/AppError';

const itemService = new ItemService();

export class ItemController {
    public static async getAllItems(
        _req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const items = await itemService.getAllItems();
            res.status(200).json(items);
        } catch (error) {
            next(new AppError('Failed to fetch items', 500));
        }
    }

    public static async addItem(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { name } = req.body;
            if (!name || typeof name !== 'string') {
                res.status(400).json({ error: 'Invalid item name' });
            }
            const newItem = await itemService.addItem(name);
            res.status(201).json(newItem);
        } catch (error) {
            if (
                error instanceof Error &&
                error.message === 'Item already exists'
            ) {
                next(new AppError('Item already exists', 409));
            }
            next(new AppError('Failed to add item', 500));
        }
    }
}
