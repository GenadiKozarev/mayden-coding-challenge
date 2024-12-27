import React, { useState } from 'react';
import axios from 'axios';

interface AddItemFormProps {
    onItemAdded: () => void;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({ onItemAdded }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (name.trim() === '') {
            setError('Item name cannot be empty');
            return;
        }

        try {
            await axios.post('http://localhost:3001/items', { name });
            setName('');
            onItemAdded(); // Refresh the item list
        } catch (err: any) {
            if (err.response && err.response.status === 409) {
                setError('Item already exists');
            } else if (err.response && err.response.status === 400) {
                setError('Invalid item name');
            } else {
                setError('Failed to add item');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter item name"
                style={{ padding: '1rem', width: '25rem' }}
            />
            <button type="submit" className="btn-add">
                Add Item
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};
