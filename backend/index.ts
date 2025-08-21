import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes'
import catRoutes from './src/routes/catRoutes';
import eventRoutes from './src/routes/catEventRoutes'

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// convert to json
app.use(express.json());

// mounting routes
app.use('/api/user', userRoutes);
app.use('/api/cats', catRoutes);
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});