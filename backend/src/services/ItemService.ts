import { Repository } from 'typeorm';
import { Item } from '../models/ItemEntity';
import { AppDataSource } from '../data-source';

export class ItemService {
    private itemRepository: Repository<Item>;

    constructor() {
        this.itemRepository = AppDataSource.getRepository(Item);
    }

    public async getAllItems(): Promise<Item[]> {
        return this.itemRepository.find(); // SELECT * FROM items;
    }
}
