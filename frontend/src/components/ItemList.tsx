import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Item {
    id: number;
    name: string;
    purchased: boolean;
}

export const ItemList: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        axios
            .get('http://localhost:3001/items')
            .then(res => setItems(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={{ margin: '1rem' }}>
            <h2>Shopping List (Story 1)</h2>
            {items.length === 0 ? (
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
