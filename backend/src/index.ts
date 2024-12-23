import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import { AppDataSource } from './data-source';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Server is running');
});

// Temporarily skip DB init for a quick check
// // Initialize the database, then start the server
// AppDataSource.initialize()
//     .then(() => {
//         console.log('Database connection established');
//         const PORT = process.env.PORT || 3001;
//         app.listen(PORT, () => {
//             console.log(`Server is listening on port ${PORT}`);
//         });
//     })
//     .catch(err => {
//         console.error('Error during DataSource initialization:', err);
//     });

// Only start the server if this file is run directly (e.g. `npm start`)
if (require.main === module) {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

export { app };
