import { Request, Response, NextFunction } from 'express';
import { ItemService } from '../services/ItemService';
import { AppError } from '../utils/AppError';

const itemService = new ItemService();

export class ItemController {
    public static async getAllItems(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const items = await itemService.getAllItems();
            res.json(items);
        } catch (error) {
            next(new AppError('Failed to fetch items', 500));
        }
    }
}
