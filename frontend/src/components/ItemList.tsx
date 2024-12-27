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

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3001/items/${id}`);
            // Remove the deleted item from the state
            setItems(items.filter(item => item.id !== id));
        } catch (err: any) {
            if (err.response && err.response.status === 404) {
                alert('Item not found');
            } else if (err.response && err.response.status === 400) {
                alert('Invalid item ID');
            } else {
                alert('Failed to delete item');
            }
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
                <ul style={{ paddingLeft: '1rem' }}>
                    {items.map(item => (
                        <li
                            key={item.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '0.5rem',
                                fontSize: '1.75rem',
                            }}
                        >
                            <span>
                                {item.name}{' '}
                                {item.purchased ? '(purchased)' : ''}
                            </span>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="btn-delete"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
