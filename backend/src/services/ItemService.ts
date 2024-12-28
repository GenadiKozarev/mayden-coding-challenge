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

    public async addItem(name: string): Promise<Item> {
        const existingItem = await this.itemRepository.findOne({
            where: { name },
        });
        if (existingItem) {
            throw new Error('Item already exists');
        }
        const newItem = this.itemRepository.create({ name });
        return this.itemRepository.save(newItem);
    }

    public async removeItem(id: number): Promise<void> {
        const item = await this.itemRepository.findOne({ where: { id } });
        if (!item) {
            throw new Error('Item not found');
        }
        await this.itemRepository.remove(item);
    }

    public async markItemAsPurchased(
        id: number,
        purchased: boolean
    ): Promise<Item> {
        const item = await this.itemRepository.findOne({ where: { id } });
        if (!item) {
            throw new Error('Item not found');
        }
        item.purchased = purchased;
        return this.itemRepository.save(item);
    }
}
