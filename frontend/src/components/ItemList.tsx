// frontend/src/features/items/ItemList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AddItemForm } from './AddItemForm';

interface Item {
    id: number;
    name: string;
    purchased: boolean;
}

export const ItemList: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchItems = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get<Item[]>('http://localhost:3001/items');
            setItems(res.data);
        } catch (err) {
            setError('Failed to fetch items');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div style={{ margin: '1rem' }}>
            <h2>Shopping List</h2>
            <AddItemForm onItemAdded={fetchItems} />
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : items.length === 0 ? (
                <p>No items found.</p>
            ) : (
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            {item.name} {item.purchased ? '(purchased)' : ''}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
